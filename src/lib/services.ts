import type { AvatarNameType } from "./avatars"

import { authFetch } from "./utils"

export type UserType = {
  avatar: AvatarNameType
  jwt: string | undefined
  signup_date: string
  stats: { elo: number; games: number; losses: number; wins: number }
  username: string
}

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

export const updateUserInfo = (username: string, password: string, avatar: AvatarNameType) =>
  authFetch(`${BASE_URL}/users`, {
    body: JSON.stringify({ avatar, password, username }),
    headers: { "Content-Type": "application/json" },
    method: "PUT",
  })

export const deleteUser = () => authFetch(`${BASE_URL}/users`, { method: "DELETE" })

export const getCurrentUser = async () => {
  const response = await authFetch(`${BASE_URL}/users`)
  if (!response) return null

  return response.json() as Promise<UserType>
}
