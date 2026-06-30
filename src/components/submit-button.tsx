import { Activity, type ReactNode } from "react"
import { useFormStatus } from "react-dom"

import { Button } from "./ui/button"
import { Spinner } from "./ui/spinner"

type PropsType = { icon: ReactNode; text: string }

export default function SubmitButton({ icon, text }: PropsType) {
  const { pending } = useFormStatus()

  return (
    <Button className="w-full" disabled={pending} size="lg" type="submit">
      {icon}
      <span>{text}</span>
      <Activity mode={pending ? "visible" : "hidden"}>
        <Spinner />
      </Activity>
    </Button>
  )
}
