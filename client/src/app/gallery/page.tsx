import { Metadata } from 'next'
import GalleryHeader from '@/components/gallery-header'
import ArtworkGrid from '@/components/artwork-grid'
import FeaturedArtwork from '@/components/featured-artwork'
import Pagination from '@/components/pagination'

export const metadata: Metadata = {
  title: 'Gallery | Real-Time Paint App',
  description: 'Explore and showcase artwork in our real-time paint application gallery.',
}

export default function GalleryPage({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams.page) || 1

  return (
    <div className="container mx-auto py-8">
      <GalleryHeader />
      <div className="grid gap-8">
        <FeaturedArtwork />
        <ArtworkGrid currentPage={currentPage} />
        <Pagination currentPage={currentPage} totalPages={5} /> {/* Adjust totalPages based on your data */}
      </div>
    </div>
  )
}

