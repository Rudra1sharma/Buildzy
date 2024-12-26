'use client'

import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function GalleryHeader() {
  const [filterOptions, setFilterOptions] = useState({
    myArtwork: false,
    followingArtwork: false,
    featuredArtwork: false,
  })

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-3xl font-bold">Gallery</h1>
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            type="search"
            placeholder="Search artwork..."
            className="pl-8"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={filterOptions.myArtwork}
              onCheckedChange={(checked) =>
                setFilterOptions((prev) => ({ ...prev, myArtwork: checked }))
              }
            >
              My Artwork
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterOptions.followingArtwork}
              onCheckedChange={(checked) =>
                setFilterOptions((prev) => ({ ...prev, followingArtwork: checked }))
              }
            >
              Following
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterOptions.featuredArtwork}
              onCheckedChange={(checked) =>
                setFilterOptions((prev) => ({ ...prev, featuredArtwork: checked }))
              }
            >
              Featured
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

