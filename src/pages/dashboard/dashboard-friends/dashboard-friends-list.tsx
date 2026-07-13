import useSWR from "swr"

import { ItemPlaceholder } from "@/components/placeholders"
import { ShadcnDialog } from "@/components/shadcn-dialogs"
import { Button } from "@/components/ui/button"
import { ItemGroup } from "@/components/ui/item"
import { UserItem } from "@/components/user-item"
import { useFriendPresence } from "@/hooks/use-socket-events"
import { getFriends } from "@/lib/services"

import DashboardFriendsProfile from "./dashboard-friends-profile"

export default function DashboardFriendsList() {
  const { data, mutate } = useSWR("friends", getFriends)

  useFriendPresence((friend) => {
    const order = { online: 0, playing: 1 } as const
    mutate(
      (friends) =>
        friends
          ?.map((each) => (friend.userId === each.id ? { ...each, status: friend.status } : each))
          .sort((a, b) => (order[a.status as keyof typeof order] ?? 2) - (order[b.status as keyof typeof order] ?? 2)),
      false,
    )
  })

  return (
    <ItemGroup>
      {!data ? (
        <ItemPlaceholder quantity={5} />
      ) : !data.length ? (
        <p>No friends yet. Invite friends to start playing together.</p>
      ) : (
        data.map((props) => (
          <ShadcnDialog
            content={<DashboardFriendsProfile {...props} />}
            key={props.id}
            triggerButton={
              <Button className="h-max w-full p-0" variant="ghost">
                <UserItem
                  avatar={props.avatar}
                  description={props.status ? props.status : "Offline"}
                  status={props.status}
                  title={props.username}
                  variant="muted"
                />
              </Button>
            }
          />
        ))
      )}
    </ItemGroup>
  )
}
