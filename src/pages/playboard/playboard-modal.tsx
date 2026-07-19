import { TrophyIcon } from "lucide-react"
import { combine } from "zustand/middleware"
import { create } from "zustand/react"

import { ShadcnModal } from "@/components/shadcn-dialogs"

import { BackToDashboardButton } from "./playboard-buttons"

export const usePlayBoardModalStore = create(
  combine({ description: "", isOpen: false, title: "" }, (set) => ({
    setters: {
      setDescription: (description: string) => set({ description }),
      setIsOpen: (isOpen: boolean) => set({ isOpen }),
      setTitle: (title: string) => set({ title }),
    },
  })),
)

export default function PlayBoardModal() {
  const title = usePlayBoardModalStore((state) => state.title)
  const description = usePlayBoardModalStore((state) => state.description)
  const isOpen = usePlayBoardModalStore((state) => state.isOpen)
  const setters = usePlayBoardModalStore((state) => state.setters)

  return (
    <ShadcnModal
      content={
        <section className="flex flex-col items-center gap-y-3">
          <div className="bg-secondary rounded-full border p-3">
            <TrophyIcon />
          </div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
          <BackToDashboardButton />
        </section>
      }
      isOpen={isOpen}
      onClose={() => setters.setIsOpen(false)}
    />
  )
}
