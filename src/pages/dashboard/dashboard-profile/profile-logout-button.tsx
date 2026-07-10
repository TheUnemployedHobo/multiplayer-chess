import { LogOutIcon } from "lucide-react"
import { useLocation } from "wouter"

import { ShadcnAlertDialog } from "@/components/shadcn-dialogs"
import { Button } from "@/components/ui/button"
import useAuthStore from "@/hooks/use-auth-store"
import useBreakPoint from "@/hooks/use-break-point"

export default function ProfileLogoutButton() {
  const clear = useAuthStore((state) => state.clear)
  const [, setLocation] = useLocation()
  const { md } = useBreakPoint()

  const handleLogout = () => {
    clear("noDirection")
    setLocation("/entrance")
  }

  return (
    <ShadcnAlertDialog
      action={{ onClick: handleLogout, text: "Logout" }}
      description="Logging out will end your session and return you to the login page."
      title="Confirm logout"
      triggerButton={
        <Button size={md ? "default" : "icon-lg"} variant="destructive">
          <LogOutIcon />
          {md && <span>Logout</span>}
        </Button>
      }
    />
  )
}
