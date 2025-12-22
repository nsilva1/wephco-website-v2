import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminCategoriesTable } from '@/components/blog/admin/admin-categories-table';
import { CreateCategoryDialog } from '@/components/blog/admin/create-category-dialog';

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Categories</h1>
          <p className="text-muted-foreground">
            Organize your blog posts with categories
          </p>
        </div>
        <CreateCategoryDialog>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Category
          </Button>
        </CreateCategoryDialog>
      </div>

      <AdminCategoriesTable />
    </div>
  );
}
