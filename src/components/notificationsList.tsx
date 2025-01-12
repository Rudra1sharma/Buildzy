import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bell, UserPlus, Paintbrush, MessageSquare } from 'lucide-react'

const notifications = [
  { id: 1, type: 'team_invite', content: 'You have been invited to join "Design Wizards" team', timestamp: '2 hours ago' },
  { id: 2, type: 'new_comment', content: 'Alex commented on your "Sunset Landscape" project', timestamp: '1 day ago' },
  { id: 3, type: 'project_update', content: 'Emma made changes to the "Logo Design" project', timestamp: '2 days ago' },
  { id: 4, type: 'team_invite', content: 'You have been invited to join "Creative Minds" team', timestamp: '3 days ago' },
  { id: 5, type: 'new_comment', content: 'Sarah commented on your "Abstract Art" project', timestamp: '1 week ago' },
  { id: 6, type: 'project_update', content: 'John made changes to the "Website Mockup" project', timestamp: '1 week ago' },
  { id: 7, type: 'team_invite', content: 'You have been invited to join "Pixel Perfectors" team', timestamp: '2 weeks ago' },
]

export default function NotificationsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
        <CardDescription>Stay updated with your latest activities and invitations</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[53vh] pr-4">
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-4">
                <div className="mt-1">
                  {notification.type === 'team_invite' && <UserPlus className="h-5 w-5 text-blue-500" />}
                  {notification.type === 'new_comment' && <MessageSquare className="h-5 w-5 text-green-500" />}
                  {notification.type === 'project_update' && <Paintbrush className="h-5 w-5 text-yellow-500" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.content}</p>
                  <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                </div>
                <Button variant="ghost" size="sm">
                  Mark as read
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

