import Image from 'next/image'
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default function FeaturedArtwork() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Featured Artwork</CardTitle>
        <CardDescription>Highlighted piece from our community</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Featured Artwork"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" alt="@artist" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Aria Rodriguez</p>
              <p className="text-xs text-muted-foreground">@aria_art</p>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Like</span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-4 w-4" />
              <span className="sr-only">Comment</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          "Neon Dreams" - A vibrant cityscape capturing the energy of urban nights.
        </p>
      </CardFooter>
    </Card>
  )
}

