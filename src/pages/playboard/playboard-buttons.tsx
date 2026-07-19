import { FlagIcon, LayoutDashboardIcon } from "lucide-react"
import { useLocation } from "wouter"

import { ShadcnAlertDialog } from "@/components/shadcn-dialogs"
import { Button } from "@/components/ui/button"
import useChessStore from "@/hooks/use-chess-store"
import { useBotResign } from "@/lib/socket/event-hooks/use-bot-events"

import { usePlayBoardModalStore } from "./playboard-modal"

export function BackToDashboardButton() {
  const setters = usePlayBoardModalStore((state) => state.setters)
  const reset = useChessStore((state) => state.reset)
  const [, setLocation] = useLocation()

  const handleClick = () => {
    reset()
    setters.setIsOpen(false)
    setLocation("/dashboard")
  }

  return (
    <Button className="w-full" onClick={handleClick} size="lg">
      <LayoutDashboardIcon />
      <span>Back to dashboard</span>
    </Button>
  )
}

export function ResignButton() {
  const gameMode = useChessStore((state) => state.gameMode)
  const setIsPlaying = useChessStore((state) => state.setIsPlaying)
  const setters = usePlayBoardModalStore((state) => state.setters)

  const botResign = useBotResign(() => {
    setIsPlaying(false)
    setters.setIsOpen(true)
    setters.setTitle("Black wins")
    setters.setDescription("You resigned")
  })

  return (
    <ShadcnAlertDialog
      action={{
        onClick: () => {
          if (gameMode === "bot") botResign()
          if (gameMode === "multiplayer") alert("Resigned")
        },
        text: "Resign",
      }}
      description="Are you sure you want to resign and end the current game?"
      title="Confirm Resignation"
      triggerButton={
        <Button className="grow" size="lg" variant="destructive">
          <FlagIcon />
          <span>Resign</span>
        </Button>
      }
    />
  )
}
