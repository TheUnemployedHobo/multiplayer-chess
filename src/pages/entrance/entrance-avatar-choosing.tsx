import { ArrowBigLeftIcon, LogInIcon, SquareMousePointerIcon } from "lucide-react"
import { motion } from "motion/react"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import avatars from "@/lib/avatars"

export default function EntranceAvatarChoosing() {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="flex h-dvh items-center justify-center"
      initial={{ opacity: 0, y: 50 }}
    >
      <Card className="z-10 w-96">
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
                <AvatarImage alt="@shadcn" className="size-full" src="https://github.com/shadcn.png" />
                <Badge className="absolute -right-3 -bottom-1" variant="secondary">
                  <SquareMousePointerIcon />
                  Pick
                </Badge>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <ToggleGroup className="flex flex-wrap justify-between" type="single" variant="outline">
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
        </CardContent>
        <CardFooter className="gap-x-3">
          <Button className="grow" size="lg" type="submit" variant="secondary">
            <ArrowBigLeftIcon />
            Back
          </Button>
          <Button className="grow" size="lg" type="submit" variant="default">
            <LogInIcon />
            Enter
          </Button>
        </CardFooter>
      </Card>
    </motion.section>
  )
}
