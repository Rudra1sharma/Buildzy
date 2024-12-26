import { UserPlus, Check, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

const invitations = [
  { id: 1, teamName: 'Pixel Perfectors', inviter: 'Alex Johnson' },
  { id: 2, teamName: 'Creative Minds', inviter: 'Sam Smith' },
  { id: 3, teamName: 'Design Wizards', inviter: 'Emma Watson' },
  { id: 4, teamName: 'Color Harmony', inviter: 'Olivia Brown' },
  { id: 5, teamName: 'Digital Dreamers', inviter: 'Liam Wilson' },
]

export default function TeamInvitations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Invitations</CardTitle>
        <CardDescription>Pending invitations to join teams</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[173px] pr-4">
          <div className="space-y-4">
            {invitations.map((invitation) => (
              <div key={invitation.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{invitation.teamName.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{invitation.teamName}</p>
                    <p className="text-sm text-muted-foreground">
                      Invited by {invitation.inviter}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Check className="mr-2 h-4 w-4" />
                    Accept
                  </Button>
                  <Button variant="ghost" size="sm">
                    <X className="mr-2 h-4 w-4" />
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

