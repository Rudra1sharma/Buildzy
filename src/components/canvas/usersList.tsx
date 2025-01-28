import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

const users = [
  { id: 1, name: "Alice Johnson", avatar: "/placeholder-avatar.jpg", status: "active" },
  { id: 2, name: "Bob Smith", avatar: "/placeholder-avatar.jpg", status: "active" },
  { id: 3, name: "Charlie Brown", avatar: "/placeholder-avatar.jpg", status: "idle" },
  { id: 4, name: "Diana Prince", avatar: "/placeholder-avatar.jpg", status: "active" },
  { id: 5, name: "Ethan Hunt", avatar: "/placeholder-avatar.jpg", status: "idle" },
]

export function UsersList() {
  return (
    <div className="p-4 border-b">
      <h2 className="font-semibold mb-2">Active Users</h2>
      <ScrollArea className="h-28">
        <div className="space-y-2">
          {users.map((user) => (
            <div key={user.id} className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-sm truncate">{user.name}</span>
              <span
                className={`ml-auto inline-block w-2 h-2 rounded-full ${user.status === "active" ? "bg-green-500" : "bg-yellow-500"}`}
              ></span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

