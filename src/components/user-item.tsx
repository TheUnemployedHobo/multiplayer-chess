import type { ComponentProps, ReactNode } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { findAvatarByName } from "@/lib/avatars"

type PropsType = ComponentProps<typeof Item> & {
  actions: ReactNode | undefined
  avatar: string
  description: string
  title: string
}

export function UserItem({ actions, avatar, description, title, ...props }: PropsType) {
  return (
    <Item {...props}>
      <ItemMedia>
        <Avatar size="lg">
          <AvatarImage src={findAvatarByName(avatar).svgSrc} />
          <AvatarFallback>{title.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
      {actions && <ItemActions>{actions}</ItemActions>}
    </Item>
  )
}
