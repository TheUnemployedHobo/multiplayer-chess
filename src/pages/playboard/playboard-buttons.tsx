import { CheckIcon, FlagIcon, HandshakeIcon, LayoutDashboardIcon, Undo2Icon, XIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useLocation } from "wouter"

import { ShadcnAlertDialog } from "@/components/shadcn-dialogs"
import { Button } from "@/components/ui/button"
import useChessStore from "@/hooks/use-chess-store"
import { resignBotSession, useBotSessionUndo } from "@/lib/socket/use-bot-events"
import { useGameDrawOffer, useGameDrawOfferAccept, useGameDrawOfferDecline } from "@/lib/socket/use-game-events"

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

export function DrawOfferButton() {
  const [isDisabled, setIsDisabled] = useState(false)
  const setIsPlaying = useChessStore((state) => state.setIsPlaying)
  const setters = usePlayBoardModalStore((state) => state.setters)

  const acceptDrawOffer = useGameDrawOfferAccept(() => {
    setIsDisabled(false)
    setIsPlaying(false)
    setters.setIsOpen(true)
    setters.setTitle("Draw")
    setters.setDescription("Both players agreed to a draw")
  })

  const declineDrawOffer = useGameDrawOfferDecline((message) => {
    toast.info(message)
    setIsDisabled(false)
  })

  const sendDrawOffer = useGameDrawOffer(({ message, offerRole }) => {
    setIsDisabled(true)

    if (offerRole === "offeror") toast.info(message)
    else if (offerRole === "offeree") {
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
          <Button className="ml-auto" onClick={declineDrawOffer} size="icon-lg" variant="destructive">
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

  // const botResign = useBotResign(({ result, winner }) => handleResign(result, winner!))
  // const gameResign = useGameResign(({ result, winner }) => handleResign(result, winner!))

  return (
    <ShadcnAlertDialog
      action={{
        onClick: () => {
          if (gameMode === "bot") resignBotSession()
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

export function UndoButton() {
  const undo = useChessStore((state) => state.undo)

  const undoMove = useBotSessionUndo(() => undo())

  return (
    <Button className="grow" onClick={undoMove} size="lg" variant="secondary">
      <Undo2Icon />
      <span>Undo</span>
    </Button>
  )
}
