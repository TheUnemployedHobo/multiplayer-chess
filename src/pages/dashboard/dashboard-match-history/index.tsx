import { SwordsIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ItemGroup } from "@/components/ui/item"
import { UserItem } from "@/components/user-item"

import DashboardFullHistory from "./dashboard-full-history"

export default function DashboardMatchHistory() {
  return (
    <Card className="h-min">
      <CardHeader>
        <CardTitle>
          <Badge className="size-8 rounded-full p-0" variant="secondary">
            <SwordsIcon />
          </Badge>
          <span className="ml-2">Recent matches</span>
        </CardTitle>
        <CardDescription>View your recent match history</CardDescription>
        <CardAction>
          <DashboardFullHistory />
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <UserItem
            actions={<Badge className="bg-red-700">Loss</Badge>}
            avatar="e8wq4inw"
            description="5 days ago"
            title="Evil Rabbit"
            variant="outline"
          />
          <UserItem
            actions={<Badge className="bg-green-700">Win</Badge>}
            avatar="e8wq4inw"
            description="5 days ago"
            title="Evil Rabbit"
            variant="outline"
          />
          <UserItem
            actions={<Badge className="bg-yellow-700">Draw</Badge>}
            avatar="e8wq4inw"
            description="5 days ago"
            title="Evil Rabbit"
            variant="outline"
          />
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
