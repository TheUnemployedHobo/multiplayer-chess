import type { ColorInput } from "@mirasen/react-chessboard"
import type { StoreApi } from "zustand"

import { Chess, type Color } from "chess.js"
import { create } from "zustand/react"

export type OpponentInfoType = { avatar: string; color: "black" | "white"; elo: number; username: string }

type StoreType = {
  botDifficulty: string
  chess: Chess
  forceMove: (from: string, to: string, promotion?: string) => void
  gameMode: "bot" | "multiplayer" | null
  history: string[]
  isPlaying: boolean
  opponentInfo: null | OpponentInfoType
  orientation: ColorInput
  position: { id: number; position: string }
  reset: () => void
  setBotDifficulty: (botDifficulty: string) => void
  setGameMode: (mode: "bot" | "multiplayer" | null) => void
  setIsPlaying: (isPlaying: boolean) => void
  setOpponentInfo: (opponentInfo: null | OpponentInfoType) => void
  setOrientation: (color: ColorInput) => void
  tryMove: (from: string, to: string, promotion?: string) => boolean
  turn: Color
  undo: () => void
}

const sync = (set: StoreApi<StoreType>["setState"]) =>
  set((state) => ({
    history: chess.history(),
    position: { id: state.position.id + 1, position: chess.fen() },
    turn: chess.turn(),
  }))

const chess = new Chess()

const useChessStore = create<StoreType>()((set, get) => ({
  botDifficulty: "",
  chess,
  forceMove: (from, to, promotion = "q") => {
    chess.move({ from, promotion, to })
    sync(set)
  },
  gameMode: null,
  history: chess.history(),
  isPlaying: false,
  opponentInfo: null,
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
  setBotDifficulty: (botDifficulty) => set({ botDifficulty }),
  setGameMode: (gameMode) => set({ gameMode }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setOpponentInfo: (opponentInfo) => set({ opponentInfo }),
  setOrientation: (orientation) => set({ orientation }),
  tryMove: (from, to, promotion = "q") => {
    if (!chess.move({ from, promotion, to })) return false
    sync(set)
    return true
  },
  turn: chess.turn(),
  undo: () => {
    chess.undo()
    chess.undo()
    sync(set)
  },
}))

export default useChessStore
