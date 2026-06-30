import { useState } from "react"

import EntranceAvatarPage from "./entrance-register-avatar"
import EntranceRegisterForm from "./entrance-register-form"

export default function EntranceRegisterPage() {
  const [info, setInfo] = useState({ password: "", username: "" })
  const [page, setPage] = useState<1 | 2>(1)

  const handlePageOneSubmit = (username: string, password: string) => {
    setInfo({ password, username })
    setPage(2)
  }

  const handlePageTwoSubmit = (avatar: string) => {
    console.log(info)
    console.log(avatar)
  }

  if (page === 1) return <EntranceRegisterForm handleFn={handlePageOneSubmit} />
  if (page === 2) return <EntranceAvatarPage handleFn={handlePageTwoSubmit} />
}
