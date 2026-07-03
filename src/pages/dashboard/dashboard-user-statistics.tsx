import { ChartColumnIcon, ChessKingIcon, JoystickIcon, TrophyIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item"
import useAuthStore from "@/hooks/use-auth-store"

export default function DashboardUserStatistics() {
  const { user } = useAuthStore()

  const statistics = [
    { content: user?.stats.games, icon: <JoystickIcon />, title: "Games" },
    { content: user?.stats.wins, icon: <TrophyIcon />, title: "Wins" },
    { content: user?.stats.losses, icon: <TrophyIcon />, title: "Losses" },
    { content: user?.stats.elo, icon: <ChessKingIcon />, title: "ELO" },
  ]

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>
          <Badge className="size-8 rounded-full p-0" variant="secondary">
            <ChartColumnIcon />
          </Badge>
          <span className="ml-2">Your Statistics</span>
        </CardTitle>
        <CardDescription>View your performance metrics and progress</CardDescription>
      </CardHeader>
      <CardContent>
        <ItemGroup className="grid grid-cols-2 md:grid-cols-4">
          {statistics.map(({ content, icon, title }) => (
            <Item key={title} size="xs" variant="outline">
              <ItemMedia variant="icon">{icon}</ItemMedia>
              <ItemContent>
                <ItemTitle>{title}</ItemTitle>
                <ItemDescription className="text-xl">{content}</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
