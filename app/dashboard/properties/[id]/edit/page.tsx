import { notFound } from "next/navigation"
import { getPropertyById } from "@/actions/property-management"
import PropertyForm from "../../PropertyForm"

export const revalidate = 0;

export default async function EditPropertyPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const property = await getPropertyById(id)

  if (!property) return notFound()

  return <PropertyForm mode="edit" property={property} />;
}
