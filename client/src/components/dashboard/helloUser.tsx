import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HelloUser() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          Hi, UserId
        </CardTitle>
        <CardDescription>Welcome back, UserName</CardDescription>
      </CardHeader>
    </Card>
  )
}

