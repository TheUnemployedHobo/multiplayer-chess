import type { AvatarNameType } from "./avatars"

import { jwtCookie } from "./utils"

const BASE_URL = import.meta.env.VITE_BASE_URL

export const register = (username: string, password: string, avatar: string, elo: number) =>
  fetch(`${BASE_URL}/users/register`, {
    body: JSON.stringify({ avatar, elo, password, username }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })

export const logIn = (username: string, password: string) =>
  fetch(`${BASE_URL}/users/login`, {
    body: JSON.stringify({ password, username }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })

export const getCurrentUser = async () => {
  const jwt = jwtCookie.get()
  if (!jwt) return null

  const response = await fetch(`${BASE_URL}/users`, { headers: { authorization: jwt } })
  if (response.status === 401) {
    jwtCookie.remove()
    return null
  }

  return response.json() as Promise<{
    avatar: AvatarNameType
    signup_date: string
    stats: { elo: number; games: number; losses: number; wins: number }
    username: string
  }>
}
