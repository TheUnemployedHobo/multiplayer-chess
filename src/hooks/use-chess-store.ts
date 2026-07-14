import { Chess, type Move, type Square } from "chess.js"
import { create } from "zustand/react"

type StoreType = {
  chess: Chess
  history: Move[]
  move: (from: Square, to: Square) => boolean
  position: { id: number; position: string }
  reset: () => void
}

const chess = new Chess()

const useChessStore = create<StoreType>()((set) => ({
  chess,
  history: [],
  move: (from, to) => {
    const result = chess.move({ from, to })

    if (!result) return false

    set((state) => ({
      history: [...state.history, result],
      position: {
        id: state.position.id + 1,
        position: chess.fen(),
      },
    }))

    return true
  },
  position: { id: 0, position: chess.fen() },
  reset: () => {
    chess.reset()
    set((state) => ({
      history: [],
      position: {
        id: state.position.id + 1,
        position: chess.fen(),
      },
    }))
  },
}))

export default useChessStore
