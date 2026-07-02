import type { PropsWithChildren } from "react"

import { Redirect } from "wouter"

type PropsType = PropsWithChildren & { isAuthenticated: boolean }

export function DefaultPage({ isAuthenticated }: Omit<PropsType, "children">) {
  return <Redirect replace to={isAuthenticated ? "/dashboard" : "/entrance"} />
}

export function ProtectedPage({ children, isAuthenticated }: PropsType) {
  return isAuthenticated ? children : <Redirect replace to="/entrance" />
}

export function PublicOnlyPage({ children, isAuthenticated }: PropsType) {
  return !isAuthenticated ? children : <Redirect replace to="/dashboard" />
}
