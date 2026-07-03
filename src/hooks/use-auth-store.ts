import { create } from "zustand/react"

import { getCurrentUser, type UserType } from "@/lib/services"
import { jwtCookie } from "@/lib/utils"

type AuthStoreType = {
  authenticate: (user: UserType) => void
  clear: (directMode?: "native" | "noDirection") => void
  hydrate: () => Promise<void>
  status: "authenticated" | "loading" | "unauthenticated"
  user: null | UserType
}

const useAuthStore = create<AuthStoreType>((set) => ({
  authenticate: (user) => {
    jwtCookie.set(user.jwt!)
    set({ status: "authenticated", user })
  },
  clear: (directMode = "native") => {
    jwtCookie.remove()
    set({ status: "unauthenticated", user: null })

    if (directMode === "native") {
      history.pushState(null, "", "/entrance")
      dispatchEvent(new PopStateEvent("popstate"))
    }
  },
  hydrate: async () => {
    try {
      const user = await getCurrentUser()

      if (!user) {
        set({ status: "unauthenticated", user: null })
        return
      }

      set({ status: "authenticated", user })
    } catch {
      jwtCookie.remove()
      set({ status: "unauthenticated", user: null })
    }
  },
  status: "loading",
  user: null,
}))

export default useAuthStore
