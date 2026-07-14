import { ClockPlusIcon, FlagIcon, HandshakeIcon, RotateCwSquareIcon, Undo2Icon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PlayBoardOptions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Game</CardTitle>
        <CardAction>
          <Badge>White to move</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-x-3">
          <Button className="grow" size="lg" variant="destructive">
            <FlagIcon />
            <span>Resign</span>
          </Button>
          <Button className="grow" size="lg" variant="secondary">
            <HandshakeIcon />
            <span>Offer draw</span>
          </Button>
        </div>
        <Separator />
        <div className="flex gap-x-3">
          <Button className="grow" size="lg" variant="outline">
            <Undo2Icon />
          </Button>
          <Button className="grow" size="lg" variant="outline">
            <RotateCwSquareIcon />
          </Button>
          <Button className="grow" size="lg" variant="outline">
            <ClockPlusIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
