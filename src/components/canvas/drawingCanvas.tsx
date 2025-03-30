"use client"

import { useRef, useEffect } from "react"

export function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext("2d")
      if (context) {
        // Set up canvas
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
        context.fillStyle = "white"
        context.fillRect(0, 0, canvas.width, canvas.height)

        // Add some dummy shapes for visualization
        context.strokeStyle = "blue"
        context.lineWidth = 2
        context.strokeRect(50, 50, 200, 100)

        context.fillStyle = "red"
        context.beginPath()
        context.arc(200, 200, 50, 0, Math.PI * 2)
        context.fill()

        context.font = "20px Arial"
        context.fillStyle = "black"
        context.fillText("Sample Text", 100, 300)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full border border-muted-foreground/20 shadow-md" />
}

