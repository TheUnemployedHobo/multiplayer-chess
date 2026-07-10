import { CheckIcon, UserRoundPlusIcon, XIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import useSWR from "swr"

import { ItemPlaceholder } from "@/components/placeholders"
import { ShadcnDialog } from "@/components/shadcn-dialogs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ItemGroup } from "@/components/ui/item"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserItem } from "@/components/user-item"
import { useIncomingFriendRequest, useSendFriendRequest } from "@/hooks/use-socket-events"
import { getAllUsers } from "@/lib/services"
import { formatDate } from "@/lib/utils"

export default function DashboardAddFriend() {
  const [search, setSearch] = useState("")
  const { data, isLoading } = useSWR("users", getAllUsers)
  const sendReq = useSendFriendRequest()

  useIncomingFriendRequest(({ avatar, userId, username }) =>
    toast.custom(
      (t) => (
        <UserItem
          actions={
            <>
              <Button onClick={() => toast.dismiss(t)} size="icon-lg" variant="destructive">
                <XIcon />
              </Button>
              <Button size="icon-lg" variant="default">
                <CheckIcon />
              </Button>
            </>
          }
          avatar={avatar}
          description="Wants to be your friend"
          title={username}
        />
      ),
      { duration: 20000 },
    ),
  )

  const handleClick = (id: string, username: string) => {
    sendReq(id)
    toast.info(`Friend request sent to ${username}`)
  }

  return (
    <ShadcnDialog
      content={
        <>
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
                    <UserItem
                      actions={
                        <Button onClick={() => handleClick(id, username)} size="icon-lg">
                          <UserRoundPlusIcon />
                        </Button>
                      }
                      avatar={avatar}
                      description={`Member since ${formatDate(signup_date)}`}
                      key={id}
                      title={username}
                    />
                  ))
              )}
            </ItemGroup>
          </ScrollArea>
        </>
      }
      description="Search for your friend's username to send a request.</"
      title="Add a new friend"
      triggerButton={
        <Button className="w-full" variant="outline">
          <UserRoundPlusIcon />
          <span>Add friend</span>
        </Button>
      }
    />
  )
}
