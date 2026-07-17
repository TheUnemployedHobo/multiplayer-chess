import { CheckIcon, UserRoundPlusIcon, XIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import useSWR, { mutate } from "swr"

import { ShadcnDialog } from "@/components/shadcn-dialogs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ItemGroup } from "@/components/ui/item"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserItem, UserItemPlaceholder } from "@/components/user-item"
import useBreakPoint from "@/hooks/use-break-point"
import { getAllUsers } from "@/lib/services"
import { useAcceptFriendRequest, useFriendRequests } from "@/lib/socket/event-hooks/use-friend-events"
import { formatDate } from "@/lib/utils"

export default function DashboardAddFriend() {
  const [search, setSearch] = useState("")
  const { lg } = useBreakPoint()
  const { data, mutate: mutateUsers } = useSWR("users", getAllUsers)

  const acceptReq = useAcceptFriendRequest((message) => {
    toast.success(message)
    mutate("friends")
    mutateUsers()
  })

  const sendFriendReq = useFriendRequests(({ avatar, userId, username }) => {
    toast.custom(
      (t) => (
        <UserItem
          actions={
            <>
              <Button onClick={() => toast.dismiss(t)} size="icon-lg" variant="destructive">
                <XIcon />
              </Button>
              <Button
                onClick={() => {
                  acceptReq(userId)
                  toast.dismiss(t)
                }}
                size="icon-lg"
                variant="default"
              >
                <CheckIcon />
              </Button>
            </>
          }
          avatar={avatar}
          className="bg-muted"
          description="Wants to be your friend"
          title={username}
        />
      ),
      { duration: 20000 },
    )
  })

  return (
    <ShadcnDialog
      content={
        <>
          <Input
            onInput={(e) => setSearch(e.currentTarget.value)}
            placeholder="Search for users"
            type="search"
            value={search}
          />
          <ScrollArea className="h-80">
            <ItemGroup>
              {!data ? (
                <UserItemPlaceholder quantity={4} />
              ) : !data.length ? (
                <p className="bg-muted-foreground">No users found!</p>
              ) : (
                data
                  .filter(({ username }) => username.includes(search.toLowerCase()))
                  .map(({ avatar, id, signup_date, username }) => (
                    <UserItem
                      actions={
                        <Button
                          onClick={() => {
                            sendFriendReq(id)
                            toast.info(`Friend request sent to ${username}`)
                          }}
                          size="icon-lg"
                        >
                          <UserRoundPlusIcon />
                        </Button>
                      }
                      avatar={avatar}
                      description={`Member since ${formatDate(signup_date)}`}
                      key={id}
                      title={username}
                      variant="muted"
                    />
                  ))
              )}
            </ItemGroup>
          </ScrollArea>
        </>
      }
      description="Search for a username to send a request."
      title="Add a new friend"
      triggerButton={
        <Button size={lg ? "default" : "icon-lg"} variant="outline">
          <UserRoundPlusIcon />
          {lg && <span>Add friend</span>}
        </Button>
      }
    />
  )
}
