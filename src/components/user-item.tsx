import type { ComponentProps, ReactNode } from "react"

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { findAvatarByName } from "@/lib/avatars"
import { cn } from "@/lib/utils"

type PropsType = ComponentProps<typeof Item> & {
  actions?: ReactNode
  avatar: string
  description: string
  status?: "online" | "playing"
  title: string
}

export function UserItem({ actions, avatar, description, status, title, ...props }: PropsType) {
  return (
    <Item {...props}>
      <ItemMedia>
        <Avatar size="lg">
          <AvatarImage src={findAvatarByName(avatar).svgSrc} />
          <AvatarFallback>{title.slice(0, 2).toUpperCase()}</AvatarFallback>
          {status && (
            <AvatarBadge
              className={cn(status === "online" && "bg-green-600", status === "playing" && "bg-yellow-600")}
            />
          )}
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
