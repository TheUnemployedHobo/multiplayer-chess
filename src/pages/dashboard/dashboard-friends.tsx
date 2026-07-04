import { UsersRoundIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item"
import useFetchFn from "@/hooks/use-fetch-fn"
import { findAvatarByName } from "@/lib/avatars"
import { getFriends } from "@/lib/services"

export default function DashboardFriends() {
  const { data } = useFetchFn(getFriends)

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
          {data?.length ? (
            data.map(({ avatar, id, stats, username }) => (
              <Item key={id} variant="outline">
                <ItemMedia>
                  <Avatar size="lg">
                    <AvatarImage src={findAvatarByName(avatar)?.svgSrc} />
                    <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{username}</ItemTitle>
                  <ItemDescription>Online</ItemDescription>
                </ItemContent>
              </Item>
            ))
          ) : (
            <p>No friends yet. Invite friends to start playing together.</p>
          )}
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
