import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Users, UserCheck, FolderPlus, UsersRound, UserX } from 'lucide-react'

const notifications = [
  { id: 1, type: 'invited_by', content: 'You have been invited by Alex to join "Design Wizards" team', timestamp: '2 hours ago', daysAgo: 0 },
  { id: 2, type: 'joined_to', content: 'You have joined "Creative Minds" team', timestamp: '1 day ago', daysAgo: 1 },
  { id: 3, type: 'create_project', content: 'Emma created a new project "E-commerce Website"', timestamp: '3 days ago', daysAgo: 3 },
  { id: 4, type: 'created_team', content: 'John created a new team "Pixel Perfectors"', timestamp: '4 days ago', daysAgo: 4 },
  { id: 5, type: 'invited_by', content: 'You have been invited by Sarah to join "InnovateX" team', timestamp: '5 days ago', daysAgo: 5 },
  { id: 6, type: 'joined_to', content: 'You have joined "Code Crafters" team', timestamp: '1 week ago', daysAgo: 7 },
  { id: 7, type: 'create_project', content: 'David created a new project "Next.js Dashboard"', timestamp: '2 weeks ago', daysAgo: 14 },
  { id: 8, type: 'created_team', content: 'Emma created a new team "Frontend Wizards"', timestamp: '1 month ago', daysAgo: 30 },
  { id: 9, type: 'left_team', content: 'Michael left the team "Creative Minds"', timestamp: '3 days ago', daysAgo: 3 },  // New Notification
]

const newNotifications = notifications.filter(n => n.daysAgo <= 7)
const oldNotifications = notifications.filter(n => n.daysAgo > 7)

export default function NotificationsList() {
  return (
    <Card>
      <CardContent>
        <ScrollArea className="h-[67vh] pr-4">
          
          {newNotifications.length > 0 && (
            <div className="my-4">
              <h2 className="text-lg font-semibold mb-2"> New </h2>
              <div className="space-y-4">
                {newNotifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            </div>
          )}

          {oldNotifications.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2"> Old </h2>
              <div className="space-y-4">
                {oldNotifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            </div>
          )}

        </ScrollArea>
      </CardContent>
    </Card>
  )
}

// Notification Item Component
function NotificationItem({ notification }: { notification: { type: string; content: string; timestamp: string } }) {
  return (
    <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-100 transition">
      <div className="mt-1">
        {notification.type === 'invited_by' && <Users className="h-5 w-5 text-blue-500" />}
        {notification.type === 'joined_to' && <UserCheck className="h-5 w-5 text-green-500" />}
        {notification.type === 'create_project' && <FolderPlus className="h-5 w-5 text-yellow-500" />}
        {notification.type === 'created_team' && <UsersRound className="h-5 w-5 text-purple-500" />}
        {notification.type === 'left_team' && <UserX className="h-5 w-5 text-red-500" />} {/* New Icon */}
      </div>
      
      <div className="flex-1">
        <p className="text-sm font-medium">{notification.content}</p>
        <p className="text-xs text-gray-500">{notification.timestamp}</p>
      </div>
    </div>
  )
}
