import { CheckIcon, FlagIcon, HandshakeIcon, LayoutDashboardIcon, Undo2Icon, XIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { mutate } from "swr"
import { useLocation } from "wouter"

import { ShadcnAlertDialog } from "@/components/shadcn-dialogs"
import { Button } from "@/components/ui/button"
import useAuthStore from "@/hooks/use-auth-store"
import useChessStore from "@/hooks/use-chess-store"
import { resignBotGame, useBotGameUndo } from "@/lib/socket/use-bot-events"
import {
  acceptDrawOffer,
  resignMpGame,
  useMpGameDrawOffer,
  useMpGameDrawOfferDecline,
} from "@/lib/socket/use-game-events"

import { usePlayBoardModalStore } from "./playboard-modal"

export function BackToDashboardButton() {
  const hydrate = useAuthStore((state) => state.hydrate)
  const setters = usePlayBoardModalStore((state) => state.setters)
  const reset = useChessStore((state) => state.reset)
  const [, setLocation] = useLocation()

  const handleClick = () => {
    reset()
    hydrate()
    mutate("matches")
    setters.setIsOpen(false)
    setLocation("/dashboard", { replace: true })
  }

  return (
    <Button className="w-full" onClick={handleClick} size="lg">
      <LayoutDashboardIcon />
      <span>Back to dashboard</span>
    </Button>
  )
}

export function DrawOfferButton() {
  const [isDisabled, setIsDisabled] = useState(false)

  const declineDrawOffer = useMpGameDrawOfferDecline((message) => {
    toast.info(message)
    setIsDisabled(false)
  })

  const sendDrawOffer = useMpGameDrawOffer(({ message, role }) => {
    setIsDisabled(true)

    if (role === "offeror") toast.info(message)
    else if (role === "offeree") {
      const id = toast(message, {
        action: (
          <Button
            onClick={() => {
              acceptDrawOffer()
              toast.dismiss(id)
            }}
            size="icon-lg"
            variant="default"
          >
            <CheckIcon />
          </Button>
        ),
        cancel: (
          <Button
            className="ml-auto"
            onClick={() => {
              declineDrawOffer()
              toast.dismiss(id)
            }}
            size="icon-lg"
            variant="destructive"
          >
            <XIcon />
          </Button>
        ),
        duration: Infinity,
      })
    }
  })

  return (
    <Button className="grow" disabled={isDisabled} onClick={sendDrawOffer} size="lg" variant="secondary">
      <HandshakeIcon />
      <span>Offer draw</span>
    </Button>
  )
}

export function ResignButton() {
  const gameMode = useChessStore((state) => state.gameMode)

  return (
    <ShadcnAlertDialog
      action={{
        onClick: () => {
          if (gameMode === "bot") resignBotGame()
          if (gameMode === "multiplayer") resignMpGame()
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

export function UndoButton() {
  const undo = useChessStore((state) => state.undo)
  const undoMove = useBotGameUndo(() => undo())

  return (
    <Button className="grow" onClick={undoMove} size="lg" variant="secondary">
      <Undo2Icon />
      <span>Undo</span>
    </Button>
  )
}
