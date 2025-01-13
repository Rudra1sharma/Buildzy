'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, Download, Flag, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const artworks = [
  { id: 1, title: 'Abstract Harmony', artist: 'Emma Watson', likes: 245 },
  { id: 2, title: 'Serene Landscape', artist: 'Liam Chen', likes: 189 },
  { id: 3, title: 'Urban Rhythm', artist: 'Sophie Taylor', likes: 302 },
  { id: 4, title: 'Digital Dreams', artist: 'Alex Johnson', likes: 176 },
  { id: 5, title: 'Chromatic Fusion', artist: 'Mia Rodriguez', likes: 221 },
  { id: 6, title: 'Ethereal Visions', artist: 'Noah Kim', likes: 267 },
]

export default function ArtworkGrid({ currentPage }: { currentPage: number }) {
  const [likedArtworks, setLikedArtworks] = useState<number[]>([])
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)

  const itemsPerPage = 9
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedArtworks = artworks.slice(startIndex, endIndex)

  const handleLike = (id: number) => {
    setLikedArtworks((prev) =>
      prev.includes(id) ? prev.filter((artworkId) => artworkId !== id) : [...prev, id]
    )
  }

  const handleReport = () => {
    setIsReportDialogOpen(true)
    setTimeout(() => setIsReportDialogOpen(false), 3000) // Close dialog after 3 seconds
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedArtworks.map((artwork) => (
          <Card key={artwork.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(artwork.title)}`}
                  alt={artwork.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`/placeholder-avatar.jpg?${artwork.artist}`} alt={artwork.artist} />
                  <AvatarFallback>{artwork.artist.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{artwork.title}</p>
                  <p className="text-xs text-muted-foreground">{artwork.artist}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleLike(artwork.id)}
                  className={likedArtworks.includes(artwork.id) ? 'text-red-500' : ''}
                >
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Like</span>
                </Button>
                <span className="text-sm text-muted-foreground">{artwork.likes}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleReport}>
                      <Flag className="mr-2 h-4 w-4" />
                      Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thank You</DialogTitle>
            <DialogDescription>
              Your report has been submitted. We appreciate your feedback and will review the artwork.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

