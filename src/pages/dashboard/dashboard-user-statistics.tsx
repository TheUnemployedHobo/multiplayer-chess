import { ChartColumnIcon, ChessKingIcon, JoystickIcon, TrophyIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item"

export default function DashboardUserStatistics() {
  const statistics = [
    { content: "142", icon: <JoystickIcon />, title: "Games" },
    { content: "68.9%", icon: <TrophyIcon />, title: "Win rate" },
    { content: "1400", icon: <ChessKingIcon />, title: "ELO" },
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
        <ItemGroup className="grid grid-cols-3">
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
