import { type Dispatch, type SetStateAction, useState } from "react"
import { toast } from "sonner"
import { useLocation } from "wouter"

import { logIn, register } from "@/lib/services"

import EntranceAvatarForm from "./entrance-avatar-form"
import EntranceLogInForm from "./entrance-login-form"
import EntranceRegisterForm from "./entrance-register-form"

export type EntranceFormPropsType = {
  handleAction: (formData: FormData) => Promise<void> | void
  setPage: Dispatch<SetStateAction<1 | 2 | 3>>
}

export default function EntrancePage() {
  const [info, setInfo] = useState({ password: "", username: "" })
  const [page, setPage] = useState<1 | 2 | 3>(1)
  const [, setLocation] = useLocation()

  const handlePageOneAction = async (formData: FormData) => {
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    const token = await logIn(username, password)

    if (token) {
      setLocation("/dashboard")
      toast.success("Login successful", { description: "Welcome back!" })
    } else toast.error("Login failed", { description: "Please check your username and password and try again." })
  }

  const handlePageTwoAction = (formData: FormData) => {
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const repass = formData.get("re-pass") as string

    if (password === repass) {
      setInfo({ password, username })
      setPage(2)
    } else toast.error("Passwords do not match", { description: "Please re-enter the same password in both fields." })
  }

  const handlePageThreeAction = async (formData: FormData) => {
    if (await register(info.username, info.password, formData.get("avatar") as string)) {
      setLocation("/entrance/login")
      toast.success("Account created successfully", { description: "You can now log in with your credentials." })
    } else toast.error("Registration failed", { description: "Please try again in a moment." })
  }

  if (page === 1) return <EntranceLogInForm handleAction={handlePageOneAction} setPage={setPage} />
  if (page === 2) return <EntranceRegisterForm handleAction={handlePageTwoAction} setPage={setPage} />
  if (page === 3) return <EntranceAvatarForm handleAction={handlePageThreeAction} />
}
