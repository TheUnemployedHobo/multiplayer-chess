import { LogOutIcon } from "lucide-react"
import { useLocation } from "wouter"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import useAuthStore from "@/hooks/use-auth-store"
import useBreakPoint from "@/hooks/use-break-point"

export default function ProfileLogoutButton() {
  const { clear } = useAuthStore()
  const [, setLocation] = useLocation()
  const { md } = useBreakPoint()

  const handleLogout = () => {
    clear("noDirection")
    setLocation("/entrance")
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={md ? "default" : "icon-lg"} variant="destructive">
          <LogOutIcon />
          {md && <span>Logout</span>}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm logout</AlertDialogTitle>
          <AlertDialogDescription>
            Logging out will end your session and return you to the login page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} variant="destructive">
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
