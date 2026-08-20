import { lazy } from "react"

import useEntranceStore from "@/hooks/use-entrance-store"

const EntranceLogInForm = lazy(() => import("./entrance-login-form"))
const EntranceRegisterForm = lazy(() => import("./entrance-register-form"))
const EntranceAvatarForm = lazy(() => import("./entrance-avatar-form"))
const EntranceEloRatingForm = lazy(() => import("./entrance-elo-rating-form"))

export default function EntrancePage() {
  const page = useEntranceStore((state) => state.page)

  if (page === 1) return <EntranceLogInForm />
  if (page === 2) return <EntranceRegisterForm />
  if (page === 3) return <EntranceAvatarForm />
  if (page === 4) return <EntranceEloRatingForm />
}
