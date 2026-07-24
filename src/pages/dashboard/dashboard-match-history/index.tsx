import { SwordsIcon } from "lucide-react"
import useSWR from "swr"

import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ItemGroup } from "@/components/ui/item"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserItem, UserItemPlaceholder } from "@/components/user-item"
import { getMatchHistory } from "@/lib/services"
import { cn, timeAgo } from "@/lib/utils"

import MatchFullHistory from "./match-full-history"

export default function DashboardMatchHistory() {
  const { data } = useSWR("matches", getMatchHistory)

  return (
    <Card className="min-h-0 flex-1">
      <CardHeader>
        <CardTitle>
          <Badge className="size-8 rounded-full p-0" variant="secondary">
            <SwordsIcon />
          </Badge>
          <span className="ml-2">Recent matches</span>
        </CardTitle>
        <CardDescription>View your recent match history</CardDescription>
        <CardAction>
          <MatchFullHistory matches={data} />
        </CardAction>
      </CardHeader>
      <CardContent className="min-h-0 flex-1">
        <ScrollArea className="h-full min-h-0">
          <ItemGroup>
            {!data ? (
              <UserItemPlaceholder quantity={4} />
            ) : !data.length ? (
              <p className="text-muted-foreground">No recent matches yet.</p>
            ) : (
              data
                .slice(0, 3)
                .map(({ opponent, playedAt, result }) => (
                  <UserItem
                    actions={
                      <Badge
                        className={cn(
                          result === "loss" && "bg-red-700",
                          result === "draw" && "bg-amber-600",
                          result === "win" && "bg-green-700",
                        )}
                      >
                        {result}
                      </Badge>
                    }
                    avatar={opponent.avatar}
                    description={timeAgo(playedAt)}
                    key={playedAt}
                    title={opponent.username}
                    variant="outline"
                  />
                ))
            )}
          </ItemGroup>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
