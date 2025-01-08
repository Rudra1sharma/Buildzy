'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Pencil, Trash2, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Mock data for projects
const allProjects = [
  { id: 1, title: 'Abstract Harmony', lastEdited: '2 hours ago', thumbnail: '/placeholder.svg?height=100&width=100', team: { id: 1, name: 'Design Wizards', members: 5 }, isPublic: true },
  { id: 2, title: 'Serene Landscape', lastEdited: '1 day ago', thumbnail: '/placeholder.svg?height=100&width=100', team: { id: 2, name: 'Creative Minds', members: 3 }, isPublic: false },
  { id: 3, title: 'Urban Rhythm', lastEdited: '3 days ago', thumbnail: '/placeholder.svg?height=100&width=100', team: { id: 1, name: 'Design Wizards', members: 5 }, isPublic: true },
  { id: 4, title: 'Digital Dreams', lastEdited: '1 week ago', thumbnail: '/placeholder.svg?height=100&width=100', team: { id: 3, name: 'Pixel Perfectors', members: 4 }, isPublic: false },
  { id: 5, title: 'Chromatic Fusion', lastEdited: '2 weeks ago', thumbnail: '/placeholder.svg?height=100&width=100', team: { id: 2, name: 'Creative Minds', members: 3 }, isPublic: true },
  { id: 6, title: 'Ethereal Visions', lastEdited: '1 month ago', thumbnail: '/placeholder.svg?height=100&width=100', team: { id: 3, name: 'Pixel Perfectors', members: 4 }, isPublic: false },
  { id: 7, title: 'Neon Nights', lastEdited: '1 month ago', thumbnail: '/placeholder.svg?height=100&width=100', team: { id: 1, name: 'Design Wizards', members: 5 }, isPublic: true },
  { id: 8, title: 'Geometric Wonders', lastEdited: '2 months ago', thumbnail: '/placeholder.svg?height=100&width=100', team: { id: 2, name: 'Creative Minds', members: 3 }, isPublic: false },
  { id: 9, title: 'Futuristic Cityscapes', lastEdited: '2 months ago', thumbnail: '/placeholder.svg?height=100&width=100', team: { id: 3, name: 'Pixel Perfectors', members: 4 }, isPublic: true },
  { id: 10, title: 'Organic Forms', lastEdited: '3 months ago', thumbnail: '/placeholder.svg?height=100&width=100', team: { id: 1, name: 'Design Wizards', members: 5 }, isPublic: false },
]

export default function ProjectsOverview() {
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const projectsPerPage = 3

  const totalPages = Math.ceil(allProjects.length / projectsPerPage)
  const currentProjects = allProjects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  )

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
  }

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Your Projects</CardTitle>
        <Dialog open={isCreateProjectOpen} onOpenChange={setIsCreateProjectOpen}>
          <DialogTrigger asChild>
            <Button size="lg">+<span>     </span>New Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Project</DialogTitle>
              <DialogDescription>
                Give your project a name to get started.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project-name" className="text-right">
                  Project Name
                </Label>
                <Input id="project-name" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {currentProjects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="absolute left-2 top-2 z-10">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  project.isPublic ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {project.isPublic ? 'Public' : 'Private'}
                </span>
              </div>
              <div className="aspect-square overflow-hidden rounded-md">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  width={100}
                  height={100}
                  className="object-cover transition-all hover:scale-105"
                />
              </div>
              <div className="pt-2">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Last edited {project.lastEdited}
                </p>
                <div className="mt-2">
                  <Link href={`/teams/${project.team.id}`} className="text-sm text-blue-500 hover:underline">
                    {project.team.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{project.team.members} members</p>
                </div>
              </div>
              <div className="absolute right-2 top-2 flex space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Button variant="secondary" size="icon">
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={prevPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}