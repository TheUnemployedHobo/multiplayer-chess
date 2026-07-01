import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"

import ProfileEditPopover from "./profile-edit-popover"

export default function DashboardProfile() {
  return (
    <Item className="md:col-span-3" variant="muted">
      <ItemMedia>
        <Avatar size="lg">
          <AvatarImage src="https://github.com/evilrabbit.png" />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Soy boy lib</ItemTitle>
        <ItemDescription>Member since Jan 2020</ItemDescription>
      </ItemContent>
      <ItemActions>
        <ProfileEditPopover />
      </ItemActions>
    </Item>
  )
}
