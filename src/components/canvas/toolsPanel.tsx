import { Paintbrush, Eraser, Square, Circle, Type, Image } from "lucide-react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AnimatedToolButton } from "./animatedToolButton"

const tools = [
  { icon: Paintbrush, name: "Brush" },
  { icon: Eraser, name: "Eraser" },
  { icon: Square, name: "Rectangle" },
  { icon: Circle, name: "Circle" },
  { icon: Type, name: "Text" },
  { icon: Image, name: "Image" },
]

export function ToolsPanel() {
  return (
    <TooltipProvider>
      <div className="w-20 bg-muted/30 border-r p-2 flex flex-col items-center space-y-4">
        {tools.map((tool, index) => (
          <AnimatedToolButton key={index} icon={tool.icon} name={tool.name} />
        ))}
      </div>
    </TooltipProvider>
  )
}

