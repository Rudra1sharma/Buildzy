'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { ThemeToggle } from "../dashboard/themeToggle"
import { signIn } from "next-auth/react"

export default function LoginPage() {
    const { login, user } = useAuth();
    const [isView, setIsView] = useState(false)
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [formdata, setFormdata] = useState({
        email: "",
        password: ""
    })

    const handleRedirect = () => {
        router.push('/dashboard')
    }

    const handleGithub = async(e: any)=>{
        e.preventDefault();
        const res = await signIn("github", {
            callbackUrl: "/dashboard",
            authType: "reauthenticate",
            redirect: true
          })
        console.log(res)
    }
    const handlesubmit = async (e: any) => {
        e.preventDefault();
        const res  = await signIn("github")
        console.log(res)
        // const res = await signIn("Credentials", {
        //     ...formdata,
        //   });
        //   console.log(res);
        //   if (res?.ok) router.push("/dashboard");
        //   else alert("Invalid credentials");
    }

    const handleChange = (e: any) => {
        const { id, value } = e.target
        setFormdata((prev) => (
            { ...prev, [id]: value }))
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
            <ThemeToggle />
            <Card className="w-[350px] shadow-lg rounded-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your Github or PaintApp account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                        <Button onClick={handleGithub} variant="outline" className="w-full flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                            </svg>
                            Login with Github
                        </Button>
                    <form onSubmit={handlesubmit} className="space-y-4">
                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                            <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" value={formdata.email} onChange={handleChange} required />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input id="password" type={isView ? "text" : "password"} placeholder="*******" value={formdata.password} onChange={handleChange} required />
                                {isView ? (
                                    <Eye className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500" onClick={() => setIsView(!isView)} />
                                ) : (
                                    <EyeOff className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500" onClick={() => setIsView(!isView)} />
                                )}
                            </div>
                        </div>
                        <CardFooter className="flex flex-col gap-3">
                            <Button className="w-full" type="submit" disabled={loading}>{loading ? "Logging..." : "Log In Your Account"}</Button>
                            <p className="text-center text-sm text-muted-foreground">
                                Don't have an account?{' '}
                                <Link href="/signup" className="text-primary underline">Sign up</Link>
                            </p>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}