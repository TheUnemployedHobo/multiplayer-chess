import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

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
} from "./ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

type AlertDialogPropsType = {
  action: { onClick: () => Promise<void> | void; text: string }
  description: string
  title: string
  triggerButton: ReactNode
}

type DialogPropsType = { content: ReactNode; description?: string; title?: string; triggerButton: ReactNode }

type ModalPropsType = { content: ReactNode; isOpen: boolean; onClose: () => void }

export function ShadcnAlertDialog({ action, description, title, triggerButton }: AlertDialogPropsType) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={action.onClick} variant="destructive">
            {action.text}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function ShadcnDialog({ content, description, title, triggerButton }: DialogPropsType) {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent>
        <DialogHeader className={cn(!title && !description && "sr-only")}>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
}

export function ShadcnModal({ content, isOpen, onClose }: ModalPropsType) {
  return (
    <Dialog onOpenChange={(open) => !open && onClose()} open={isOpen}>
      <DialogContent>
        <DialogHeader className="sr-only">
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
}
