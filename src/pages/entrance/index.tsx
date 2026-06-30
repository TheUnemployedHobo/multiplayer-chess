import Cookie from "js-cookie"
import { type Dispatch, type SetStateAction, useState } from "react"
import { toast } from "sonner"
import { useLocation } from "wouter"

import { logIn, register } from "@/lib/services"

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

  const handleFormOneAction = async (formData: FormData) => {
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    const token = await logIn(username, password)
    if (token) {
      setLocation("/dashboard")
      Cookie.set("jwt", token, { expires: 30 })
      toast.success("Login successful", { description: "Welcome back!" })
    } else toast.error("Login failed", { description: "Please check your username and password and try again." })
  }

  const handleFormTwoAction = (formData: FormData) => {
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const repass = formData.get("re-pass") as string

    if (password === repass) {
      setInfo({ avatar: "", password, username })
      setPage(3)
    } else toast.error("Passwords do not match", { description: "Please re-enter the same password in both fields." })
  }

  const handleFormThreeAction = (formData: FormData) => {
    setInfo((p) => ({ ...p, avatar: formData.get("avatar") as string }))
    setPage(4)
  }

  const handleFormFourAction = async (formData: FormData) => {
    const elo = formData.get("elo") as string

    if (await register(info.username, info.password, info.avatar, +elo)) {
      setPage(1)
      toast.success("Account created successfully", { description: "You can now log in with your credentials." })
    } else toast.error("Registration failed", { description: "Please try again in a moment." })
  }

  if (page === 1) return <EntranceLogInForm handleAction={handleFormOneAction} setPage={setPage} />
  if (page === 2) return <EntranceRegisterForm handleAction={handleFormTwoAction} setPage={setPage} />
  if (page === 3) return <EntranceAvatarForm handleAction={handleFormThreeAction} />
  if (page === 4) return <EntranceEloRatingForm handleAction={handleFormFourAction} />
}
