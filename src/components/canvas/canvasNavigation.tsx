"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const totalPages = 10

export function CanvasNavigation({ onAddPage }: { onAddPage: () => void }) {
  const [activePage, setActivePage] = useState(0)

  return (
    <div className="h-16 bg-muted/30 border-t flex items-center justify-between px-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setActivePage(Math.max(0, activePage - 1))}
        disabled={activePage === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <ScrollArea className="max-w-[600px]" aria-orientation="horizontal">
        <div className="flex space-x-2 px-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={i === activePage ? "default" : "outline"}
              size="sm"
              onClick={() => setActivePage(i)}
            >
              Page {i + 1}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setActivePage(Math.min(totalPages - 1, activePage + 1))}
          disabled={activePage === totalPages - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button onClick={onAddPage} variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

