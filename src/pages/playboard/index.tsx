import PlayBoardNotation from "./playboard-notation"
import PlayBoardOptions from "./playboard-options"
import PlayBoardPlank from "./playboard-plank"
import PlayBoardPlayer from "./playboard-player"

export default function PlayBoardPage() {
  return (
    <section className="mx-auto grid min-h-dvh max-w-5xl content-center gap-3 md:grid-cols-[1fr_300px]">
      <div className="space-y-3">
        <PlayBoardPlayer />
        <PlayBoardPlank />
        <PlayBoardPlayer />
      </div>
      <div className="flex flex-col gap-y-3">
        <PlayBoardOptions />
        <PlayBoardNotation />
      </div>
    </section>
  )
}
