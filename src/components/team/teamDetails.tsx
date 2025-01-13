import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

export default function TeamDetails({ teamId }: { teamId: string }) {
  // In a real application, you would fetch team details based on the teamId
  const team = {
    name: 'Design Wizards',
    description: 'A team of creative designers working on various projects.',
    createdAt: 'January 1, 2023',
    members: 5,
    projects: 12,
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback>{team.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{team.name}</CardTitle>
              <CardDescription>{team.description}</CardDescription>
            </div>
          </div>
          <Button variant="outline">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Team
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm font-medium">Created</p>
            <p className="text-sm text-muted-foreground">{team.createdAt}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Members</p>
            <p className="text-sm text-muted-foreground">{team.members}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Projects</p>
            <p className="text-sm text-muted-foreground">{team.projects}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

