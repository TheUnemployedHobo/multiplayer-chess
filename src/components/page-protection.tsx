import type { ReactNode } from "react"

import { Redirect } from "wouter"

import useAuthStore from "@/hooks/use-auth-store"
import useChessStore from "@/hooks/use-chess-store"

type PropsType = { page: ReactNode }

export function DefaultPage() {
  const status = useAuthStore((state) => state.status)

  return <Redirect replace to={status === "authenticated" ? "/dashboard" : "/entrance"} />
}

export function ProtectedPage({ page }: PropsType) {
  const status = useAuthStore((state) => state.status)

  return status === "authenticated" ? page : <Redirect replace to="/entrance" />
}

export function PublicOnlyPage({ page }: PropsType) {
  const status = useAuthStore((state) => state.status)

  return status === "unauthenticated" ? page : <Redirect replace to="/dashboard" />
}

export function SuperProtectedPage({ page }: PropsType) {
  const status = useAuthStore((state) => state.status)
  const gameMode = useChessStore((state) => state.gameMode)

  return status === "authenticated" && gameMode !== null ? page : <Redirect replace to="/dashboard" />
}
