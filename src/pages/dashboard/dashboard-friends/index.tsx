import { UsersRoundIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

import FriendsAddButton from "./friends-add-button"
import FriendsListPanel from "./friends-list-panel"

export default function DashboardFriends() {
  return (
    <Card className="h-96 max-h-226.5 shrink-0 lg:h-full lg:w-96">
      <CardHeader>
        <CardTitle>
          <Badge className="size-8 rounded-full p-0" variant="secondary">
            <UsersRoundIcon />
          </Badge>
          <span className="ml-2">Friends</span>
        </CardTitle>
        <CardDescription>Play with friends online</CardDescription>
        <CardAction>
          <FriendsAddButton />
        </CardAction>
      </CardHeader>
      <CardContent className="min-h-0 flex-1">
        <ScrollArea className="h-full">
          <FriendsListPanel />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
