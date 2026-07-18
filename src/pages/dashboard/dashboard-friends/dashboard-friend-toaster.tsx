import { CheckIcon, XIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { UserItem } from "@/components/user-item"

type PropsType = { avatar: string; id: number | string; onAccept: () => void; username: string }

export default function DashboardFriendToaster({ avatar, id, onAccept, username }: PropsType) {
  return (
    <UserItem
      actions={
        <>
          <Button onClick={() => toast.dismiss(id)} size="icon-lg" variant="destructive">
            <XIcon />
          </Button>
          <Button
            onClick={() => {
              onAccept()
              toast.dismiss(id)
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
  )
}
