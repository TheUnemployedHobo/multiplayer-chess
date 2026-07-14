import type { Square } from "chess.js"

import { Chessboard, type MovabilityInput, type MoveOutput } from "@mirasen/react-chessboard"
import { toBoardMoveDestinations, toGameMove } from "@mirasen/react-chessboard/adapters/chessjs"

import useChessStore from "@/hooks/use-chess-store"

export default function PlayBoardPlank() {
  const chess = useChessStore((state) => state.chess)
  const position = useChessStore((state) => state.position)
  const move = useChessStore((state) => state.move)

  const movability: MovabilityInput = {
    destinations: (source) => toBoardMoveDestinations(chess.moves({ square: source, verbose: true })),
    mode: "strict",
  }

  const onUIMove = (uiMove: MoveOutput) => {
    const gameMove = toGameMove(uiMove)
    move(gameMove.from as Square, gameMove.to as Square)
  }

  return (
    <Chessboard
      className="aspect-square overflow-hidden rounded-2xl"
      movability={movability}
      onUIMove={onUIMove}
      position={position}
    />
  )
}
