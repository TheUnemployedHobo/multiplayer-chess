import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"

function PlayBoardPlayer() {
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
        <Badge className="py-3 text-lg font-bold" variant="outline">
          10:00
        </Badge>
      </ItemActions>
    </Item>
  )
}

export default PlayBoardPlayer
