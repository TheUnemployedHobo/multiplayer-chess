import { type ClassValue, clsx } from "clsx"
import Cookies from "js-cookie"
import { twMerge } from "tailwind-merge"

import useAuthStore from "@/hooks/use-auth-store"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const formatDate = (date: Date | string) =>
  new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

export const jwtCookie = {
  get: () => Cookies.get("jwt") ?? null,
  remove: () => Cookies.remove("jwt"),
  set: (token: string) => Cookies.set("jwt", token, { expires: 30 }),
}

export const authFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  try {
    const { clear } = useAuthStore.getState()
    const jwt = jwtCookie.get()

    if (!jwt) {
      clear()
      return null
    }

    const response = await fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        authorization: jwt,
      },
    })

    if (response.status === 401) {
      clear()
      return null
    }

    return response
  } catch {
    return null
  }
}
