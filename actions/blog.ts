'use server';

import { FieldValue } from "firebase-admin/firestore";
import { db } from "@/firebase/firebaseConfig";
import { IBlogPost, IBlogCategory, PostStatus } from "@/interfaces/blogInterface";
import { IAdminUser } from "@/interfaces/userInterface";

export interface PaginatedResponse<T> {
  posts?: T[];
  categories?: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Helper: Calculate read time (~200 words per minute)
const calculateReadTime = (content: string): number => {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

// Helper: Slugify title
const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

// Helper: Firestore Timestamps are class instances and cannot cross the
// server action boundary, so convert every one of them to a plain Date.
const serializeDoc = (id: string, data: FirebaseFirestore.DocumentData): any => {
  const result: Record<string, unknown> = { id };
  for (const [key, value] of Object.entries(data)) {
    result[key] = value && typeof value.toDate === 'function' ? value.toDate() : value;
  }
  return result;
};

const toMillis = (value: unknown): number => {
  if (!value) return 0;
  const time = new Date(value as string | number | Date).getTime();
  return Number.isNaN(time) ? 0 : time;
};

const sortNewestFirst = <T extends { createdAt?: unknown }>(items: T[]): T[] =>
  [...items].sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt));

// Helper: Load every category once, keyed by id
const loadCategoryMap = async (): Promise<Map<string, IBlogCategory>> => {
  const snapshot = await db.collection('blogCategories').get();
  return new Map(
    snapshot.docs.map((doc) => [doc.id, serializeDoc(doc.id, doc.data()) as IBlogCategory])
  );
};

const attachCategories = async (posts: IBlogPost[]): Promise<IBlogPost[]> => {
  if (!posts.some((post) => post.categoryId)) return posts;

  const categories = await loadCategoryMap();
  return posts.map((post) => ({
    ...post,
    category: (post.categoryId && categories.get(post.categoryId)) || null,
  }));
};

// Helper: Resolve the author names shown in the admin table
const attachAuthors = async (posts: IBlogPost[]): Promise<IBlogPost[]> => {
  const authorIds = [...new Set(posts.map((post) => post.authorId).filter(Boolean))];
  if (authorIds.length === 0) return posts;

  const authorDocs = await Promise.all(
    authorIds.map((id) => db.collection('users').doc(id).get())
  );

  const authors = new Map<string, IAdminUser>();
  authorDocs.forEach((doc) => {
    const data = doc.data();
    if (!data) return;
    authors.set(doc.id, {
      id: doc.id,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      role: data.role,
    });
  });

  return posts.map((post) => ({ ...post, author: authors.get(post.authorId) }));
};

// ==========================================
// BLOG POSTS ACTIONS
// ==========================================

// Create new blog post
export const createBlogPost = async (
  postData: Omit<IBlogPost, 'slug' | 'views' | 'readTime' | 'metaTitle' | 'metaDescription' | 'publishedAt'>
): Promise<IBlogPost> => {
  const title = postData.title?.trim();
  const content = postData.content?.trim();

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  try {
    const slug = `${slugify(title)}-${Math.random().toString(36).substring(2, 7)}`;
    const status = Object.values(PostStatus).includes(postData.status)
      ? postData.status
      : PostStatus.DRAFT;
    const excerpt = postData.excerpt?.trim() || '';
    const now = new Date();

    // Firestore rejects `undefined`, so every field gets an explicit value.
    const newPost = {
      title,
      content,
      excerpt,
      coverImage: postData.coverImage || '',
      categoryId: postData.categoryId || '',
      tags: Array.isArray(postData.tags) ? postData.tags : [],
      status,
      featured: postData.featured === true,
      authorId: postData.authorId || '',
      slug,
      readTime: calculateReadTime(content),
      views: 0,
      metaTitle: title,
      metaDescription: excerpt || content.substring(0, 150),
      createdAt: now,
      updatedAt: now,
      publishedAt: status === PostStatus.PUBLISHED ? now : null,
    };

    const docRef = await db.collection('blogPosts').add(newPost);
    return { id: docRef.id, ...newPost };
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw new Error("Failed to create blog post");
  }
};

// Fetch published posts
export const fetchPosts = async (): Promise<IBlogPost[]> => {
  try {
    // Filtering on `status` and ordering by `createdAt` in the same query needs
    // a composite index, so the ordering is done here instead.
    const snapshot = await db
      .collection('blogPosts')
      .where('status', '==', PostStatus.PUBLISHED)
      .get();

    const posts = snapshot.docs.map((doc) => serializeDoc(doc.id, doc.data()) as IBlogPost);

    return attachCategories(sortNewestFirst(posts));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error("Failed to fetch blog posts");
  }
};

// Fetch a single published blog post by slug. Resolves to null when there is
// no published post with that slug.
export const fetchPost = async (slug: string): Promise<IBlogPost | null> => {
  try {
    const snapshot = await db
      .collection('blogPosts')
      .where('slug', '==', slug)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    const post = serializeDoc(doc.id, doc.data()) as IBlogPost;

    if (post.status !== PostStatus.PUBLISHED) return null;

    // Count the view, but never fail the page over it
    try {
      await doc.ref.update({ views: FieldValue.increment(1) });
      post.views = (post.views || 0) + 1;
    } catch (error) {
      console.error(`Error updating view count for post: ${slug}`, error);
    }

    const [resolved] = await attachCategories([post]);
    return resolved;
  } catch (error) {
    console.error(`Error fetching post with slug: ${slug}`, error);
    throw new Error("Failed to fetch blog post details");
  }
};

// ==========================================
// BLOG CATEGORIES ACTIONS
// ==========================================

// Fetch categories, each with the number of posts filed under it
export const fetchCategories = async (): Promise<IBlogCategory[]> => {
  try {
    const [categoriesSnapshot, postsSnapshot] = await Promise.all([
      db.collection('blogCategories').get(),
      db.collection('blogPosts').select('categoryId').get(),
    ]);

    const postCounts = new Map<string, number>();
    postsSnapshot.forEach((doc) => {
      const categoryId = doc.get('categoryId');
      if (categoryId) {
        postCounts.set(categoryId, (postCounts.get(categoryId) || 0) + 1);
      }
    });

    return categoriesSnapshot.docs
      .map((doc) => ({
        ...(serializeDoc(doc.id, doc.data()) as IBlogCategory),
        postCount: postCounts.get(doc.id) || 0,
      }))
      .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

// Create new category
export const createCategory = async (data: Partial<IBlogCategory>): Promise<IBlogCategory> => {
  const name = data.name?.trim();

  if (!name) {
    throw new Error("Category name is required");
  }

  try {
    const now = new Date();
    const newCategory = {
      name,
      color: data.color || '#d4af35',
      description: data.description?.trim() || '',
      slug: slugify(name),
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await db.collection('blogCategories').add(newCategory);
    return { id: docRef.id, ...newCategory };
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Failed to create category");
  }
};

// ==========================================
// ADMIN ACTIONS
// ==========================================

// Fetch posts for admin (paginated, every status unless one is given)
export async function fetchAdminPosts(params?: {
  page?: number;
  limit?: number;
  status?: string;
}): Promise<PaginatedResponse<IBlogPost>> {
  try {
    const page = Math.max(1, params?.page || 1);
    const limit = Math.max(1, params?.limit || 10);

    // Status is filtered in memory: combining it with the ordering in the
    // query would need a composite index.
    const snapshot = await db.collection('blogPosts').get();

    let allPosts = snapshot.docs.map((doc) => serializeDoc(doc.id, doc.data()) as IBlogPost);
    if (params?.status) {
      allPosts = allPosts.filter((post) => post.status === params.status);
    }
    allPosts = sortNewestFirst(allPosts);

    const total = allPosts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const pagePosts = allPosts.slice(startIndex, startIndex + limit);

    const posts = await attachAuthors(await attachCategories(pagePosts));

    return {
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  } catch (error) {
    console.error("Error fetching admin posts:", error);
    throw new Error("Failed to fetch admin posts");
  }
}

// Fetch a single post by id for the admin editor (any status, no view count)
export async function fetchPostById(id: string): Promise<IBlogPost | null> {
  if (!id) return null;

  try {
    const doc = await db.collection('blogPosts').doc(id).get();
    const data = doc.data();
    if (!data) return null;

    return serializeDoc(doc.id, data) as IBlogPost;
  } catch (error) {
    console.error(`Error fetching post with id: ${id}`, error);
    throw new Error("Failed to fetch blog post");
  }
}

// Update an existing blog post. The slug is left alone so published links keep working.
export async function updateBlogPost(
  id: string,
  postData: Pick<IBlogPost, 'title' | 'content' | 'excerpt' | 'coverImage' | 'categoryId' | 'tags' | 'status' | 'featured'>
): Promise<{ message: string }> {
  const title = postData.title?.trim();
  const content = postData.content?.trim();

  if (!id) {
    throw new Error("Post id is required");
  }
  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  try {
    const docRef = db.collection('blogPosts').doc(id);
    const existing = (await docRef.get()).data();

    if (!existing) {
      throw new Error("Post not found");
    }

    const status = Object.values(PostStatus).includes(postData.status)
      ? postData.status
      : PostStatus.DRAFT;
    const excerpt = postData.excerpt?.trim() || '';
    const now = new Date();

    const updates: Record<string, unknown> = {
      title,
      content,
      excerpt,
      coverImage: postData.coverImage || '',
      categoryId: postData.categoryId || '',
      tags: Array.isArray(postData.tags) ? postData.tags : [],
      status,
      featured: postData.featured === true,
      readTime: calculateReadTime(content),
      metaTitle: title,
      metaDescription: excerpt || content.substring(0, 150),
      updatedAt: now,
    };

    // Stamp the publish date the first time a post goes live
    if (status === PostStatus.PUBLISHED && !existing.publishedAt) {
      updates.publishedAt = now;
    }

    await docRef.update(updates);
    return { message: "Post updated successfully" };
  } catch (error) {
    console.error("Error updating blog post:", error);
    throw new Error("Failed to update blog post");
  }
}

// Fetch stats for admin dashboard
export async function fetchBlogStats() {
  try {
    const postsSnapshot = await db.collection('blogPosts').get();
    const categoriesSnapshot = await db.collection('blogCategories').get();

    const totalPosts = postsSnapshot.size;
    const totalCategories = categoriesSnapshot.size;

    let publishedPosts = 0;
    let draftPosts = 0;
    let totalViews = 0;

    postsSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.status === PostStatus.PUBLISHED) {
        publishedPosts++;
      } else if (data.status === PostStatus.DRAFT) {
        draftPosts++;
      }
      totalViews += (data.views || 0);
    });

    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      totalCategories,
      totalViews
    };
  } catch (error) {
    console.error("Error fetching blog stats:", error);
    throw new Error("Failed to fetch blog stats");
  }
}

// Delete post (admin only)
export const deletePost = async (Id: string): Promise<{ message: string }> => {
  try {
    await db.collection('blogPosts').doc(Id).delete();
    return { message: "Post deleted successfully" };
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post");
  }
};
