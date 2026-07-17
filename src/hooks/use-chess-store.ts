import type { ColorInput } from "@mirasen/react-chessboard"
import type { StoreApi } from "zustand"

import { Chess, type Color } from "chess.js"
import { create } from "zustand/react"

type StoreType = {
  botDifficulty: string
  chess: Chess
  forceMove: (from: string, to: string, promotion?: string) => void
  gameMode: "bot" | "multiplayer" | null
  history: string[]
  isPlaying: boolean
  orientation: ColorInput
  position: { id: number; position: string }
  reset: () => void
  result: "checkmate" | "fifty-move" | "insufficient-material" | "stalemate" | "threefold-repetition" | null
  setBotDifficulty: (botDifficulty: string) => void
  setGameMode: (mode: "bot" | "multiplayer" | null) => void
  setIsPlaying: (isPlaying: boolean) => void
  setOrientation: (color: ColorInput) => void
  tryMove: (from: string, to: string, promotion?: string) => boolean
  turn: Color
}

const sync = (set: StoreApi<StoreType>["setState"]) => {
  let result: StoreType["result"] = null

  if (chess.isCheckmate()) result = "checkmate"
  else if (chess.isStalemate()) result = "stalemate"
  else if (chess.isInsufficientMaterial()) result = "insufficient-material"
  else if (chess.isThreefoldRepetition()) result = "threefold-repetition"
  else if (chess.isDrawByFiftyMoves()) result = "fifty-move"

  set((state) => ({
    history: chess.history(),
    position: {
      id: state.position.id + 1,
      position: chess.fen(),
    },
    result,
    turn: chess.turn(),
  }))
}

const chess = new Chess()

const useChessStore = create<StoreType>()((set, get) => ({
  botDifficulty: "",
  chess,
  forceMove: (from, to, promotion) => {
    chess.move({ from, promotion, to })
    sync(set)
  },
  gameMode: null,
  history: chess.history(),
  isPlaying: false,
  orientation: "white",
  position: { id: 0, position: chess.fen() },
  reset: () => {
    const { setGameMode, setIsPlaying, setOrientation } = get()
    chess.reset()
    sync(set)
    setOrientation("white")
    setGameMode(null)
    setIsPlaying(false)
  },
  result: null,
  setBotDifficulty: (botDifficulty) => set({ botDifficulty }),
  setGameMode: (gameMode) => set({ gameMode }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setOrientation: (orientation) => set({ orientation }),
  tryMove: (from, to, promotion) => {
    if (!chess.move({ from, promotion, to })) return false
    sync(set)
    return true
  },
  turn: chess.turn(),
}))

export default useChessStore
