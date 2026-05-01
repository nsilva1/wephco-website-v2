import { getProperties } from "@/actions/property-management";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const revalidate = 0;

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Properties</h2>
        <Link href="/dashboard/properties/new">
          <Button className="bg-[#cfb53b] hover:bg-[#b89e2f] text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </Link>
      </div>
      <div className="flex-1">
        <DataTable columns={columns} data={properties} />
      </div>
    </div>
  );
}
