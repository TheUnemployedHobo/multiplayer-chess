import type { CSSProperties } from "react"

import { type Chess, SQUARES } from "chess.js"
import { type ClassValue, clsx } from "clsx"
import Cookies from "js-cookie"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const getCheckStyle = (chess: Chess): Record<string, CSSProperties> => {
  if (!chess.isCheck()) return {}

  const checkedColor = chess.turn()

  const kingSquare = SQUARES.find(
    (square) => chess.get(square)?.type === "k" && chess.get(square)?.color === checkedColor,
  )

  if (!kingSquare) return {}

  return { [kingSquare]: { background: "rgba(255, 0, 0, 0.5)" } }
}

export const jwtCookie = {
  get: () => Cookies.get("jwt") ?? null,
  remove: () => Cookies.remove("jwt"),
  set: (token: string) => Cookies.set("jwt", token, { expires: 30 }),
}

export const nativeRedirect = (path: string) => {
  history.pushState(null, "", path)
  dispatchEvent(new PopStateEvent("popstate"))
}

export const authFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const jwt = jwtCookie.get()
  if (!jwt) {
    nativeRedirect("/entrance")
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
    jwtCookie.remove()
    nativeRedirect("/entrance")
    return null
  }

  return response
}
