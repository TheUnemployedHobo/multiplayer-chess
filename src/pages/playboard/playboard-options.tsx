import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useChessStore from "@/hooks/use-chess-store"

import { BackToDashboardButton, DrawOfferButton, ResignButton, UndoButton } from "./playboard-buttons"

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
            {gameMode === "bot" && <UndoButton />}
            {gameMode === "multiplayer" && <DrawOfferButton />}
            <ResignButton />
          </>
        ) : (
          <BackToDashboardButton />
        )}
      </CardContent>
    </Card>
  )
}
