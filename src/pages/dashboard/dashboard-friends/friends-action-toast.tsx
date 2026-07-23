import { CheckIcon, XIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { UserItem } from "@/components/user-item"

type PropsType = { avatar: string; description: string; id: number | string; onAccept: () => void; title: string }

export default function FriendsActionToast({ id, onAccept, ...props }: PropsType) {
  const handleDecline = () => {
    toast.dismiss(id)
  }

  const handleAccept = () => {
    onAccept()
    toast.dismiss(id)
  }

  return (
    <UserItem
      actions={
        <>
          <Button onClick={handleDecline} size="icon-lg" variant="destructive">
            <XIcon />
          </Button>
          <Button onClick={handleAccept} size="icon-lg" variant="default">
            <CheckIcon />
          </Button>
        </>
      }
      className="bg-muted"
      {...props}
    />
  )
}
