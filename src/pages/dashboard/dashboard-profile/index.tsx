import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import useAuthStore from "@/hooks/use-auth-store"
import { findAvatarByName } from "@/lib/avatars"
import { formatDate } from "@/lib/utils"

import ProfileEditPopover from "./profile-edit-popover"
import ProfileLogoutButton from "./profile-logout-button"

export default function DashboardProfile() {
  const { user } = useAuthStore()

  if (!user) return null

  return (
    <Item className="md:col-span-3" variant="muted">
      <ItemMedia>
        <Avatar size="lg">
          <AvatarImage src={findAvatarByName(user.avatar).svgSrc} />
          <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{user.username}</ItemTitle>
        <ItemDescription>Member since {formatDate(user.signup_date)}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <ProfileEditPopover />
        <ProfileLogoutButton />
      </ItemActions>
    </Item>
  )
}
