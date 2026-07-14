import { ChessKingIcon, JoystickIcon, TrophyIcon } from "lucide-react"

import type { StatsType } from "@/lib/services"

import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "./ui/item"

type PropsType = StatsType & {
  size?: "default" | "sm" | "xs" | null | undefined
  withIcons?: boolean
}

export default function UserStatistics({ elo, games, losses, size, wins, withIcons }: PropsType) {
  const statistics = [
    { content: games, icon: <JoystickIcon />, title: "Games" },
    { content: wins, icon: <TrophyIcon />, title: "Wins" },
    { content: losses, icon: <TrophyIcon />, title: "Losses" },
    { content: elo, icon: <ChessKingIcon />, title: "ELO" },
  ] as const

  return (
    <ItemGroup className="grid grid-cols-2 md:grid-cols-4">
      {statistics.map(({ content, icon, title }) => (
        <Item key={title} size={size} variant="outline">
          {withIcons && <ItemMedia variant="icon">{icon}</ItemMedia>}
          <ItemContent>
            <ItemTitle>{title}</ItemTitle>
            <ItemDescription className="text-xl">{content}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </ItemGroup>
  )
}
