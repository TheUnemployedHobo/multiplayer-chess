import { FormIcon, StepForwardIcon } from "lucide-react"
import { toast } from "sonner"

import SubmitButton from "@/components/submit-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useEntranceStore from "@/hooks/use-entrance-store"

export default function EntranceRegisterForm() {
  const setInfo = useEntranceStore((state) => state.setInfo)
  const setPage = useEntranceStore((state) => state.setPage)

  const handleAction = async (formData: FormData) => {
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const repass = formData.get("re-pass") as string

    if (password !== repass) {
      toast.error("Passwords do not match", { description: "Please re-enter the same password in both fields." })
      return
    }

    setInfo({ password, username })
    setPage(3)
  }

  return (
    <form action={handleAction} className="flex h-dvh items-center justify-center">
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
            <Button onClick={() => setPage(1)} type="button" variant="ghost">
              Log In
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="un">Username</Label>
            <Input
              autoComplete="username"
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
              autoComplete="current-password"
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
            <Input
              autoComplete="current-password"
              id="re-pw"
              name="re-pass"
              placeholder="e.g. 1234"
              required
              type="password"
            />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton icon={<StepForwardIcon />} text="Continue" />
        </CardFooter>
      </Card>
    </form>
  )
}
