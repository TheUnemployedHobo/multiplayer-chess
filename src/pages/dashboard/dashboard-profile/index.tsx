import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import useFetchFn from "@/hooks/use-fetch-fn"
import { findAvatarByName } from "@/lib/avatars"
import { getCurrentUser } from "@/lib/services"

import ProfileEditPopover from "./profile-edit-popover"
import ProfileLogout from "./profile-logout"

export default function DashboardProfile() {
  const { data } = useFetchFn(getCurrentUser)

  if (!data) return null

  return (
    <Item className="md:col-span-3" variant="muted">
      <ItemMedia>
        <Avatar size="lg">
          <AvatarImage src={findAvatarByName(data.avatar)?.svgSrc} />
          <AvatarFallback>{data.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{data.username}</ItemTitle>
        <ItemDescription>
          <span>Member since </span>
          <span>
            {new Date(data.signup_date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
          </span>
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <ProfileEditPopover />
        <ProfileLogout />
      </ItemActions>
    </Item>
  )
}
