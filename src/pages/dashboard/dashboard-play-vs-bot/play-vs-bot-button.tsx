import { PlayIcon } from "lucide-react"
import { useLocation } from "wouter"

import { Button } from "@/components/ui/button"
import useChessStore from "@/hooks/use-chess-store"
import { useBotGameStart } from "@/lib/socket/use-bot-events"

type PropsType = { difficulty: { label: string; skill: number } }

export default function DashboardPlayVsBotButton({ difficulty: { label, skill } }: PropsType) {
  const setGameMode = useChessStore((state) => state.setGameMode)
  const setBotDifficulty = useChessStore((state) => state.setBotDifficulty)
  const setIsPlaying = useChessStore((state) => state.setIsPlaying)
  const [, setLocation] = useLocation()

  const startBotGame = useBotGameStart(() => {
    setIsPlaying(true)
    setGameMode("bot")
    setBotDifficulty(label)
    setLocation("/playboard")
  })

  return (
    <Button className="w-full" onClick={() => startBotGame(skill)} size="lg">
      <PlayIcon />
      <span>Start bot game</span>
    </Button>
  )
}
