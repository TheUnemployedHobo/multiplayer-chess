import { FormIcon, LogInIcon } from "lucide-react"
import { toast } from "sonner"
import { useLocation } from "wouter"

import type { UserMeType } from "@/lib/common-types"

import SubmitButton from "@/components/submit-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useAuthStore from "@/hooks/use-auth-store"
import useEntranceStore from "@/hooks/use-entrance-store"
import { logIn } from "@/lib/services"

export default function EntranceLogInForm() {
  const authenticate = useAuthStore((state) => state.authenticate)
  const setPage = useEntranceStore((state) => state.setPage)
  const [, setLocation] = useLocation()

  const handleAction = async (formData: FormData) => {
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    const response = await logIn(username, password)

    if (response.status === 200) {
      const user: UserMeType = await response.json()
      authenticate(user)
      setLocation("/dashboard")
      toast.success("Login successful", { description: "Welcome back!" })
    } else if (response.status === 401) toast.error("Login failed", { description: "Invalid username or password." })
    else toast.error("Login failed", { description: "An error occurred during login. Please try again." })
  }

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
            <Button onClick={() => setPage(2)} type="button" variant="ghost">
              Register
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="un">Username</Label>
            <Input autoComplete="username" id="un" name="username" placeholder="e.g. admin" required type="text" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pw">Password</Label>
            <Input
              autoComplete="current-password"
              id="pw"
              name="password"
              placeholder="e.g. 1234"
              required
              type="password"
            />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton icon={<LogInIcon />} text="Enter" />
        </CardFooter>
      </Card>
    </form>
  )
}
