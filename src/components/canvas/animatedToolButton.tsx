"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface AnimatedToolButtonProps {
  icon: React.ElementType
  name: string
}

export function AnimatedToolButton({ icon: Icon, name }: AnimatedToolButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="icon" className="hover:bg-muted transition-colors">
            <Icon className="h-6 w-6" />
          </Button>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  )
}

