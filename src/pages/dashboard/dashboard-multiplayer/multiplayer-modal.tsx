import { CircleXIcon } from "lucide-react"
import { combine } from "zustand/middleware"
import { create } from "zustand/react"

import { ShadcnModal } from "@/components/shadcn-dialogs"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useMatchLeave } from "@/lib/socket/use-match-events"

// eslint-disable-next-line react-refresh/only-export-components
export const useMultiplayerModalStore = create(
  combine({ isOpen: false }, (set) => ({
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
  })),
)

export default function MultiplayerModal() {
  const isOpen = useMultiplayerModalStore((state) => state.isOpen)
  const setIsOpen = useMultiplayerModalStore((state) => state.setIsOpen)

  const leaveMatchmaking = useMatchLeave(() => setIsOpen(false))

  return (
    <ShadcnModal
      content={
        <section className="flex flex-col items-center gap-y-3">
          <div className="bg-secondary rounded-full border p-3">
            <Spinner className="text-muted-foreground size-8" />
          </div>
          <h2 className="text-2xl font-semibold">Finding an opponent...</h2>
          <p className="text-muted-foreground text-center">
            We're searching for the best available opponent to give you a fair and challenging match. This may take a
            few moments.
          </p>
          <Button className="w-full" onClick={leaveMatchmaking} size="lg" variant="destructive">
            <CircleXIcon />
            <span>Leave the matchmaking</span>
          </Button>
        </section>
      }
      isOpen={isOpen}
      onClose={leaveMatchmaking}
    />
  )
}
