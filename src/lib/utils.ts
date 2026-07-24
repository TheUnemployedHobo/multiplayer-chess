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

    if (!response.ok) {
      if (response.status === 401) clear()
      return null
    }

    return response
  } catch {
    return null
  }
}

export const timeAgo = (date: Date | string) => {
  const ms = new Date(date).getTime() - Date.now()
  if (Number.isNaN(ms)) return "Invalid date"

  const divisions: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
    { amount: 60, unit: "second" },
    { amount: 60, unit: "minute" },
    { amount: 24, unit: "hour" },
    { amount: 7, unit: "day" },
    { amount: 4.34524, unit: "week" },
    { amount: 12, unit: "month" },
    { amount: Infinity, unit: "year" },
  ]

  let duration = ms / 1000

  const matched = divisions.find(({ amount }) => {
    if (Math.abs(duration) < amount) return true
    duration /= amount
    return false
  })

  return matched
    ? new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(Math.round(duration), matched.unit)
    : "Just now"
}
