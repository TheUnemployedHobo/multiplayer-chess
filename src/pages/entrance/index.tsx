import { type Dispatch, type SetStateAction, useState } from "react"
import { toast } from "sonner"
import { useLocation } from "wouter"

import { logIn, register } from "@/lib/services"
import { jwtCookie } from "@/lib/utils"

import EntranceAvatarForm from "./entrance-avatar-form"
import EntranceEloRatingForm from "./entrance-elo-rating-form"
import EntranceLogInForm from "./entrance-login-form"
import EntranceRegisterForm from "./entrance-register-form"

export type EntranceFormPropsType = {
  handleAction: (formData: FormData) => Promise<void> | void
  setPage: Dispatch<SetStateAction<1 | 2 | 3 | 4>>
}

export default function EntrancePage() {
  const [info, setInfo] = useState({ avatar: "", password: "", username: "" })
  const [page, setPage] = useState<1 | 2 | 3 | 4>(1)
  const [, setLocation] = useLocation()

  const handleFirstFormAction = async (formData: FormData) => {
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    const response = await logIn(username, password)

    if (response.status === 200) {
      const token = await response.text()
      jwtCookie.set(token)
      setLocation("/dashboard")
      toast.success("Login successful", { description: "Welcome back!" })
    } else if (response.status === 401) toast.error("Login failed", { description: "Invalid username or password." })
    else toast.error("Login failed", { description: "An error occurred during login. Please try again." })
  }

  const handleSecondFormAction = (formData: FormData) => {
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const repass = formData.get("re-pass") as string

    if (password === repass) {
      setInfo({ avatar: "", password, username })
      setPage(3)
    } else toast.error("Passwords do not match", { description: "Please re-enter the same password in both fields." })
  }

  const handleThirdFormAction = (formData: FormData) => {
    setInfo((p) => ({ ...p, avatar: formData.get("avatar") as string }))
    setPage(4)
  }

  const handleFourthFormAction = async (formData: FormData) => {
    const elo = formData.get("elo") as string
    const response = await register(info.username, info.password, info.avatar, +elo)

    if (response.status === 201) {
      setPage(1)
      toast.success("Account created successfully", { description: "You can now log in with your credentials." })
    } else if (response.status === 409) toast.error("Registration failed", { description: "Username already exists." })
    else toast.error("Registration failed", { description: "An error occurred during registration. Please try again." })
  }

  if (page === 1) return <EntranceLogInForm handleAction={handleFirstFormAction} setPage={setPage} />
  if (page === 2) return <EntranceRegisterForm handleAction={handleSecondFormAction} setPage={setPage} />
  if (page === 3) return <EntranceAvatarForm handleAction={handleThirdFormAction} setPage={setPage} />
  if (page === 4) return <EntranceEloRatingForm handleAction={handleFourthFormAction} setPage={setPage} />
}
