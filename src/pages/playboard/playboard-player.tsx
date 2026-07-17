import { TimerIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { UserItem } from "@/components/user-item"
import useChessStore from "@/hooks/use-chess-store"

type PropsType = {
  avatar: string
  description: string
  timer?: number
  title: string
}

export default function PlayBoardPlayer({ timer, ...props }: PropsType) {
  const gameMode = useChessStore((state) => state.gameMode)

  return (
    <UserItem
      actions={
        gameMode === "multiplayer" && (
          <Badge className="py-3" variant="outline">
            <TimerIcon />
            <span className="text-base font-bold">{timer}</span>
          </Badge>
        )
      }
      variant="muted"
      {...props}
    />
  )
}
