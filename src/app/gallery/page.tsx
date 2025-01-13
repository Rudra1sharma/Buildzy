import { Metadata } from 'next'
import GalleryHeader from '@/components/gallery/galleryHeader'
import ArtworkGrid from '@/components/gallery/artworkGrid'
import FeaturedArtwork from '@/components/gallery/featuredArtwork'
import Pagination from '@/components/pagination'
import DashboardHeader from '@/components/dashboard/dashboardHeader'

export const metadata: Metadata = {
    title: 'Gallery | Real-Time Paint App',
    description: 'Explore and showcase artwork in our real-time paint application gallery.',
}

export default function GalleryPage({ searchParams }: { searchParams: { page?: string } }) {
    const currentPage = Number(searchParams.page) || 1

    return (
        <div className="flex flex-col min-h-screen">
            <DashboardHeader />
            <div className="container mx-auto py-8">
                <GalleryHeader />
                <div className="grid gap-8">
                    <FeaturedArtwork />
                    <ArtworkGrid currentPage={currentPage} />
                    {/*Pagination is not working for gallery page adjust it */}
                    <Pagination currentPage={currentPage} totalPages={5} /> {/* Adjust totalPages based on your data */}
                </div>
            </div>
        </div>
    )
}

