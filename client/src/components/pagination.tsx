import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        asChild
        disabled={currentPage <= 1}
      >
        <Link href={`${baseUrl}?page=${currentPage - 1}`}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Link>
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        asChild
        disabled={currentPage >= totalPages}
      >
        <Link href={`${baseUrl}?page=${currentPage + 1}`}>
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Link>
      </Button>
    </div>
  )
}

