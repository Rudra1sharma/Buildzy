import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Types } from 'mongoose'

interface ProjectCardProps {
  id: Types.ObjectId
  title: string
  thumbnail: string
  lastEdited: string
  description: string
}

export default function ProjectCard({ id, title, thumbnail, lastEdited }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-video">
          <Image
            src={thumbnail}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4">
        <div>
          <Link href={`/projects/${id.toString()}`} className="font-medium text-primary hover:underline">
            {title}
          </Link>
          <p className="text-sm text-muted-foreground">Last edited {lastEdited}</p>
        </div>
        <div className="flex items-center space-x-1">
        </div>
      </CardFooter>
    </Card>
  )
}

