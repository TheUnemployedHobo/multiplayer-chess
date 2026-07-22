import { toast } from "sonner"
import useSWR, { mutate } from "swr"

import { ShadcnDialog } from "@/components/shadcn-dialogs"
import { Button } from "@/components/ui/button"
import { ItemGroup } from "@/components/ui/item"
import { UserItem, UserItemPlaceholder } from "@/components/user-item"
import useAuthStore from "@/hooks/use-auth-store"
import { getFriends } from "@/lib/services"
import { socket } from "@/lib/socket"
import { useFriendInviteToGame, useFriendPresence, useFriendRemoval } from "@/lib/socket/event-hooks/use-friend-events"

import DashboardFriendToaster from "./dashboard-friend-toaster"
import DashboardFriendsProfile from "./dashboard-friends-profile"

export default function DashboardFriendsList() {
  const { data, mutate: mutateFriends } = useSWR("friends", getFriends)
  const { avatar, username } = useAuthStore((state) => state.user)!

  useFriendPresence((friend) => {
    const order = { online: 0, playing: 1 } as const
    mutateFriends(
      (friends) =>
        friends
          ?.map((each) => (friend.userId === each.id ? { ...each, status: friend.status } : each))
          .sort((a, b) => (order[a.status as keyof typeof order] ?? 2) - (order[b.status as keyof typeof order] ?? 2)),
      false,
    )
  })

  const unfriend = useFriendRemoval(() => {
    mutateFriends()
    mutate("users")
  })

  const inviteToGame = useFriendInviteToGame(({ payload, role }) => {
    if (role === "inviter") toast.info(payload)
    if (role === "invitee")
      toast.custom(
        (id) => (
          <DashboardFriendToaster
            avatar={payload.avatar}
            description={payload.description}
            id={id}
            onAccept={() => socket.emit("friend:invite-to-game:accept", payload.id)}
            title={payload.username}
          />
        ),
        { duration: 20000 },
      )
  })

  return (
    <ItemGroup>
      {!data ? (
        <UserItemPlaceholder quantity={5} />
      ) : !data.length ? (
        <p className="text-muted-foreground">No friends yet. Invite friends to start playing together.</p>
      ) : (
        data.map((props) => (
          <ShadcnDialog
            content={
              <DashboardFriendsProfile
                {...props}
                handleInvite={() =>
                  inviteToGame({ invitee: { id: props.id, username: props.username }, inviter: { avatar, username } })
                }
                handleUnfriend={() => {
                  unfriend(props.id)
                  toast.info(`You are no longer friends with ${props.username}`)
                }}
              />
            }
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
