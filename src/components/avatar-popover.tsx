import { SquareMousePointerIcon } from "lucide-react"
import { useState } from "react"

import avatars, { type AvatarNameType, findAvatarByName } from "@/lib/avatars"

import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"

type PropsType = { defaultAvatarName?: AvatarNameType }

export default function AvatarPopover({ defaultAvatarName }: PropsType) {
  const [avatar, setAvatar] = useState(defaultAvatarName ? findAvatarByName(defaultAvatarName) : avatars.at(0)!)

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Avatar className="ring-secondary relative size-24 cursor-pointer ring-4">
            <AvatarImage alt={avatar.name} className="size-full" src={avatar.svgSrc} />
            <Badge className="absolute -right-3 -bottom-1" variant="secondary">
              <SquareMousePointerIcon />
              <span>Pick</span>
            </Badge>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <ToggleGroup
            className="flex flex-wrap justify-between"
            onValueChange={(value: AvatarNameType) => value && setAvatar(findAvatarByName(value))}
            type="single"
            value={avatar.name}
            variant="outline"
          >
            {avatars.map(({ name, svgSrc }) => (
              <ToggleGroupItem className="size-14 rounded-full p-0" key={name} value={name}>
                <Avatar size="lg">
                  <AvatarImage alt={name} src={svgSrc} />
                </Avatar>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </PopoverContent>
      </Popover>
      <input name="avatar" type="hidden" value={avatar.name} />
    </>
  )
}
