'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { UserPlus, X } from 'lucide-react'

const members = [
  { id: 1, name: 'John Doe', role: 'Designer' },
  { id: 2, name: 'Jane Smith', role: 'Illustrator' },
  { id: 3, name: 'Mike Johnson', role: 'Art Director' },
]

export default function TeamMembers({ teamId }: { teamId: string }) {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Team Members</CardTitle>
          <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Team Member</DialogTitle>
                <DialogDescription>
                  Enter the unique ID of the user you want to add to this team.
                </DialogDescription>
              </DialogHeader>
              <Input placeholder="Enter user's unique ID" />
              <DialogFooter>
                <Button type="submit">Add Member</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <CardDescription>Manage your team members</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
                <span className="sr-only">Remove member</span>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

