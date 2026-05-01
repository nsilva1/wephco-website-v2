import { notFound } from "next/navigation"
import { getPropertyById } from "@/actions/property-management"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Building2, MapPin, DollarSign, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import PropertyControls from "./PropertyControls"
import { formatCurrency } from "@/lib/utils"

export const revalidate = 0;

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const property = await getPropertyById(id)

  if (!property) return notFound()

  const tagColors: Record<string, string> = {
    verified: 'bg-green-500 hover:bg-green-600 text-white',
    pending: 'bg-amber-500 hover:bg-amber-600 text-white',
  }

  const statusColors: Record<string, string> = {
    available: 'bg-green-500 hover:bg-green-600 text-white',
    'under offer': 'bg-blue-500 hover:bg-blue-600 text-white',
    sold: 'bg-slate-600 hover:bg-slate-700 text-white',
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/properties">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">{property.title}</h2>
        <Badge variant="secondary" className={`capitalize ${tagColors[property.tag] || ''}`}>
          {property.tag || 'pending'}
        </Badge>
        <Badge variant="secondary" className={`capitalize ${statusColors[property.status] || ''}`}>
          {property.status || 'available'}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Image & Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              Property Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {property.image && (
              <div className="relative w-full h-56 rounded-lg overflow-hidden">
                <Image src={property.image} alt={property.title} fill className="object-cover" sizes="600px" />
              </div>
            )}
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground flex items-center gap-1"><MapPin className="h-4 w-4" /> Location</span>
              <span className="font-medium">{property.location}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Developer</span>
              <span className="font-medium">{property.developer}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground flex items-center gap-1"><DollarSign className="h-4 w-4" /> Price</span>
              <span className="font-bold text-lg text-[#cfb53b]">{formatCurrency(property.price, property.currency)}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground flex items-center gap-1"><TrendingUp className="h-4 w-4" /> Yield</span>
              <span className="font-medium">{property.yieldValue}%</span>
            </div>
            {property.pdfUrl && (
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">PDF Brochure</span>
                <a href={property.pdfUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
                  Download
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {property.description || 'No description provided.'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <PropertyControls
            propertyId={property.id!}
            currentTag={property.tag || 'pending'}
            currentStatus={property.status || 'available'}
          />
        </CardContent>
      </Card>
    </div>
  )
}
