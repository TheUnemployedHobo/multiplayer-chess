import type { Square } from "chess.js"

import { Chessboard } from "@mirasen/react-chessboard"
import { toBoardMoveDestinations, toGameMove } from "@mirasen/react-chessboard/adapters/chessjs"

import useChessStore from "@/hooks/use-chess-store"

export default function PlayBoardPlank() {
  const chess = useChessStore((state) => state.chess)
  const position = useChessStore((state) => state.position)
  const move = useChessStore((state) => state.move)

  return (
    <Chessboard
      className="aspect-square overflow-hidden rounded-2xl"
      movability={{
        destinations: (source) => toBoardMoveDestinations(chess.moves({ square: source, verbose: true })),
        mode: "strict",
      }}
      onUIMove={(uiMove) => {
        const gameMove = toGameMove(uiMove)
        move(gameMove.from as Square, gameMove.to as Square)
      }}
      position={position}
    />
  )
}
