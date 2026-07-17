import { UserItem } from "@/components/user-item"
import useAuthStore from "@/hooks/use-auth-store"
import { formatDate } from "@/lib/utils"

import ProfileEditPopover from "./profile-edit-popover"
import ProfileLogoutButton from "./profile-logout-button"

export default function DashboardProfile() {
  const user = useAuthStore((state) => state.user)!

  return (
    <UserItem
      actions={
        <>
          <ProfileEditPopover />
          <ProfileLogoutButton />
        </>
      }
      avatar={user.avatar}
      description={`Member since ${formatDate(user.signup_date)}`}
      title={user.username}
      variant="muted"
    />
  )
}
