"use client"
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'
import { useSession } from 'next-auth/react'

export default function HelloUser() {
  const {data : session} = useSession();
  console.log(session)
  const user = session?.user
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          {`Hi, ${user?.name}`}
        </CardTitle>
        <CardDescription>Welcome back, {user?.name}</CardDescription>
      </CardHeader>
    </Card>
  )
}

