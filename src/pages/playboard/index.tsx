import { UserItem } from "@/components/user-item"
import useAuthStore from "@/hooks/use-auth-store"
import useChessStore from "@/hooks/use-chess-store"
import { useOnBotFinished } from "@/lib/socket/event-hooks/use-bot-events"

import PlayBoardChat from "./playboard-chat"
import PlayBoardModal, { usePlayBoardModalSetIsOpen } from "./playboard-modal"
import PlayBoardNotation from "./playboard-notation"
import PlayBoardOptions from "./playboard-options"
import PlayBoardPlank from "./playboard-plank"

export default function PlayBoardPage() {
  const setIsOpen = usePlayBoardModalSetIsOpen()
  const gameMode = useChessStore((state) => state.gameMode)
  const botDifficulty = useChessStore((state) => state.botDifficulty)
  const setIsPlaying = useChessStore((state) => state.setIsPlaying)
  const { avatar, stats, username } = useAuthStore((state) => state.user)!

  useOnBotFinished(() => {
    setIsPlaying(false)
    setIsOpen(true)
  })

  return (
    <section className="container mx-auto flex min-h-dvh flex-col gap-3 p-3 md:h-dvh md:flex-row">
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        {/* {gameMode === "multiplayer" && <UserItem />} */}
        {gameMode === "bot" && <UserItem avatar="bot" description={botDifficulty} title="Engine" />}
        <PlayBoardPlank />
        <UserItem avatar={avatar} description={`ELO: ${stats.elo}`} title={username} />
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
