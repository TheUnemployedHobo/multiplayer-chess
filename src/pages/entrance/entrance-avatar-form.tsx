import { ArrowLeftIcon, SquareMousePointerIcon, StepForwardIcon } from "lucide-react"

import AvatarPopover from "@/components/avatar-popover"
import SubmitButton from "@/components/submit-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import useEntranceStore from "@/hooks/use-entrance-store"

export default function EntranceAvatarForm() {
  const { setInfo, setPage } = useEntranceStore()

  const handleAction = async (formData: FormData) => {
    const avatar = formData.get("avatar") as string

    setInfo({ avatar })
    setPage(4)
  }

  return (
    <form action={handleAction} className="flex h-dvh items-center justify-center">
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
          <AvatarPopover />
        </CardContent>
        <CardFooter className="gap-x-2">
          <Button className="grow" onClick={() => setPage(2)} size="lg" type="button">
            <ArrowLeftIcon />
            <span>Go back</span>
          </Button>
          <SubmitButton icon={<StepForwardIcon />} text="Continue" />
        </CardFooter>
      </Card>
    </form>
  )
}
