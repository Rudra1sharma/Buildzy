'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Users, LogOut, UserPlus, FolderPlus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

const teams = [
  { id: 1, name: 'Design Wizards', members: 5, projects: 12 },
  { id: 2, name: 'Creative Minds', members: 3, projects: 8 },
  { id: 3, name: 'Pixel Perfectors', members: 4, projects: 15 },
  { id: 4, name: 'Color Harmony', members: 6, projects: 10 },
  { id: 5, name: 'Digital Dreamers', members: 4, projects: 7 },
  { id: 6, name: 'Brush Masters', members: 3, projects: 9 },
]

export default function TeamOverview() {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false)
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null)

  return (
    <Card className='h-[470px]'>
      <CardHeader>
        <CardTitle>Your Teams</CardTitle>
        <CardDescription>Teams you're currently a part of</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-4">
            {teams.map((team) => (
              <div key={team.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{team.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link href={`/teams/${team.id}`} className="font-medium hover:underline">
                      {team.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {team.members} members · {team.projects} projects
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Dialog open={isAddMemberOpen && selectedTeamId === team.id} onOpenChange={(open) => {
                    setIsAddMemberOpen(open)
                    if (open) setSelectedTeamId(team.id)
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <UserPlus className="h-4 w-4" />
                        <span className="sr-only">Add member</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Member to {team.name}</DialogTitle>
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
                  <Dialog open={isAddProjectOpen && selectedTeamId === team.id} onOpenChange={(open) => {
                    setIsAddProjectOpen(open)
                    if (open) setSelectedTeamId(team.id)
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <FolderPlus className="h-4 w-4" />
                        <span className="sr-only">Add project</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Project to {team.name}</DialogTitle>
                        <DialogDescription>
                          Enter the name of the new project you want to add to this team.
                        </DialogDescription>
                      </DialogHeader>
                      <Input placeholder="Enter project name" />
                      <DialogFooter>
                        <Button type="submit">Add Project</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="icon">
                    <LogOut className="h-4 w-4" />
                    <span className="sr-only">Leave team</span>
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

