import { UserItem } from "@/components/user-item"
import useAuthStore from "@/hooks/use-auth-store"
import useChessStore from "@/hooks/use-chess-store"
import { useOnBotFinished } from "@/lib/socket/event-hooks/use-bot-events"
import { useOnGameFinish } from "@/lib/socket/event-hooks/use-game-events"

import PlayBoardChat from "./playboard-chat"
import PlayBoardModal, { usePlayBoardModalStore } from "./playboard-modal"
import PlayBoardNotation from "./playboard-notation"
import PlayBoardOptions from "./playboard-options"
import PlayBoardPlank from "./playboard-plank"

export default function PlayBoardPage() {
  const gameMode = useChessStore((state) => state.gameMode)
  const botDifficulty = useChessStore((state) => state.botDifficulty)
  const setIsPlaying = useChessStore((state) => state.setIsPlaying)
  const opponent = useChessStore((state) => state.opponentInfo)!
  const user = useAuthStore((state) => state.user)!
  const setters = usePlayBoardModalStore((state) => state.setters)

  const handleGameFinish = (result: string, winner: "Black" | "White" | null) => {
    setIsPlaying(false)
    setters.setTitle(winner ? `${winner} wins` : "Draw")
    setters.setDescription(result)
    setters.setIsOpen(true)
  }

  useOnBotFinished(({ result, winner }) => handleGameFinish(result, winner))
  useOnGameFinish(({ result, winner }) => handleGameFinish(result, winner))

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
