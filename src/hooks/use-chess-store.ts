import type { CSSProperties } from "react"

import { Chess, type Square } from "chess.js"
import { create } from "zustand/react"

import { getCheckStyle } from "@/lib/utils"

const chess = new Chess()

export type ChessStoreType = {
  clearSelection: () => void
  getFen: () => string
  getLegalMoves: (square: Square) => Square[]
  makeMove: (from: Square, to: Square) => boolean
  position: string
  reset: () => void
  selectedSquare: null | Square
  selectSquare: (square: Square) => void
  squareStyles: Record<string, CSSProperties>
}

const useChessStore = create<ChessStoreType>()((set) => ({
  clearSelection: () => set({ selectedSquare: null, squareStyles: getCheckStyle(chess) }),
  getFen: () => chess.fen(),
  getLegalMoves: (square) => chess.moves({ square, verbose: true }).map((move) => move.to as Square),
  makeMove: (from, to) => {
    try {
      chess.move({ from, promotion: "q", to })
      set({ position: chess.fen(), selectedSquare: null, squareStyles: getCheckStyle(chess) })

      return true
    } catch {
      return false
    }
  },
  position: chess.fen(),
  reset: () => {
    chess.reset()
    set({ position: chess.fen(), selectedSquare: null, squareStyles: {} })
  },
  selectedSquare: null,
  selectSquare: (square) => {
    const moves = chess.moves({ square, verbose: true })

    const styles: Record<string, CSSProperties> = {}

    moves.forEach(
      ({ to }) =>
        (styles[to] = {
          background: "radial-gradient(circle, rgba(0,0,0,0.2) 16%, transparent 16%)",
          ...(chess.get(to) && { border: "4px solid rgba(255,0,0,0.5)", boxSizing: "border-box" }),
        }),
    )

    styles[square] = { border: "4px solid rgba(0,0,0,0.2)", boxSizing: "border-box" }

    set({ selectedSquare: square, squareStyles: styles })
  },
  squareStyles: {},
}))

export default useChessStore
