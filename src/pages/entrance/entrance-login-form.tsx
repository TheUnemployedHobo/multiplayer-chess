import { FormIcon, LogInIcon } from "lucide-react"

import SubmitButton from "@/components/submit-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import type { EntranceFormPropsType } from "."

export default function EntranceLogInPage({ handleAction, setPage }: EntranceFormPropsType) {
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
          <CardAction>
            <Button onClick={() => setPage(2)} variant="ghost">
              Register
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="un">Username</Label>
            <Input id="un" name="username" placeholder="e.g. admin" required type="text" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pw">Password</Label>
            <Input id="pw" name="password" placeholder="e.g. 1234" required type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton icon={<LogInIcon />} text="Enter" />
        </CardFooter>
      </Card>
    </form>
  )
}
