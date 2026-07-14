import { ScrollIcon } from "lucide-react"

import { ShadcnDialog } from "@/components/shadcn-dialogs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ItemGroup } from "@/components/ui/item"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserItem } from "@/components/user-item"

export default function DashboardFullHistory() {
  return (
    <ShadcnDialog
      content={
        <>
          <div className="flex gap-x-3">
            <Input placeholder="Search for an opponent..." />
            <Select defaultValue="wins">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="wins">Wins</SelectItem>
                  <SelectItem value="losses">Losses</SelectItem>
                  <SelectItem value="draws">Draws</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <ScrollArea>
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
          </ScrollArea>
        </>
      }
      description="12 matches found"
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
