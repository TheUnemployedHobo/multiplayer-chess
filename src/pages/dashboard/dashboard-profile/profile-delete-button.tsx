import { Trash2Icon } from "lucide-react"
import { toast } from "sonner"
import { useLocation } from "wouter"

import { ShadcnAlertDialog } from "@/components/shadcn-dialogs"
import { Button } from "@/components/ui/button"
import useAuthStore from "@/hooks/use-auth-store"
import { deleteUser } from "@/lib/services"

export default function ProfileDeleteButton() {
  const clear = useAuthStore((state) => state.clear)
  const [, setLocation] = useLocation()

  const handleDeleteAcc = async () => {
    const response = await deleteUser()

    if (!response) {
      toast.error("Delete failed", { description: "Unable to delete your account. Please try again later." })
      return
    }

    toast.success("Account deleted", { description: "Your account has been removed successfully." })
    clear("noDirection")
    setLocation("/entrance", { replace: true })
  }

  return (
    <ShadcnAlertDialog
      action={{ onClick: handleDeleteAcc, text: "Delete" }}
      description="This action will permanently remove your account and all associated data. You cannot undo this."
      title="Delete your account"
      triggerButton={
        <Button className="w-full" size="lg" type="button" variant="destructive">
          <Trash2Icon />
          <span>Delete account</span>
        </Button>
      }
    />
  )
}
