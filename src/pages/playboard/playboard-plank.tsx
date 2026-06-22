import type { Square } from "chess.js"

import { Chessboard, type PieceDropHandlerArgs, type SquareHandlerArgs } from "react-chessboard"

import useChessStore from "@/hooks/use-chess-store"

function PlayBoardPlank() {
  const position = useChessStore((s) => s.position)
  const squareStyles = useChessStore((s) => s.squareStyles)
  const selectedSquare = useChessStore((s) => s.selectedSquare)
  const makeMove = useChessStore((s) => s.makeMove)
  const selectSquare = useChessStore((s) => s.selectSquare)
  const clearSelection = useChessStore((s) => s.clearSelection)
  const getLegalMoves = useChessStore((s) => s.getLegalMoves)

  const onPieceDrop = ({ sourceSquare, targetSquare }: PieceDropHandlerArgs) => {
    if (!targetSquare) return false
    return makeMove(sourceSquare as Square, targetSquare as Square)
  }

  const onSquareClick = ({ piece, square }: SquareHandlerArgs) => {
    const clickedSquare = square as Square

    if (!selectedSquare) {
      if (piece) selectSquare(clickedSquare)
      return
    }

    if (getLegalMoves(selectedSquare).includes(clickedSquare)) makeMove(selectedSquare, clickedSquare)
    else {
      if (piece) selectSquare(clickedSquare)
      else clearSelection()
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl">
      <Chessboard options={{ onPieceDrop, onSquareClick, position, squareStyles }} />
    </div>
  )
}

export default PlayBoardPlank
