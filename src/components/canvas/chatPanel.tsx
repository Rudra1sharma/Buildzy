"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"

const initialMessages = [
  { id: 1, user: "Alice", text: "Hey everyone, how's the project going?" },
  { id: 2, user: "Bob", text: "It's coming along nicely! I just finished the header section." },
  { id: 3, user: "Charlie", text: "Great job, Bob! I'm working on the main content area now." },
  { id: 4, user: "Diana", text: "I'll start on the footer once Charlie is done." },
  { id: 5, user: "Alice", text: "Sounds good! Let me know if anyone needs help." },
]

export function ChatPanel() {
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { id: messages.length + 1, user: "You", text: inputValue }])
      setInputValue("")
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [scrollAreaRef.current]) //Corrected dependency

  return (
    <div className="flex flex-col h-full">
      <h2 className="font-semibold p-4">Chat</h2>
      <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.user === "You" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] rounded-lg p-2 ${message.user === "You" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                <p className="font-semibold text-xs">{message.user}</p>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

