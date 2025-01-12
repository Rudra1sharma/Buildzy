"use client"

import * as React from "react"
import { Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [togge, setTogge] = React.useState(theme === "dark")
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
    setTogge(togge ? false : true)
  }
React.useEffect(()=>{
    setTogge(theme === "dark")
})
  return (
    <div className="flex items-center space-x-2">
      <span className="scale-0">{theme}</span>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-primary dark:rotate-90 dark:scale-0" />
      <Switch
        checked={togge}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
      <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all text-primary dark:rotate-0 dark:scale-100" />
    </div>
  )
}

