"use client"

import { ThemeToggle } from "@/components/dashboard/themeToggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

import Link from "next/link"
import { useState } from "react"

export default function LoginPage() {
    const [isView, setIsView] = useState(false)

    return (
        <div className="flex items-center justify-center">
            <Card className="w-[350px]">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your Google or PaintApp account
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-4">
                    <Button variant="outline" className="text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                fill="currentColor"
                            />
                        </svg>
                        Login with Google
                    </Button>
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input id="password" type={isView ? "text" : "password"} placeholder=" " />
                            {isView ? (<Eye className="absolute right-4 top-1 z-10 cursor-pointer text-gray-500"
                                onClick={() => {
                                    setIsView(!isView)
                                }} />) : <EyeOff className="absolute right-4 top-1 z-10 cursor-pointer text-gray-500"
                                    onClick={() => setIsView(!isView)} />}
                        </div>

                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button className="w-full">Login</Button>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
