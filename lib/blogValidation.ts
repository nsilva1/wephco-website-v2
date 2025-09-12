export interface CreatePostInput {
  title: string
  content: string
  excerpt?: string
  coverImage?: string
  categoryId?: string
  tags: string[]
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  featured: boolean
}

export interface UpdatePostInput {
  title?: string
  content?: string
  excerpt?: string
  coverImage?: string
  categoryId?: string
  tags?: string[]
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  featured?: boolean
}

export interface CreateCategoryInput {
  name: string
  description?: string
  color?: string
}

export interface ValidationError {
  field: string
  message: string
}

export function validateCreatePost(data: any): { isValid: boolean; errors: ValidationError[]; data?: CreatePostInput } {
  const errors: ValidationError[] = []

  // Title validation
  if (!data.title || typeof data.title !== "string") {
    errors.push({ field: "title", message: "Title is required" })
  } else if (data.title.length > 200) {
    errors.push({ field: "title", message: "Title too long" })
  }

  // Content validation
  if (!data.content || typeof data.content !== "string") {
    errors.push({ field: "content", message: "Content is required" })
  }

  // Excerpt validation
  if (data.excerpt && typeof data.excerpt === "string" && data.excerpt.length > 300) {
    errors.push({ field: "excerpt", message: "Excerpt too long" })
  }

  // Cover image validation
  if (data.coverImage && typeof data.coverImage === "string") {
    try {
      new URL(data.coverImage)
    } catch {
      errors.push({ field: "coverImage", message: "Invalid image URL" })
    }
  }

  // Tags validation
  const tags = Array.isArray(data.tags) ? data.tags : []
  if (!tags.every((tag: any) => typeof tag === "string")) {
    errors.push({ field: "tags", message: "Tags must be an array of strings" })
  }

  // Status validation
  const validStatuses = ["DRAFT", "PUBLISHED", "ARCHIVED"]
  const status = data.status || "DRAFT"
  if (!validStatuses.includes(status)) {
    errors.push({ field: "status", message: "Invalid status" })
  }

  // Featured validation
  const featured = Boolean(data.featured)

  if (errors.length > 0) {
    return { isValid: false, errors }
  }

  return {
    isValid: true,
    errors: [],
    data: {
      title: data.title,
      content: data.content,
      excerpt: data.excerpt || undefined,
      coverImage: data.coverImage || undefined,
      categoryId: data.categoryId || undefined,
      tags,
      status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
      featured,
    },
  }
}

export function validateUpdatePost(data: any): { isValid: boolean; errors: ValidationError[]; data?: UpdatePostInput } {
  const errors: ValidationError[] = []

  // Title validation (optional)
  if (data.title !== undefined) {
    if (typeof data.title !== "string" || data.title.length === 0) {
      errors.push({ field: "title", message: "Title must be a non-empty string" })
    } else if (data.title.length > 200) {
      errors.push({ field: "title", message: "Title too long" })
    }
  }

  // Content validation (optional)
  if (data.content !== undefined) {
    if (typeof data.content !== "string" || data.content.length === 0) {
      errors.push({ field: "content", message: "Content must be a non-empty string" })
    }
  }

  // Excerpt validation (optional)
  if (data.excerpt !== undefined && typeof data.excerpt === "string" && data.excerpt.length > 300) {
    errors.push({ field: "excerpt", message: "Excerpt too long" })
  }

  // Cover image validation (optional)
  if (data.coverImage !== undefined && typeof data.coverImage === "string") {
    try {
      new URL(data.coverImage)
    } catch {
      errors.push({ field: "coverImage", message: "Invalid image URL" })
    }
  }

  // Tags validation (optional)
  if (data.tags !== undefined) {
    if (!Array.isArray(data.tags) || !data.tags.every((tag: any) => typeof tag === "string")) {
      errors.push({ field: "tags", message: "Tags must be an array of strings" })
    }
  }

  // Status validation (optional)
  if (data.status !== undefined) {
    const validStatuses = ["DRAFT", "PUBLISHED", "ARCHIVED"]
    if (!validStatuses.includes(data.status)) {
      errors.push({ field: "status", message: "Invalid status" })
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors }
  }

  const validatedData: UpdatePostInput = {}
  if (data.title !== undefined) validatedData.title = data.title
  if (data.content !== undefined) validatedData.content = data.content
  if (data.excerpt !== undefined) validatedData.excerpt = data.excerpt
  if (data.coverImage !== undefined) validatedData.coverImage = data.coverImage
  if (data.categoryId !== undefined) validatedData.categoryId = data.categoryId
  if (data.tags !== undefined) validatedData.tags = data.tags
  if (data.status !== undefined) validatedData.status = data.status
  if (data.featured !== undefined) validatedData.featured = Boolean(data.featured)

  return { isValid: true, errors: [], data: validatedData }
}

export function validateCreateCategory(data: any): {
  isValid: boolean
  errors: ValidationError[]
  data?: CreateCategoryInput
} {
  const errors: ValidationError[] = []

  // Name validation
  if (!data.name || typeof data.name !== "string") {
    errors.push({ field: "name", message: "Name is required" })
  } else if (data.name.length > 50) {
    errors.push({ field: "name", message: "Name too long" })
  }

  // Description validation
  if (data.description && typeof data.description === "string" && data.description.length > 200) {
    errors.push({ field: "description", message: "Description too long" })
  }

  // Color validation
  if (data.color && typeof data.color === "string") {
    if (!/^#[0-9A-F]{6}$/i.test(data.color)) {
      errors.push({ field: "color", message: "Invalid color format" })
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors }
  }

  return {
    isValid: true,
    errors: [],
    data: {
      name: data.name,
      description: data.description || undefined,
      color: data.color || undefined,
    },
  }
}
