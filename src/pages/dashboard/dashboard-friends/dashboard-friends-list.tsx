import { SwordsIcon, UserRoundMinusIcon } from "lucide-react"
import useSWR from "swr"

import { ItemPlaceholder } from "@/components/placeholders"
import { ShadcnDialog } from "@/components/shadcn-dialogs"
import { Button } from "@/components/ui/button"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item"
import { UserItem } from "@/components/user-item"
import { useFriendPresence } from "@/hooks/use-socket-events"
import { getFriends } from "@/lib/services"
import { formatDate } from "@/lib/utils"

export default function DashboardFriendsList() {
  const { data, mutate } = useSWR("friends", getFriends)

  useFriendPresence((friend) => {
    const order = { online: 0, playing: 1 } as const
    mutate(
      (friends) =>
        friends
          ?.map((each) => (friend.userId === each.id ? { ...each, status: friend.status } : each))
          .sort((a, b) => (order[a.status as keyof typeof order] ?? 2) - (order[b.status as keyof typeof order] ?? 2)),
      false,
    )
  })

  return (
    <ItemGroup>
      {!data ? (
        <ItemPlaceholder quantity={5} />
      ) : !data.length ? (
        <p>No friends yet. Invite friends to start playing together.</p>
      ) : (
        data.map(({ avatar, id, signup_date, stats, status, username }) => {
          const statistics = [
            { content: stats.games, title: "Games" },
            { content: stats.wins, title: "Wins" },
            { content: stats.losses, title: "Losses" },
            { content: stats.elo, title: "ELO" },
          ]

          return (
            <ShadcnDialog
              content={
                <>
                  <UserItem
                    avatar={avatar}
                    description={`Member since ${formatDate(signup_date)}`}
                    status={status}
                    title={username}
                  />
                  <ItemGroup className="grid grid-cols-2 md:grid-cols-4">
                    {statistics.map(({ content, title }) => (
                      <Item key={title} size="xs" variant="outline">
                        <ItemContent>
                          <ItemTitle>{title}</ItemTitle>
                          <ItemDescription className="text-xl">{content}</ItemDescription>
                        </ItemContent>
                      </Item>
                    ))}
                  </ItemGroup>
                  <div className="flex gap-x-3">
                    <Button className="grow" variant="destructive">
                      <UserRoundMinusIcon />
                      <span>Unfriend</span>
                    </Button>
                    <Button className="grow" variant="secondary">
                      <SwordsIcon />
                      <span>Invite to play</span>
                    </Button>
                  </div>
                </>
              }
              key={id}
              triggerButton={
                <Button className="h-max w-full p-0" variant="ghost">
                  <UserItem
                    avatar={avatar}
                    description={status ? status : "Offline"}
                    status={status}
                    title={username}
                    variant="muted"
                  />
                </Button>
              }
            />
          )
        })
      )}
    </ItemGroup>
  )
}
