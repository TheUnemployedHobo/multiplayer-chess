import { FlagIcon, HandshakeIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PlayBoardOptions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Game</CardTitle>
        <CardAction>
          <Badge>White to move</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex gap-x-3">
        <Button className="grow" size="lg" variant="destructive">
          <FlagIcon />
          <span>Resign</span>
        </Button>
        <Button className="grow" size="lg" variant="secondary">
          <HandshakeIcon />
          <span>Offer draw</span>
        </Button>
      </CardContent>
    </Card>
  )
}
