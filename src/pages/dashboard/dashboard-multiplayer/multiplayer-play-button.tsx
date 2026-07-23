import { SearchIcon } from "lucide-react"
import { useLocation } from "wouter"

import { Button } from "@/components/ui/button"
import useChessStore from "@/hooks/use-chess-store"
import { useMatchJoin } from "@/lib/socket/use-match-events"

import { useMultiplayerModalStore } from "./multiplayer-modal"

export default function MultiplayerPlayButton() {
  const setIsOpen = useMultiplayerModalStore((state) => state.setIsOpen)
  const setGameMode = useChessStore((state) => state.setGameMode)
  const setIsPlaying = useChessStore((state) => state.setIsPlaying)
  const setOpponentInfo = useChessStore((state) => state.setOpponentInfo)
  const setOrientation = useChessStore((state) => state.setOrientation)
  const [, setLocation] = useLocation()

  const startMatchmaking = useMatchJoin((opponentInfo) => {
    setIsOpen(false)
    setIsPlaying(true)
    setGameMode("multiplayer")
    setOpponentInfo(opponentInfo)
    setOrientation(opponentInfo.color)
    setLocation("/playboard")
  })

  return (
    <Button
      className="w-full"
      onClick={() => {
        setIsOpen(true)
        startMatchmaking()
      }}
      size="lg"
    >
      <SearchIcon />
      <span>Find a match</span>
    </Button>
  )
}
