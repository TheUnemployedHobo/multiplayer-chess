import { TimerIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"

export default function PlayBoardPlayer() {
  return (
    <Item variant="muted">
      <ItemMedia>
        <Avatar size="lg">
          <AvatarImage src="https://github.com/evilrabbit.png" />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Evil Rabbit</ItemTitle>
        <ItemDescription>Elo 2420</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge className="py-3" variant="outline">
          <TimerIcon />
          <span className="text-base font-bold">10:00</span>
        </Badge>
      </ItemActions>
    </Item>
  )
}
