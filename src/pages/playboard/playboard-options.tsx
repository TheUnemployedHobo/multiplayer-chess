import { HandshakeIcon, Undo2Icon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useChessStore from "@/hooks/use-chess-store"

import { BackToDashboardButton, ResignButton } from "./playboard-buttons"

export default function PlayBoardOptions() {
  const turn = useChessStore((state) => state.turn)
  const gameMode = useChessStore((state) => state.gameMode)
  const isPlaying = useChessStore((state) => state.isPlaying)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Game</CardTitle>
        <CardAction>
          <Badge>{isPlaying ? <span className="capitalize">{turn} to move</span> : <span>Game over</span>}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex gap-x-3">
        {isPlaying ? (
          <>
            {gameMode === "bot" && (
              <Button className="grow" size="lg" variant="secondary">
                <Undo2Icon />
                <span>Undo</span>
              </Button>
            )}
            {gameMode === "multiplayer" && (
              <Button className="grow" size="lg" variant="secondary">
                <HandshakeIcon />
                <span>Offer draw</span>
              </Button>
            )}
            <ResignButton />
          </>
        ) : (
          <BackToDashboardButton />
        )}
      </CardContent>
    </Card>
  )
}
