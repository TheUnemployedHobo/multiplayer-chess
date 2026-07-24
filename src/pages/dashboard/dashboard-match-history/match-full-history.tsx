import { ScrollIcon } from "lucide-react"
import { useState } from "react"

import type { MatchHistoryType } from "@/lib/common-types"

import { ShadcnDialog } from "@/components/shadcn-dialogs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ItemGroup } from "@/components/ui/item"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserItem, UserItemPlaceholder } from "@/components/user-item"
import { cn, timeAgo } from "@/lib/utils"

type PropsType = { matches: MatchHistoryType[] | null | undefined }

export default function MatchFullHistory({ matches }: PropsType) {
  const [search, setSearch] = useState("")
  const [result, setResult] = useState("no")

  const filteredMatches = !matches
    ? matches
    : matches.filter(({ opponent, result: matchResult }) => {
        const nameMatch = opponent.username.includes(search.toLowerCase())
        const resultMatch = result === "no" ? true : matchResult === result
        return nameMatch && resultMatch
      })

  return (
    <ShadcnDialog
      content={
        <>
          <div className="flex gap-x-3">
            <Input onChange={(e) => setSearch(e.target.value)} placeholder="Search for an opponent..." value={search} />
            <Select onValueChange={setResult} value={result}>
              <SelectTrigger>
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="no">No filter</SelectItem>
                  <SelectItem value="win">Wins</SelectItem>
                  <SelectItem value="loss">Losses</SelectItem>
                  <SelectItem value="draw">Draws</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <ScrollArea className="h-80">
            <ItemGroup>
              {!matches ? (
                <UserItemPlaceholder quantity={4} />
              ) : !filteredMatches?.length ? (
                <p className="text-muted-foreground">No recent matches.</p>
              ) : (
                filteredMatches.map(({ opponent, playedAt, result }) => (
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
        </>
      }
      description={`${filteredMatches?.length ?? 0} matches found`}
      title="All Matches"
      triggerButton={
        <Button variant="outline">
          <ScrollIcon />
          <span>View all</span>
        </Button>
      }
    />
  )
}
