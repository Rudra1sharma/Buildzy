import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'

export default function HelloUser() {
  const {user} = useAuth();
  console.log(user)
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          {`Hi, ${user?.username}`}
        </CardTitle>
        <CardDescription>Welcome back, {user?.name}</CardDescription>
      </CardHeader>
    </Card>
  )
}

