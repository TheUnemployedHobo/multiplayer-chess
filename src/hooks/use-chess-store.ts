import { Chess } from "chess.js"
import { create } from "zustand/react"

type StoreType = {
  chess: Chess
  position: { id: number; position: string }
}

const useChessStore = create<StoreType>()(() => ({}))

export default useChessStore
