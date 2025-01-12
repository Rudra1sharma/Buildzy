import { Activity, User, FileEdit, Share2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const activityItems = [
  { id: 1, type: 'edit', content: 'You edited "Landscape Study"', timestamp: '10 minutes ago', icon: FileEdit },
  { id: 2, type: 'team', content: 'Sarah joined your team "Creative Minds"', timestamp: '1 hour ago', icon: User },
  { id: 3, type: 'share', content: 'You shared "Portrait Sketch" with the team', timestamp: '2 hours ago', icon: Share2 },
  { id: 4, type: 'edit', content: 'You created "Abstract Composition"', timestamp: '1 day ago', icon: FileEdit },
  { id: 5, type: 'team', content: 'You joined "Digital Artists" team', timestamp: '2 days ago', icon: User },
]

export default function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5" />
          Activity Feed
        </CardTitle>
        <CardDescription>Your recent activities and updates.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activityItems.map((item) => (
            <div key={item.id} className="flex items-start space-x-3">
              <div className="rounded-full bg-muted p-1">
                <item.icon className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{item.content}</p>
                <p className="text-sm text-muted-foreground">{item.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

