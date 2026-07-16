import { FlagIcon, HandshakeIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useChessStore from "@/hooks/use-chess-store"

export default function PlayBoardOptions() {
  const turn = useChessStore((state) => state.turn)
  const gameMode = useChessStore((state) => state.gameMode)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Game</CardTitle>
        <CardAction>
          <Badge>
            <span className="capitalize">{turn}</span>
            <span>to move</span>
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex gap-x-3">
        <Button className="grow" size="lg" variant="destructive">
          <FlagIcon />
          <span>Resign</span>
        </Button>
        {gameMode === "multiplayer" && (
          <Button className="grow" size="lg" variant="secondary">
            <HandshakeIcon />
            <span>Offer draw</span>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
