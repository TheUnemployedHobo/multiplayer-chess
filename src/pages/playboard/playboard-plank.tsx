import { Chessboard } from "@mirasen/react-chessboard"
import { toBoardMoveDestinations, toGameMove } from "@mirasen/react-chessboard/adapters/chessjs"

import { Card } from "@/components/ui/card"
import useChessStore from "@/hooks/use-chess-store"
import { useBotMove } from "@/lib/socket/event-hooks/use-bot-events"

export default function PlayBoardPlank() {
  const chess = useChessStore((state) => state.chess)
  const position = useChessStore((state) => state.position)
  const tryMove = useChessStore((state) => state.tryMove)
  const forceMove = useChessStore((state) => state.forceMove)

  const moveBotPieces = useBotMove(({ from, to }) => {
    forceMove(from, to)
  })

  return (
    <Card className="size-full justify-center p-3">
      <Chessboard
        className="aspect-square size-full"
        movability={{
          destinations: (source) => toBoardMoveDestinations(chess.moves({ square: source, verbose: true })),
          mode: "strict",
        }}
        onUIMove={(uiMove) => {
          const gameMove = toGameMove(uiMove)
          if (tryMove(gameMove.from, gameMove.to, gameMove.promotion)) {
            moveBotPieces({ from: gameMove.from, promotion: gameMove.promotion, to: gameMove.to })
          }
        }}
        position={position}
      />
    </Card>
  )
}
