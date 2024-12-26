import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ProjectCardProps {
  id: number
  title: string
  thumbnail: string
  lastEdited: string
  members: number
}

export default function ProjectCard({ id, title, thumbnail, lastEdited, members }: ProjectCardProps) {
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
          <Link href={`/projects/${id}`} className="font-medium text-primary hover:underline">
            {title}
          </Link>
          <p className="text-sm text-muted-foreground">Last edited {lastEdited}</p>
        </div>
        <div className="flex items-center space-x-1">
          <Avatar className="h-6 w-6">
            <AvatarFallback>{members}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{members} member{members !== 1 ? 's' : ''}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

