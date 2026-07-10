import { CheckIcon, UserRoundPlusIcon, XIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import useSWR from "swr"

import { ItemPlaceholder } from "@/components/placeholders"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useIncomingFriendRequest, useSendFriendRequest } from "@/hooks/use-socket-events"
import { findAvatarByName } from "@/lib/avatars"
import { getAllUsers } from "@/lib/services"
import { formatDate } from "@/lib/utils"

export default function DashboardAddFriend() {
  const [search, setSearch] = useState("")
  const { data, isLoading } = useSWR("users", getAllUsers)
  const sendReq = useSendFriendRequest()

  useIncomingFriendRequest(({ avatar, userId, username }) =>
    toast.custom(
      (t) => (
        <Item className="bg-muted">
          <ItemMedia>
            <Avatar size="lg">
              <AvatarImage src={findAvatarByName(avatar).svgSrc} />
              <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{username}</ItemTitle>
            <ItemDescription>Wants to be your friend</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button onClick={() => toast.dismiss(t)} size="icon-lg" variant="destructive">
              <XIcon />
            </Button>
            <Button size="icon-lg" variant="default">
              <CheckIcon />
            </Button>
          </ItemActions>
        </Item>
      ),
      { duration: 20000 },
    ),
  )

  const handleClick = (id: string, username: string) => {
    sendReq(id)
    toast.info(`Friend request sent to ${username}`)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          <UserRoundPlusIcon />
          <span>Add friend</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new friend</DialogTitle>
          <DialogDescription>Search for your friend's username to send a request.</DialogDescription>
        </DialogHeader>
        <Input
          onInput={(e) => setSearch(e.currentTarget.value)}
          placeholder="Search for friends"
          type="search"
          value={search}
        />
        <ScrollArea className="h-80">
          <ItemGroup>
            {isLoading || !data ? (
              <ItemPlaceholder quantity={4} />
            ) : (
              data
                .filter(({ username }) => username.includes(search.toLowerCase()))
                .map(({ avatar, id, signup_date, username }) => (
                  <Item key={id} variant="outline">
                    <ItemMedia>
                      <Avatar size="lg">
                        <AvatarImage src={findAvatarByName(avatar).svgSrc} />
                        <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{username}</ItemTitle>
                      <ItemDescription>Member since {formatDate(signup_date)}</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Button onClick={() => handleClick(id, username)} size="icon-lg">
                        <UserRoundPlusIcon />
                      </Button>
                    </ItemActions>
                  </Item>
                ))
            )}
          </ItemGroup>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
