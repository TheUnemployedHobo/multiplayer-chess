import { Chessboard } from "@mirasen/react-chessboard"
import { toBoardMoveDestinations, toGameMove } from "@mirasen/react-chessboard/adapters/chessjs"

import { Card } from "@/components/ui/card"
import useChessStore from "@/hooks/use-chess-store"
import { useBotMove } from "@/lib/socket/event-hooks/use-bot-events"
import { useGameMove } from "@/lib/socket/event-hooks/use-game-events"

export default function PlayBoardPlank() {
  const chess = useChessStore((state) => state.chess)
  const position = useChessStore((state) => state.position)
  const orientation = useChessStore((state) => state.orientation)
  const gameMode = useChessStore((state) => state.gameMode)
  const isPlaying = useChessStore((state) => state.isPlaying)
  const tryMove = useChessStore((state) => state.tryMove)
  const forceMove = useChessStore((state) => state.forceMove)

  const sendBotMove = useBotMove(({ from, to }) => forceMove(from, to))
  const sendOpponentMove = useGameMove(({ from, promotion, to }) => forceMove(from, to, promotion))

  return (
    <Card className="size-full justify-center p-3">
      <Chessboard
        className="aspect-square size-full"
        movability={{
          destinations: (source) => {
            if (!isPlaying) return []

            const piece = chess.get(source)
            if (!piece) return []

            const playerColor = orientation === "white" ? "w" : "b"

            if (piece.color !== playerColor) return []
            if (piece.color !== chess.turn()) return []

            return toBoardMoveDestinations(chess.moves({ square: source, verbose: true }))
          },
          mode: "strict",
        }}
        onUIMove={(uiMove) => {
          const gameMove = toGameMove(uiMove)
          if (tryMove(gameMove.from, gameMove.to, gameMove.promotion)) {
            if (gameMode === "bot") sendBotMove({ from: gameMove.from, promotion: gameMove.promotion, to: gameMove.to })
            if (gameMode === "multiplayer")
              sendOpponentMove({ from: gameMove.from, promotion: gameMove.promotion, to: gameMove.to })
          }
        }}
        orientation={orientation}
        position={position}
      />
    </Card>
  )
}
