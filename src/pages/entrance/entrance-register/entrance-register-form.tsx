import type { SubmitEvent } from "react"

import { FormIcon, UserRoundPlusIcon } from "lucide-react"
import { toast } from "sonner"
import { Link } from "wouter"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type PropsType = { handleFn: (username: string, password: string) => void }

export default function EntranceRegisterForm({ handleFn }: PropsType) {
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)

    const username = data.get("username") as string
    const password = data.get("password") as string
    const repass = data.get("re-pass") as string

    if (password === repass) handleFn(username, password)
    else toast.error("Passwords do not match", { description: "Please re-enter the same password in both fields." })
  }

  return (
    <form className="flex h-dvh items-center justify-center" onSubmit={handleSubmit}>
      <Card className="z-10 mx-5 w-96">
        <CardHeader>
          <CardTitle>
            <Badge className="size-8 rounded-full p-0" variant="secondary">
              <FormIcon />
            </Badge>
            <span className="ml-2">Register</span>
          </CardTitle>
          <CardDescription>Fill in the form below to get started</CardDescription>
          <CardAction>
            <Link to="/entrance/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="un">Username</Label>
            <Input
              id="un"
              name="username"
              pattern="^[a-z]{3,20}$"
              placeholder="e.g. admin"
              required
              title="Lowercase letters only (3-20 chars)"
              type="text"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pw">Password</Label>
            <Input
              id="pw"
              minLength={3}
              name="password"
              placeholder="e.g. 1234"
              required
              title="Password must be at least 3 characters"
              type="password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="re-pw">Repeat password</Label>
            <Input id="re-pw" name="re-pass" placeholder="e.g. 1234" required type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="grow" size="lg" type="submit">
            <UserRoundPlusIcon />
            <span>Register</span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
