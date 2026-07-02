import { type ComponentPropsWithRef, type ReactNode } from "react"
import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"

import { Button } from "./ui/button"
import { Spinner } from "./ui/spinner"

type PropsType = Omit<ComponentPropsWithRef<typeof Button>, "children" | "disabled" | "size" | "type"> & {
  icon: ReactNode
  text: string
}

export default function SubmitButton({ icon, text, ...props }: PropsType) {
  const { pending } = useFormStatus()

  return (
    <Button className={cn("grow", props.className)} disabled={pending} size="lg" type="submit" {...props}>
      {icon}
      <span>{text}</span>
      {pending && <Spinner />}
    </Button>
  )
}
