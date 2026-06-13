import { ScrollIcon, SwordsIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item"

export default function DashboardMatchHistory() {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>
          <Badge className="size-8 rounded-full p-0" variant="secondary">
            <SwordsIcon />
          </Badge>
          <span className="ml-2">Recent matches</span>
        </CardTitle>
        <CardDescription>View your recent match history</CardDescription>
        <CardAction>
          <Button variant="outline">
            <ScrollIcon />
            View all
          </Button>
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
              <ItemDescription>5 days ago</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge className="bg-red-700">Loss</Badge>
            </ItemActions>
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
              <ItemDescription>5 days ago</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge className="bg-green-700">Win</Badge>
            </ItemActions>
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
              <ItemDescription>5 days ago</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge className="bg-yellow-700">Draw</Badge>
            </ItemActions>
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
