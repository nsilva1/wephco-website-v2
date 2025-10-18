import { IUser } from "./userInterface";
import { Role } from "./userInterface";

export enum PostStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED", // Assuming this might be another status
}

export interface IBlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  createdAt: Date;
  updatedAt: Date;

  /**
   * Relational field.
   * This property will only be present if you use `include: { posts: true }` in your Prisma query.
   */
  posts?: IBlogPost[];
}


export interface IBlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  status: PostStatus;
  featured: boolean;
  views: number;
  readTime: number | null;
  tags: string[];
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;

  // Foreign Keys
  authorId: string;
  categoryId: string | null;

  /**
   * Relational fields.
   * These properties will only be present if you use `include` in your Prisma query.
   * e.g., `include: { author: true, category: true }`
   */
  author?: IUser;
  category?: IBlogCategory | null;
}

const sampleAuthors: IUser[] = [
  {
    id: "user-001",
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "hashed_password_1",
    role: Role.ADMIN,
    createdAt: new Date("2024-08-15T10:00:00Z"),
  },
  {
    id: "user-002",
    name: "Bob Williams",
    email: "bob@example.com",
    password: "hashed_password_2",
    role: Role.SUPPORT,
    createdAt: new Date("2024-09-01T11:30:00Z"),
  },
];

const sampleCategories: IBlogCategory[] = [
  {
    id: "cat-001",
    name: "TypeScript",
    slug: "typescript",
    description: "Posts related to TypeScript development.",
    color: "#3178C6",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "cat-002",
    name: "React",
    slug: "react",
    description: "Posts about the React library and its ecosystem.",
    color: "#61DAFB",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "cat-003",
    name: "Prisma",
    slug: "prisma",
    description: "Tutorials and guides for Prisma ORM.",
    color: "#2D3748",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const sampleBlogPosts: IBlogPost[] = [
  {
    id: "post-001",
    title: "Getting Started with TypeScript and Next.js",
    slug: "getting-started-with-typescript-and-nextjs",
    content: "Full content of the blog post about TypeScript and Next.js...",
    excerpt: "A beginner-friendly guide to setting up a new Next.js project with TypeScript for maximum type safety.",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070",
    status: PostStatus.PUBLISHED,
    featured: true,
    views: 12580,
    readTime: 8,
    tags: ["typescript", "nextjs", "react", "getting-started"],
    metaTitle: "Beginner's Guide: TypeScript with Next.js",
    metaDescription: "Learn how to set up and use TypeScript in your Next.js projects from scratch.",
    createdAt: new Date("2025-10-05T10:00:00Z"),
    updatedAt: new Date("2025-10-05T10:00:00Z"),
    publishedAt: new Date("2025-10-05T10:00:00Z"),
    authorId: sampleAuthors[0].id!,
    categoryId: sampleCategories[0].id,
    author: sampleAuthors[0],
    category: sampleCategories[0],
  },
  {
    id: "post-002",
    title: "Advanced State Management in React",
    slug: "advanced-state-management-in-react",
    content: "Exploring different state management libraries like Zustand and Jotai...",
    excerpt: "Move beyond useState and useReducer. A deep dive into modern, lightweight state management solutions for React.",
    coverImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070",
    status: PostStatus.PUBLISHED,
    featured: true,
    views: 9870,
    readTime: 12,
    tags: ["react", "state-management", "zustand", "jotai"],
    metaTitle: "Advanced React State Management Techniques",
    metaDescription: "Explore modern state management libraries for React beyond Redux.",
    createdAt: new Date("2025-09-28T14:30:00Z"),
    updatedAt: new Date("2025-09-29T09:00:00Z"),
    publishedAt: new Date("2025-09-28T14:30:00Z"),
    authorId: sampleAuthors[1].id!,
    categoryId: sampleCategories[1].id,
    author: sampleAuthors[1],
    category: sampleCategories[1],
  },
  {
    id: "post-003",
    title: "Building a REST API with Prisma and Express",
    slug: "building-a-rest-api-with-prisma-and-express",
    content: "Step-by-step tutorial on creating a robust API...",
    excerpt: "Learn how to leverage Prisma's powerful ORM with the flexibility of Express.js to build a modern REST API.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
    status: PostStatus.PUBLISHED,
    featured: false,
    views: 7654,
    readTime: 15,
    tags: ["prisma", "api", "express", "nodejs"],
    metaTitle: "Prisma & Express REST API Tutorial",
    metaDescription: "A complete guide to building a REST API using Prisma and Express.",
    createdAt: new Date("2025-09-22T11:00:00Z"),
    updatedAt: new Date("2025-09-22T11:00:00Z"),
    publishedAt: new Date("2025-09-22T11:00:00Z"),
    authorId: sampleAuthors[0].id!,
    categoryId: sampleCategories[2].id,
    author: sampleAuthors[0],
    category: sampleCategories[2],
  },
  {
    id: "post-004",
    title: "Understanding TypeScript Generics",
    slug: "understanding-typescript-generics",
    content: "Full content about TypeScript generics...",
    excerpt: "Unlock the power of reusable components and functions with TypeScript generics. A practical guide with real-world examples.",
    coverImage: null,
    status: PostStatus.PUBLISHED,
    featured: false,
    views: 6543,
    readTime: 9,
    tags: ["typescript", "advanced"],
    metaTitle: "A Guide to TypeScript Generics",
    metaDescription: "Learn how to use generics in TypeScript to write more flexible and reusable code.",
    createdAt: new Date("2025-09-15T09:00:00Z"),
    updatedAt: new Date("2025-09-15T09:00:00Z"),
    publishedAt: new Date("2025-09-15T09:00:00Z"),
    authorId: sampleAuthors[0].id!,
    categoryId: sampleCategories[0].id,
    author: sampleAuthors[0],
    category: sampleCategories[0],
  },
  {
    id: "post-005",
    title: "Client-side vs Server-side Rendering in React",
    slug: "client-side-vs-server-side-rendering-in-react",
    content: "An in-depth comparison of CSR, SSR, SSG, and ISR...",
    excerpt: "What are the trade-offs between different rendering strategies in modern React frameworks like Next.js?",
    coverImage: "https://images.unsplash.com/photo-1522252234503-e3565324585b?q=80&w=2070",
    status: PostStatus.PUBLISHED,
    featured: false,
    views: 8821,
    readTime: 7,
    tags: ["react", "nextjs", "performance"],
    metaTitle: "CSR vs SSR in React: Which is Best?",
    metaDescription: "Compare client-side and server-side rendering to choose the best strategy for your React app.",
    createdAt: new Date("2025-09-10T18:00:00Z"),
    updatedAt: new Date("2025-09-10T18:00:00Z"),
    publishedAt: new Date("2025-09-10T18:00:00Z"),
    authorId: sampleAuthors[1].id!,
    categoryId: sampleCategories[1].id,
    author: sampleAuthors[1],
    category: sampleCategories[1],
  },
  {
    id: "post-006",
    title: "Database Relations in Prisma Made Easy",
    slug: "database-relations-in-prisma-made-easy",
    content: "Full content about one-to-many and many-to-many relations...",
    excerpt: "A clear and concise guide to defining and working with database relations in your Prisma schema.",
    coverImage: null,
    status: PostStatus.PUBLISHED,
    featured: false,
    views: 4321,
    readTime: 10,
    tags: ["prisma", "database"],
    metaTitle: "Easy Guide to Prisma Relations",
    metaDescription: "Learn to define and query one-to-one, one-to-many, and many-to-many relations in Prisma.",
    createdAt: new Date("2025-09-03T12:00:00Z"),
    updatedAt: new Date("2025-09-03T12:00:00Z"),
    publishedAt: new Date("2025-09-03T12:00:00Z"),
    authorId: sampleAuthors[0].id!,
    categoryId: sampleCategories[2].id,
    author: sampleAuthors[0],
    category: sampleCategories[2],
  },
  {
    id: "post-007",
    title: "Top 5 VS Code Extensions for React Developers",
    slug: "top-5-vs-code-extensions-for-react-developers",
    content: "A list of must-have extensions for productivity...",
    excerpt: "Boost your development speed and code quality with these essential VS Code extensions tailored for React developers.",
    coverImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2070",
    status: PostStatus.PUBLISHED,
    featured: false,
    views: 15432,
    readTime: 5,
    tags: ["react", "vscode", "tools"],
    metaTitle: null,
    metaDescription: null,
    createdAt: new Date("2025-08-28T16:45:00Z"),
    updatedAt: new Date("2025-08-28T16:45:00Z"),
    publishedAt: new Date("2025-08-28T16:45:00Z"),
    authorId: sampleAuthors[1].id!,
    categoryId: sampleCategories[1].id,
    author: sampleAuthors[1],
    category: sampleCategories[1],
  },
  {
    id: "post-008",
    title: "How to Secure a Next.js Application",
    slug: "how-to-secure-a-nextjs-application",
    content: "Best practices for security in Next.js...",
    excerpt: "From environment variables to authentication and authorization, learn the key steps to secure your Next.js app.",
    coverImage: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070",
    status: PostStatus.PUBLISHED,
    featured: false,
    views: 5555,
    readTime: 11,
    tags: ["nextjs", "security", "authentication"],
    metaTitle: "Next.js Security Best Practices",
    metaDescription: "Follow these best practices to keep your Next.js application secure from common vulnerabilities.",
    createdAt: new Date("2025-08-21T10:00:00Z"),
    updatedAt: new Date("2025-08-21T10:00:00Z"),
    publishedAt: new Date("2025-08-21T10:00:00Z"),
    authorId: sampleAuthors[0].id!,
    categoryId: sampleCategories[0].id,
    author: sampleAuthors[0],
    category: sampleCategories[0],
  },
  {
    id: "post-009",
    title: "Migrating from JavaScript to TypeScript: A Case Study",
    slug: "migrating-from-javascript-to-typescript-a-case-study",
    content: "Our team's journey migrating a large codebase...",
    excerpt: "The challenges, benefits, and key takeaways from our experience migrating a production JavaScript application to TypeScript.",
    coverImage: null,
    status: PostStatus.PUBLISHED,
    featured: false,
    views: 3456,
    readTime: 13,
    tags: ["typescript", "javascript", "refactoring"],
    metaTitle: null,
    metaDescription: null,
    createdAt: new Date("2025-08-14T15:20:00Z"),
    updatedAt: new Date("2025-08-14T15:20:00Z"),
    publishedAt: new Date("2025-08-14T15:20:00Z"),
    authorId: sampleAuthors[1].id!,
    categoryId: sampleCategories[0].id,
    author: sampleAuthors[1],
    category: sampleCategories[0],
  },
  {
    id: "post-010",
    title: "Exploring New Features in React 19",
    slug: "exploring-new-features-in-react-19",
    content: "A look at the upcoming features in the next major version of React...",
    excerpt: "This post is still under development and will be published soon. Stay tuned for updates on React 19!",
    coverImage: null,
    status: PostStatus.DRAFT,
    featured: false,
    views: 10,
    readTime: null,
    tags: ["react", "upcoming"],
    metaTitle: null,
    metaDescription: null,
    createdAt: new Date("2025-10-06T00:10:00Z"),
    updatedAt: new Date("2025-10-06T00:10:00Z"),
    publishedAt: null,
    authorId: sampleAuthors[1].id!,
    categoryId: sampleCategories[1].id,
    author: sampleAuthors[1],
    category: sampleCategories[1],
  },
];