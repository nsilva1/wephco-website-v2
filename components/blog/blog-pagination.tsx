"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogPaginationProps {
  pagination: {
    page: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

interface PaginatedResponse<T> {
  posts?: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// export function BlogPagination({ pagination }: BlogPaginationProps) {
//   const searchParams = useSearchParams()

//   const createPageUrl = (page: number) => {
//     const params = new URLSearchParams(searchParams)
//     params.set("page", page.toString())
//     return `/blog?${params.toString()}`
//   }

//   const { page, totalPages, hasNext, hasPrev } = pagination

//   return (
//     <div className="flex items-center justify-center gap-2">
//       {/* Previous Button */}
//       {hasPrev ? (
//         <Link href={createPageUrl(page - 1)}>
//           <Button variant="outline" size="sm" className="gap-1 bg-transparent">
//             <ChevronLeft className="h-4 w-4" />
//             Previous
//           </Button>
//         </Link>
//       ) : (
//         <Button variant="outline" size="sm" disabled className="gap-1 bg-transparent">
//           <ChevronLeft className="h-4 w-4" />
//           Previous
//         </Button>
//       )}

//       {/* Page Numbers */}
//       <div className="flex items-center gap-1">
//         {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//           let pageNum: number

//           if (totalPages <= 5) {
//             pageNum = i + 1
//           } else if (page <= 3) {
//             pageNum = i + 1
//           } else if (page >= totalPages - 2) {
//             pageNum = totalPages - 4 + i
//           } else {
//             pageNum = page - 2 + i
//           }

//           const isActive = pageNum === page

//           return (
//             <Link key={pageNum} href={createPageUrl(pageNum)}>
//               <Button variant={isActive ? "default" : "outline"} size="sm" className="w-10">
//                 {pageNum}
//               </Button>
//             </Link>
//           )
//         })}
//       </div>

//       {/* Next Button */}
//       {hasNext ? (
//         <Link href={createPageUrl(page + 1)}>
//           <Button variant="outline" size="sm" className="gap-1 bg-transparent">
//             Next
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//         </Link>
//       ) : (
//         <Button variant="outline" size="sm" disabled className="gap-1 bg-transparent">
//           Next
//           <ChevronRight className="h-4 w-4" />
//         </Button>
//       )}
//     </div>
//   )
// }


const BlogPagination = ({ pagination, onPageChange }: { pagination: PaginatedResponse<any>['pagination'], onPageChange: (page: number) => void }) => {
    const { page, totalPages } = pagination;
    return (
        <div className="flex justify-center items-center gap-4 mt-8">
            <button 
                onClick={() => onPageChange(page - 1)} 
                disabled={page <= 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
                Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button 
                onClick={() => onPageChange(page + 1)} 
                disabled={page >= totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    )
};

export { BlogPagination }