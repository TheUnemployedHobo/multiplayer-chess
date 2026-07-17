import { TrophyIcon } from "lucide-react"
import { combine } from "zustand/middleware"
import { create } from "zustand/react"

import { ShadcnModal } from "@/components/shadcn-dialogs"
import useChessStore from "@/hooks/use-chess-store"

import { BackToDashboardButton } from "./playboard-buttons"

const usePlayBoardModalStore = create(
  combine({ isOpen: false }, (set) => ({
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
  })),
)

export const usePlayBoardModalSetIsOpen = () => usePlayBoardModalStore((state) => state.setIsOpen)

export default function PlayBoardModal() {
  const isOpen = usePlayBoardModalStore((state) => state.isOpen)
  const setIsOpen = usePlayBoardModalStore((state) => state.setIsOpen)
  const turn = useChessStore((state) => state.turn)
  const result = useChessStore((state) => state.result)

  return (
    <ShadcnModal
      content={
        <section className="flex flex-col items-center gap-y-3">
          <div className="bg-secondary rounded-full border p-3">
            <TrophyIcon />
          </div>
          <h2 className="text-2xl font-semibold">{turn === "w" ? "Black" : "White"} wins</h2>
          <p className="text-muted-foreground capitalize">{result ? result : "Resignation"}</p>
          <BackToDashboardButton />
        </section>
      }
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  )
}
