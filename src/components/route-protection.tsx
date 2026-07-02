import type { ComponentType } from "react"

import { Redirect, Route, type RouteProps } from "wouter"

import { isAuthenticated } from "@/lib/utils"

export function ProtectedRoute({ component, ...rest }: RouteProps) {
  const Component = component as ComponentType<unknown>

  return <Route {...rest}>{isAuthenticated() ? <Component /> : <Redirect replace to="/entrance" />}</Route>
}

export function PublicOnlyRoute({ component, ...rest }: RouteProps) {
  const Component = component as ComponentType<unknown>

  return <Route {...rest}>{!isAuthenticated() ? <Component /> : <Redirect replace to="/dashboard" />}</Route>
}
