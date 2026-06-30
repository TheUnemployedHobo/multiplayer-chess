import { LogInIcon, SquareMousePointerIcon } from "lucide-react"
import { useState } from "react"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import avatars from "@/lib/avatars"

type PropsType = { handleFn: (avatar: string) => void }

export default function EntranceAvatarPage({ handleFn }: PropsType) {
  const [avatar, setAvatar] = useState(avatars.at(0)!)

  const handleEnter = () => handleFn(avatar.name)

  return (
    <section className="flex h-dvh items-center justify-center">
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
          <Button className="grow" onClick={handleEnter} size="lg">
            <LogInIcon />
            <span>Enter</span>
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}
