import { Gamepad2Icon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useOnlineUsers } from "@/lib/socket/event-hooks/use-user-events"

import MultiplayerModal from "./multiplayer-modal"
import MultiplayerPlayButton from "./multiplayer-play-button"

export default function DashboardMultiplayer() {
  const onlineUsersCount = useOnlineUsers()

  return (
    <>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>
            <Badge className="size-8 rounded-full p-0" variant="secondary">
              <Gamepad2Icon />
            </Badge>
            <span className="ml-2">Multiplayer</span>
          </CardTitle>
          <CardDescription>Play with others online</CardDescription>
        </CardHeader>
        <CardContent>
          <dl>
            <dt className="text-2xl font-semibold">{onlineUsersCount} online</dt>
            <dd className="text-muted-foreground">Players available</dd>
          </dl>
        </CardContent>
        <CardFooter>
          <MultiplayerPlayButton />
        </CardFooter>
      </Card>
      <MultiplayerModal />
    </>
  )
}
