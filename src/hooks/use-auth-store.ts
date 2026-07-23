import { create } from "zustand/react"

import type { UserMeType } from "@/lib/common-types"

import { getCurrentUser } from "@/lib/services"
import { connectSocket, disconnectSocket } from "@/lib/socket"
import { jwtCookie } from "@/lib/utils"

type StoreType = {
  authenticate: (user: UserMeType) => void
  clear: (directMode?: "native" | "noDirection") => void
  hydrate: () => Promise<void>
  status: "authenticated" | "loading" | "unauthenticated"
  user: null | UserMeType
}

const useAuthStore = create<StoreType>((set) => ({
  authenticate: (user) => {
    jwtCookie.set(user.jwt!)
    connectSocket()
    set({ status: "authenticated", user })
  },
  clear: (directMode = "native") => {
    jwtCookie.remove()
    disconnectSocket()
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
        disconnectSocket()
        return
      }

      connectSocket()
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
