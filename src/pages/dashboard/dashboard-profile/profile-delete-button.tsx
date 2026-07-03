import { Trash2Icon } from "lucide-react"
import { toast } from "sonner"
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
import { deleteUser } from "@/lib/services"

export default function ProfileDeleteButton() {
  const { clear } = useAuthStore()
  const [, setLocation] = useLocation()

  const handleDeletion = async () => {
    const response = await deleteUser()

    if (!response) {
      toast.error("Delete failed", { description: "Unable to delete your account. Please try again later." })
      return
    }

    toast.success("Account deleted", { description: "Your account has been removed successfully." })
    clear("noDirection")
    setLocation("/entrance")
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full" size="lg" type="button" variant="destructive">
          <Trash2Icon />
          <span>Delete account</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete your account</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently remove your account and all associated data. You cannot undo this.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeletion} variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
