import { FormIcon, LogInIcon } from "lucide-react"
import { type SubmitEvent } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function EntranceEnterPage() {
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form className="flex h-dvh items-center justify-center" onSubmit={handleSubmit}>
      <Card className="z-10 w-96">
        <CardHeader>
          <CardTitle>
            <Badge className="size-8 rounded-full p-0" variant="secondary">
              <FormIcon />
            </Badge>
            <span className="ml-2">Sign In or Create Account</span>
          </CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="un">Username</Label>
            <Input id="un" name="username" placeholder="e.g. admin" type="text" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pw">Password</Label>
            <Input id="pw" name="password" placeholder="e.g. 1234" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="grow" size="lg" type="submit">
            <LogInIcon />
            <span>Enter</span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
