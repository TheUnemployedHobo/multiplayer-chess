import { UsersRoundIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item"

export default function DashboardFriends() {
  return (
    <Card className="md:col-start-3 md:row-span-3 md:row-start-2">
      <CardHeader>
        <CardTitle>
          <Badge className="size-8 rounded-full p-0" variant="secondary">
            <UsersRoundIcon />
          </Badge>
          <span className="ml-2">Friends</span>
        </CardTitle>
        <CardDescription>Play with friends online</CardDescription>
        <CardAction>
          <Badge>4 online</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <Item variant="outline">
            <ItemMedia>
              <Avatar size="lg">
                <AvatarImage src="https://github.com/evilrabbit.png" />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Evil Rabbit</ItemTitle>
              <ItemDescription>Online</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline">
            <ItemMedia>
              <Avatar size="lg">
                <AvatarImage src="https://github.com/evilrabbit.png" />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Evil Rabbit</ItemTitle>
              <ItemDescription>Online</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
