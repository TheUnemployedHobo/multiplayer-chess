import { TimerIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { UserItem } from "@/components/user-item"
import useChessStore from "@/hooks/use-chess-store"

export default function PlayBoardPlayer() {
  const gameMode = useChessStore((state) => state.gameMode)

  return (
    <UserItem
      actions={
        gameMode === "multiplayer" && (
          <Badge className="py-3" variant="outline">
            <TimerIcon />
            <span className="text-base font-bold">10:00</span>
          </Badge>
        )
      }
      avatar="e8wq4inw"
      description="ELO: 1200"
      title="Evil Rabbit"
      variant="muted"
    />
  )
}
