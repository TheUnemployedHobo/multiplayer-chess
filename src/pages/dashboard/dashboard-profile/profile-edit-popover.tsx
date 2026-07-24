import { PencilIcon, UserRoundPenIcon } from "lucide-react"
import { toast } from "sonner"
import { useLocation } from "wouter"

import AvatarPopover from "@/components/avatar-popover"
import { ShadcnDialog } from "@/components/shadcn-dialogs"
import SubmitButton from "@/components/submit-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useAuthStore from "@/hooks/use-auth-store"
import useBreakPoint from "@/hooks/use-break-point"
import { updateUserInfo } from "@/lib/services"

import ProfileDeleteButton from "./profile-delete-button"

export default function ProfileEditPopover() {
  const user = useAuthStore((state) => state.user)!
  const clear = useAuthStore((state) => state.clear)
  const [, setLocation] = useLocation()
  const { md } = useBreakPoint()

  const handleUpdate = async (formData: FormData) => {
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const avatar = formData.get("avatar") as string

    const response = await updateUserInfo(username, password, avatar)

    if (!response) {
      toast.error("Update failed", { description: "Unable to update your profile. Please try again later." })
      return
    }

    toast.success("Profile updated", { description: "Your username, password, and avatar changes have been saved." })
    clear("noDirection")
    setLocation("/entrance", { replace: true })
  }

  return (
    <ShadcnDialog
      content={
        <form action={handleUpdate} className="flex flex-col items-center gap-y-5">
          <AvatarPopover defaultAvatarName={user.avatar} />
          <div className="w-full space-y-2">
            <Label htmlFor="un">Username</Label>
            <Input
              autoComplete="username"
              defaultValue={user.username}
              id="un"
              name="username"
              pattern="^[a-z]{3,20}$"
              placeholder="e.g. admin"
              title="Lowercase letters only (3-20 chars)"
              type="text"
            />
          </div>
          <div className="w-full space-y-2">
            <Label htmlFor="pw">Password</Label>
            <Input
              autoComplete="new-password"
              id="pw"
              minLength={3}
              name="password"
              placeholder="e.g. 1234"
              type="password"
            />
          </div>
          <ProfileDeleteButton />
          <SubmitButton className="w-full" icon={<PencilIcon />} text="Save changes" />
        </form>
      }
      description="Change your username, password, or avatar. Click “Save changes” to apply the updates to your account."
      title="Update your profile"
      triggerButton={
        <Button size={md ? "default" : "icon-lg"} variant="secondary">
          <UserRoundPenIcon />
          {md && <span>Edit profile</span>}
        </Button>
      }
    />
  )
}
