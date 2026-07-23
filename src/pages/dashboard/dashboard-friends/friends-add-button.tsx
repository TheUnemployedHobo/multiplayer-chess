import { UserRoundPlusIcon } from "lucide-react"
import { toast } from "sonner"
import useSWR, { mutate } from "swr"

import { ShadcnDialog } from "@/components/shadcn-dialogs"
import { Button } from "@/components/ui/button"
import useBreakPoint from "@/hooks/use-break-point"
import { getAllUsers } from "@/lib/services"
import { useAcceptFriendRequest, useFriendRequests } from "@/lib/socket/use-friend-events"

import FriendsActionToast from "./friends-action-toast"
import FriendsAddModal from "./friends-add-modal"

export default function FriendsAddButton() {
  const { data, mutate: mutateUsers } = useSWR("users", getAllUsers)
  const { lg } = useBreakPoint()

  const acceptRequest = useAcceptFriendRequest((message) => {
    toast.success(message)
    mutate("friends")
    mutateUsers()
  })

  const sendFriendRequest = useFriendRequests(({ payload, role }) => {
    if (role === "requestor") toast.info(payload.message)
    if (role === "requestee")
      toast.custom(
        (toastId) => (
          <FriendsActionToast
            avatar={payload.avatar}
            description={payload.message}
            id={toastId}
            onAccept={() => acceptRequest(payload.id)}
            title={payload.username}
          />
        ),
        { duration: 20000 },
      )
  })

  return (
    <ShadcnDialog
      content={<FriendsAddModal data={data} handleSendFriendReq={sendFriendRequest} />}
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
