import { toast } from "sonner"
import useSWR, { mutate } from "swr"

import { ShadcnDialog } from "@/components/shadcn-dialogs"
import { Button } from "@/components/ui/button"
import { ItemGroup } from "@/components/ui/item"
import { UserItem, UserItemPlaceholder } from "@/components/user-item"
import useAuthStore from "@/hooks/use-auth-store"
import { getFriends } from "@/lib/services"
import {
  acceptInvite,
  useFriendInviteToGame,
  useFriendPresence,
  useFriendRemoval,
} from "@/lib/socket/use-friend-events"

import FriendsActionToast from "./friends-action-toast"
import FriendsProfileView from "./friends-profile-view"

export default function FriendsListPanel() {
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

  const unfriend = useFriendRemoval((message) => {
    if (message) toast.info(message)
    mutateFriends()
    mutate("users")
  })

  const sendInvite = useFriendInviteToGame(({ payload, role }) => {
    if (role === "inviter") toast.info(payload)
    if (role === "invitee")
      toast.custom(
        (toastId) => (
          <FriendsActionToast
            avatar={payload.avatar}
            description={payload.message}
            id={toastId}
            onAccept={() => acceptInvite(payload.id)}
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
              <FriendsProfileView
                {...props}
                handleInvite={() =>
                  sendInvite({ partyA: { avatar, username }, partyB: { id: props.id, username: props.username } })
                }
                handleUnfriend={() => unfriend(props.id)}
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
