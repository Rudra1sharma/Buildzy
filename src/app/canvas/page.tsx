"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ToolsPanel } from "@/components/canvas/toolsPanel"
import { DrawingCanvas } from "@/components/canvas/drawingCanvas"
import { UsersList } from "@/components/canvas/usersList"
import { ChatPanel } from "@/components/canvas/chatPanel"
import { CanvasNavigation } from "@/components/canvas/canvasNavigation"
import { ConfirmDialog } from "@/components/canvas/confirmDialog"
import { Button } from "@/components/ui/button"
import DashboardHeader from "@/components/dashboard/dashboardHeader"
import { Save, LogOut, Paintbrush, Share2 } from "lucide-react"

export default function CanvasPage() {
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false)

  const handleSave = () => {
    // Implement save functionality
    console.log("Saving canvas...")
  }

  const handleShare = () => {
    // Implement share functionality
    console.log("Sharing canvas...")
  }

  const handleExit = () => {
    setIsExitDialogOpen(true)
  }

  const handleConfirmExit = () => {
    // Implement exit functionality
    console.log("Exiting canvas...")
    setIsExitDialogOpen(false)
  }

  const handleAddPage = () => {
    // Implement add page functionality
    console.log("Adding new page...")
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <DashboardHeader />
      <div className="h-14 bg-muted/50 border-b flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Paintbrush className="h-5 w-5 text-primary" />
          <span className="font-semibold text-lg">Design Wizards: Logo Redesign Project</span>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={handleSave}
            variant="outline"
            size="sm"
            className="bg-green-100 hover:bg-green-200 text-green-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            size="sm"
            className="bg-blue-100 hover:bg-blue-200 text-blue-700"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button onClick={handleExit} variant="outline" size="sm" className="bg-red-100 hover:bg-red-200 text-red-700">
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <ToolsPanel />
        <div className="flex-1 flex flex-col">
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <DrawingCanvas />
          </motion.div>
        </div>
        <motion.div
          className="w-80 bg-muted/30 border-l flex flex-col"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <UsersList />
          <div className="flex-1 overflow-hidden flex flex-col">
            <ChatPanel />
          </div>
        </motion.div>
      </div>
      <CanvasNavigation onAddPage={handleAddPage} />
      <ConfirmDialog
        isOpen={isExitDialogOpen}
        onClose={() => setIsExitDialogOpen(false)}
        onConfirm={handleConfirmExit}
        title="Exit Canvas"
        description="Are you sure you want to exit this canvas? Any unsaved changes will be lost."
      />
    </div>
  )
}

