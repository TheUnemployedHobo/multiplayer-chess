import useEntranceStore from "@/hooks/use-entrance-store"

import EntranceAvatarForm from "./entrance-avatar-form"
import EntranceEloRatingForm from "./entrance-elo-rating-form"
import EntranceLogInForm from "./entrance-login-form"
import EntranceRegisterForm from "./entrance-register-form"

export default function EntrancePage() {
  const page = useEntranceStore((state) => state.page)

  if (page === 1) return <EntranceLogInForm />
  if (page === 2) return <EntranceRegisterForm />
  if (page === 3) return <EntranceAvatarForm />
  if (page === 4) return <EntranceEloRatingForm />
}
