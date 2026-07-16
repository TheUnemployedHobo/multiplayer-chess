import { PlayIcon } from "lucide-react"
import { useState } from "react"
import { useLocation } from "wouter"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import useChessStore from "@/hooks/use-chess-store"
import { useBotStart } from "@/lib/socket/event-hooks/use-bot-events"

type PropsType = { difficulty: { label: string; skill: number } }

export default function DashboardPlayVsBotButton({ difficulty: { label, skill } }: PropsType) {
  const [isPending, setIsPending] = useState(false)
  const setGameMode = useChessStore((state) => state.setGameMode)
  const setBotDifficulty = useChessStore((state) => state.setBotDifficulty)
  const reset = useChessStore((state) => state.reset)
  const [, setLocation] = useLocation()

  const startBotGame = useBotStart(() => {
    reset()
    setGameMode("bot")
    setBotDifficulty(label)
    setLocation("/playboard")
    setIsPending(false)
  })

  return (
    <Button
      className="w-full"
      disabled={isPending}
      onClick={() => {
        setIsPending(true)
        startBotGame(skill)
      }}
      size="lg"
    >
      {isPending ? <Spinner /> : <PlayIcon />}
      <span>Start the game</span>
    </Button>
  )
}
