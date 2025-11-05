'use client'

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"
import { fetchCategories } from "@/actions/blog"
import { IBlogCategory } from "@/interfaces/blogInterface"

export function AdminCategoriesTable() {
  const [categories, setCategories] = useState<IBlogCategory[]>([])
  
  useEffect(() => {
    fetchCategories().then(setCategories)
  },[])

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Posts</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
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
                <Badge variant="secondary">{category.posts?.length}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
