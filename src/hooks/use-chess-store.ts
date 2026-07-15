import type { ColorInput } from "@mirasen/react-chessboard"

import { Chess, type PieceSymbol, type Square } from "chess.js"
import { create } from "zustand/react"

type StoreType = {
  chess: Chess
  history: string[]
  isPlaying: boolean
  move: (from: Square, to: Square, promotion?: PieceSymbol) => boolean
  orientation: ColorInput
  position: { id: number; position: string }
  reset: () => void
  result: "checkmate" | "fifty-move" | "insufficient-material" | "stalemate" | "threefold-repetition" | null
  setOrientation: (color: ColorInput) => void
  setPlaying: (playing: boolean) => void
  turn: "black" | "white"
}

const chess = new Chess()

const useChessStore = create<StoreType>()((set) => ({
  chess,
  history: [],
  isPlaying: false,
  move: (from, to, promotion) => {
    const isMoveLegal = chess.move({ from, promotion, to })

    if (!isMoveLegal) return false

    let result: StoreType["result"] = null

    if (chess.isCheckmate()) result = "checkmate"
    else if (chess.isStalemate()) result = "stalemate"
    else if (chess.isInsufficientMaterial()) result = "insufficient-material"
    else if (chess.isThreefoldRepetition()) result = "threefold-repetition"
    else if (chess.isDrawByFiftyMoves()) result = "fifty-move"

    set((state) => ({
      history: chess.history({ verbose: false }),
      position: { id: state.position.id + 1, position: chess.fen() },
      result,
      turn: chess.turn() === "w" ? "white" : "black",
    }))

    return true
  },
  orientation: "white",
  position: { id: 0, position: chess.fen() },
  reset: () => {
    chess.reset()
    set((state) => ({
      history: [],
      isPlaying: false,
      position: { id: state.position.id + 1, position: chess.fen() },
      result: null,
      turn: "white",
    }))
  },
  result: null,
  setOrientation: (orientation) => set({ orientation }),
  setPlaying: (playing: boolean) => set({ isPlaying: playing }),
  turn: "white",
}))

export default useChessStore
