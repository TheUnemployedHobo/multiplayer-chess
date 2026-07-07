import { Gamepad2Icon, SearchIcon } from "lucide-react"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { socket } from "@/lib/socket"

export default function DashboardMultiplayer() {
  const [onlineCount, setOnlineCount] = useState(0)

  useEffect(() => {
    socket.on("users:online-count", setOnlineCount)

    return () => {
      socket.on("users:online-count", setOnlineCount)
    }
  }, [])

  return (
    <Card>
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
          <dt className="text-2xl font-semibold">{onlineCount} online</dt>
          <dd className="text-muted-foreground">Players available</dd>
        </dl>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg">
          <SearchIcon />
          <span>Find a match</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
