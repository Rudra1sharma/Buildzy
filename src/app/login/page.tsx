
import { ThemeToggle } from "@/components/dashboard/themeToggle"
import LoginPage from "@/components/login/loginCard"
import { Paintbrush } from "lucide-react"
import { Metadata } from "next"



export const metadata: Metadata = {
  title: 'Login | Real-Time Paint App',
  description: 'Manage your projects and view recent activities in our real-time paint application.'
}

export default function page() {
  return (
    <LoginPage />
  )
}