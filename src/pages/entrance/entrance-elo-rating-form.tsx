import { FormIcon, UserRoundPlusIcon } from "lucide-react"

import SubmitButton from "@/components/submit-button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import type { EntranceFormPropsType } from "."

export default function EntranceEloRatingForm({ handleAction }: Omit<EntranceFormPropsType, "setPage">) {
  return (
    <form action={handleAction} className="flex h-dvh items-center justify-center">
      <Card className="z-10 mx-5 w-96">
        <CardHeader>
          <CardTitle>
            <Badge className="size-8 rounded-full p-0" variant="secondary">
              <FormIcon />
            </Badge>
            <span className="ml-2">Log In</span>
          </CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5"></CardContent>
        <CardFooter>
          <SubmitButton icon={<UserRoundPlusIcon />} text="Register" />
        </CardFooter>
      </Card>
    </form>
  )
}
