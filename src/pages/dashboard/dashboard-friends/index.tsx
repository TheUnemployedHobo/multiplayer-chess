import { UsersRoundIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import DashboardAddFriend from "./dashboard-add-friend"
import DashboardFriendsList from "./dashboard-friends-list"

export default function DashboardFriends() {
  return (
    <Card className="md:col-start-3 md:row-span-3 md:row-start-2">
      <CardHeader>
        <CardTitle>
          <Badge className="size-8 rounded-full p-0" variant="secondary">
            <UsersRoundIcon />
          </Badge>
          <span className="ml-2">Friends</span>
        </CardTitle>
        <CardDescription>Play with friends online</CardDescription>
        <CardAction>
          <Badge>4 online</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <DashboardAddFriend />
        <DashboardFriendsList />
      </CardContent>
    </Card>
  )
}
