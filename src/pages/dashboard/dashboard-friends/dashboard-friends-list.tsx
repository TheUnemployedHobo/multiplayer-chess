import { ItemGroup } from "@/components/ui/item"

export default function DashboardFriendsList() {
  return (
    <ItemGroup>
      {/* {data?.length ? (
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
          )} */}
    </ItemGroup>
  )
}
