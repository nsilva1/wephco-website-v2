'use client'

import { useState, useEffect, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchCategories } from "@/actions/blog"
import { IBlogCategory } from "@/interfaces/blogInterface"
import { toast } from "react-toastify"

// Fired by CreateCategoryDialog so this table can reload without a page refresh
export const CATEGORIES_CHANGED_EVENT = "blog:categories-changed"

export function AdminCategoriesTable() {
  const [categories, setCategories] = useState<IBlogCategory[]>([])
  const [loading, setLoading] = useState(true)

  const loadCategories = useCallback(async () => {
    try {
      setCategories(await fetchCategories())
    } catch (error) {
      console.error("Failed to load categories:", error)
      toast.error("Failed to load categories")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCategories()
    window.addEventListener(CATEGORIES_CHANGED_EVENT, loadCategories)
    return () => window.removeEventListener(CATEGORIES_CHANGED_EVENT, loadCategories)
  }, [loadCategories])

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Posts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                Loading categories...
              </TableCell>
            </TableRow>
          )}
          {!loading && categories.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                No categories yet.
              </TableCell>
            </TableRow>
          )}
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.description || "No description"}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: category.color }} />
                  <span className="text-sm font-mono">{category.color}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{category.postCount ?? 0}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
