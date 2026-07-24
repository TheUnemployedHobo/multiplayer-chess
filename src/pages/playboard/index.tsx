import { UserItem } from "@/components/user-item"
import useAuthStore from "@/hooks/use-auth-store"
import useChessStore from "@/hooks/use-chess-store"
import { useOnBotGameFinish } from "@/lib/socket/use-bot-events"
import { useOnMpGameFinish } from "@/lib/socket/use-game-events"

import PlayBoardChat from "./playboard-chat"
import PlayBoardModal, { usePlayBoardModalStore } from "./playboard-modal"
import PlayBoardNotation from "./playboard-notation"
import PlayBoardOptions from "./playboard-options"
import PlayBoardPlank from "./playboard-plank"

export default function PlayBoardPage() {
  const user = useAuthStore((s) => s.user)!
  const gameMode = useChessStore((s) => s.gameMode)
  const botDifficulty = useChessStore((s) => s.botDifficulty)
  const setIsPlaying = useChessStore((s) => s.setIsPlaying)
  const opponent = useChessStore((s) => s.opponentInfo)!
  const setters = usePlayBoardModalStore((s) => s.setters)

  const handleGameFinish = (result: string, winner: "black" | "white" | null) => {
    setIsPlaying(false)
    setters.setTitle(winner ? `${winner} wins` : "Draw")
    setters.setDescription(result)
    setters.setIsOpen(true)
  }

  useOnBotGameFinish(({ result, winner }) => handleGameFinish(result, winner))
  useOnMpGameFinish(({ result, winner }) => handleGameFinish(result, winner))

  return (
    <section className="container mx-auto flex min-h-dvh flex-col gap-3 p-3 md:h-dvh md:flex-row">
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        {gameMode === "multiplayer" && (
          <UserItem
            avatar={opponent.avatar}
            description={`ELO: ${opponent.elo}`}
            title={opponent.username}
            variant="muted"
          />
        )}
        {gameMode === "bot" && <UserItem avatar="bot" description={botDifficulty} title="Engine" variant="muted" />}
        <PlayBoardPlank />
        <UserItem avatar={user.avatar} description={`ELO: ${user.stats.elo}`} title={user.username} variant="muted" />
      </div>
      <div className="flex min-h-0 flex-col gap-y-3 md:w-75">
        <PlayBoardOptions />
        <PlayBoardNotation />
        {gameMode === "multiplayer" && <PlayBoardChat />}
      </div>
      <PlayBoardModal />
    </section>
  )
}
