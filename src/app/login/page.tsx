
import { ThemeToggle } from "@/components/dashboard/themeToggle"
import LoginPage from "@/components/login/loginCard"
import { Paintbrush } from "lucide-react"
import { Metadata } from "next"



export const metadata: Metadata = {
    title: 'Login | Real-Time Paint App',
    description: 'Manage your projects and view recent activities in our real-time paint application.'
}

export default function page(){
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <ThemeToggle/>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Paintbrush className="h-6 w-6" />
          </div>
          PaintApp Inc.
        </a>
      <LoginPage/>
      </div>
    </div>
    )
}