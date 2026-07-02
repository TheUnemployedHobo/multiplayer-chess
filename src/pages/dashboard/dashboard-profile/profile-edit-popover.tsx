import { PencilIcon, Trash2Icon, UserRoundPenIcon } from "lucide-react"

import AvatarPopover from "@/components/avatar-popover"
import SubmitButton from "@/components/submit-button"
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
import { Label } from "@/components/ui/label"
import useBreakPoint from "@/hooks/use-break-point"

export default function ProfileEditPopover() {
  const { md } = useBreakPoint()

  const handleAction = async (formData: FormData) => {
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const avatar = formData.get("avatar") as string
    console.log(username, password, avatar)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={md ? "default" : "icon-lg"} variant="secondary">
          <UserRoundPenIcon />
          {md && <span>Edit profile</span>}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update your profile</DialogTitle>
          <DialogDescription>
            Change your username, password, or avatar. Click “Save changes” to apply the updates to your account.
          </DialogDescription>
        </DialogHeader>
        <form action={handleAction} className="flex flex-col items-center gap-y-5">
          <AvatarPopover />
          <div className="w-full space-y-2">
            <Label htmlFor="un">Username</Label>
            <Input autoComplete="username" id="un" name="username" placeholder="e.g. admin" type="text" />
          </div>
          <div className="w-full space-y-2">
            <Label htmlFor="pw">Password</Label>
            <Input autoComplete="new-password" id="pw" name="password" placeholder="e.g. 1234" type="password" />
          </div>
          <Button className="w-full" size="lg" type="button" variant="destructive">
            <Trash2Icon />
            <span>Delete account</span>
          </Button>
          <SubmitButton className="w-full" icon={<PencilIcon />} text="Save changes" />
        </form>
      </DialogContent>
    </Dialog>
  )
}
