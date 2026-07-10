import { UserItem } from "@/components/user-item"
import useAuthStore from "@/hooks/use-auth-store"
import { formatDate } from "@/lib/utils"

import ProfileEditPopover from "./profile-edit-popover"
import ProfileLogoutButton from "./profile-logout-button"

export default function DashboardProfile() {
  const user = useAuthStore((state) => state.user)

  if (!user) return null

  return (
    <UserItem
      actions={
        <>
          <ProfileEditPopover />
          <ProfileLogoutButton />
        </>
      }
      avatar={user.avatar}
      className="md:col-span-3"
      description={`Member since ${formatDate(user.signup_date)}`}
      title={user.username}
      variant="muted"
    />
  )
}
