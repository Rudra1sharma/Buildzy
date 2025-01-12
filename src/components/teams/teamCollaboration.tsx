import { Users, MessageSquare, Share2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function TeamCollaboration() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Team Collaboration Features</CardTitle>
        <CardDescription>Enhance your teamwork with these powerful tools</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Shared Canvases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Work together on the same canvas in real-time. See changes as they happen and collaborate seamlessly.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                Team Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Communicate with your team members in real-time. Share ideas, give feedback, and stay connected.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share2 className="mr-2 h-4 w-4" />
                Project Sharing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Easily share your projects with team members or clients. Control access and permissions for each project.
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

