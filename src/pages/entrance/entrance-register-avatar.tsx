import { SquareMousePointerIcon, UserRoundPlusIcon } from "lucide-react"
import { useState } from "react"

import SubmitButton from "@/components/submit-button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import avatars from "@/lib/avatars"

import type { EntranceFormPropsType } from "."

export default function EntranceAvatarPage({ handleAction }: Omit<EntranceFormPropsType, "setPage">) {
  const [avatar, setAvatar] = useState(avatars.at(0)!)

  const handleEnter = async (formData: FormData) => {
    formData.set("avatar", avatar.name)
    await handleAction(formData)
  }

  return (
    <form action={handleEnter} className="flex h-dvh items-center justify-center">
      <Card className="z-10 mx-5 w-96">
        <CardHeader>
          <CardTitle>
            <Badge className="size-8 rounded-full p-0" variant="secondary">
              <SquareMousePointerIcon />
            </Badge>
            <span className="ml-2">Choose avatar</span>
          </CardTitle>
          <CardDescription>Choose an avatar as your profile picture</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <Popover>
            <PopoverTrigger>
              <Avatar className="ring-secondary relative size-24 cursor-pointer ring-4">
                <AvatarImage alt="@shadcn" className="size-full" src={avatar.svgSrc} />
                <Badge className="absolute -right-3 -bottom-1" variant="secondary">
                  <SquareMousePointerIcon />
                  <span>Pick</span>
                </Badge>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <ToggleGroup
                className="flex flex-wrap justify-between"
                onValueChange={(value) => value && setAvatar(avatars.find(({ name }) => name === value)!)}
                type="single"
                value={avatar.name}
                variant="outline"
              >
                {avatars.map((each) => (
                  <ToggleGroupItem className="size-14 rounded-full p-0" key={each.name} value={each.name}>
                    <Avatar size="lg">
                      <AvatarImage alt={each.name} src={each.svgSrc} />
                    </Avatar>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </PopoverContent>
          </Popover>
        </CardContent>
        <CardFooter>
          <SubmitButton icon={<UserRoundPlusIcon />} text="Register" />
        </CardFooter>
      </Card>
    </form>
  )
}
