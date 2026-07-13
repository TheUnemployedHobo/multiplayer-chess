import { SwordsIcon, UserRoundMinusIcon } from "lucide-react"

import type { FriendType } from "@/lib/services"

import { Button } from "@/components/ui/button"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item"
import { UserItem } from "@/components/user-item"
import { formatDate } from "@/lib/utils"

type PropsType = FriendType

export default function DashboardFriendsProfile({ avatar, signup_date, stats, status, username }: PropsType) {
  const statistics = [
    { content: stats.games, title: "Games" },
    { content: stats.wins, title: "Wins" },
    { content: stats.losses, title: "Losses" },
    { content: stats.elo, title: "ELO" },
  ] as const

  return (
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
  )
}
