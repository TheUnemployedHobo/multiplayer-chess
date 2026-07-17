import useAuthStore from "@/hooks/use-auth-store"
import useChessStore from "@/hooks/use-chess-store"
import { useOnBotFinished } from "@/lib/socket/event-hooks/use-bot-events"

import PlayBoardChat from "./playboard-chat"
import PlayBoardModal, { usePlayBoardModalSetIsOpen } from "./playboard-modal"
import PlayBoardNotation from "./playboard-notation"
import PlayBoardOptions from "./playboard-options"
import PlayBoardPlank from "./playboard-plank"
import PlayBoardPlayer from "./playboard-player"

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
    <section className="mx-auto grid min-h-dvh max-w-5xl content-center gap-3 md:grid-cols-[1fr_300px]">
      <div className="space-y-3">
        {gameMode === "bot" && <PlayBoardPlayer avatar="bot" description={botDifficulty} title="Engine" />}
        <PlayBoardPlank />
        <PlayBoardPlayer avatar={avatar} description={`ELO: ${stats.elo}`} title={username} />
      </div>
      <div className="flex flex-col gap-y-3">
        <PlayBoardOptions />
        <PlayBoardNotation />
        {gameMode === "multiplayer" && <PlayBoardChat />}
      </div>
      <PlayBoardModal />
    </section>
  )
}
