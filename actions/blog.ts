'use server';

import { db } from "@/firebase/firebaseConfig";
import { IBlogPost, IBlogCategory, PostStatus } from "@/interfaces/blogInterface";

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

// ==========================================
// BLOG POSTS ACTIONS
// ==========================================

// Create new blog post
export const createBlogPost = async (
  postData: Omit<IBlogPost, 'slug' | 'views' | 'readTime' | 'metaTitle' | 'metaDescription' | 'publishedAt'>
): Promise<IBlogPost> => {
  try {
    const slug = `${slugify(postData.title)}-${Math.random().toString(36).substr(2, 5)}`;
    const readTime = calculateReadTime(postData.content);
    
    const newPost: any = {
      ...postData,
      slug,
      readTime,
      views: 0,
      metaTitle: postData.title,
      metaDescription: postData.excerpt || postData.content.substring(0, 150),
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: postData.status === PostStatus.PUBLISHED ? new Date() : null,
    };

    const docRef = await db.collection('blogPosts').add(newPost);
    return { id: docRef.id, ...newPost } as IBlogPost;
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw new Error("Failed to create blog post");
  }
};

// Fetch published posts
export const fetchPosts = async (): Promise<IBlogPost[]> => {
  try {
    const snapshot = await db
      .collection('blogPosts')
      .where('status', '==', PostStatus.PUBLISHED)
      .orderBy('createdAt', 'desc')
      .get();

    const posts = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt,
        publishedAt: data.publishedAt?.toDate ? data.publishedAt.toDate() : data.publishedAt,
      };
    }) as any[];

    // Resolve category details
    const resolvedPosts = await Promise.all(posts.map(async (post) => {
      if (post.categoryId) {
        const catDoc = await db.collection('blogCategories').doc(post.categoryId).get();
        if (catDoc.exists) {
          post.category = { id: catDoc.id, ...catDoc.data() };
        }
      }
      return post;
    }));

    return resolvedPosts as IBlogPost[];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error("Failed to fetch blog posts");
  }
};

// Fetch single blog post by slug
export const fetchPost = async (slug: string): Promise<IBlogPost> => {
  try {
    const snapshot = await db
      .collection('blogPosts')
      .where('slug', '==', slug)
      .limit(1)
      .get();

    if (snapshot.empty) {
      throw new Error("Post not found");
    }

    const doc = snapshot.docs[0];
    const data = doc.data();
    
    // Increment view count asynchronously
    await db.collection('blogPosts').doc(doc.id).update({
      views: (data.views || 0) + 1
    });

    const post: any = {
      id: doc.id,
      ...data,
      views: (data.views || 0) + 1,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
      updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt,
      publishedAt: data.publishedAt?.toDate ? data.publishedAt.toDate() : data.publishedAt,
    };

    if (post.categoryId) {
      const catDoc = await db.collection('blogCategories').doc(post.categoryId).get();
      if (catDoc.exists) {
        post.category = { id: catDoc.id, ...catDoc.data() };
      }
    }

    return post as IBlogPost;
  } catch (error) {
    console.error(`Error fetching post with slug: ${slug}`, error);
    throw new Error("Failed to fetch blog post details");
  }
};

// ==========================================
// BLOG CATEGORIES ACTIONS
// ==========================================

// Fetch categories
export const fetchCategories = async (): Promise<IBlogCategory[]> => {
  try {
    const snapshot = await db.collection('blogCategories').get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt,
      };
    }) as any[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

// Create new category
export const createCategory = async (data: Partial<IBlogCategory>): Promise<IBlogCategory> => {
  try {
    const slug = slugify(data.name || 'Category');
    const newCategory: any = {
      name: data.name,
      color: data.color || '#d4af35',
      description: data.description || '',
      slug,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection('blogCategories').add(newCategory);
    return { id: docRef.id, ...newCategory } as IBlogCategory;
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Failed to create category");
  }
};

// ==========================================
// ADMIN ACTIONS
// ==========================================

// Fetch posts for admin (paginated, unfiltered by status)
export async function fetchAdminPosts(params?: {
  page?: number;
  limit?: number;
  status?: string;
}): Promise<PaginatedResponse<IBlogPost>> {
  try {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    
    let query = db.collection('blogPosts').orderBy('createdAt', 'desc');
    
    if (params?.status) {
      query = query.where('status', '==', params.status) as any;
    }

    const snapshot = await query.get();
    const total = snapshot.size;
    const totalPages = Math.ceil(total / limit);

    // Manual slice pagination since Firestore admin lacks simple offset
    const startIndex = (page - 1) * limit;
    const slicedDocs = snapshot.docs.slice(startIndex, startIndex + limit);

    const posts = await Promise.all(slicedDocs.map(async (doc) => {
      const data = doc.data();
      const post: any = {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt,
        publishedAt: data.publishedAt?.toDate ? data.publishedAt.toDate() : data.publishedAt,
      };

      if (post.categoryId) {
        const catDoc = await db.collection('blogCategories').doc(post.categoryId).get();
        if (catDoc.exists) {
          post.category = { id: catDoc.id, ...catDoc.data() };
        }
      }
      return post;
    }));

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
