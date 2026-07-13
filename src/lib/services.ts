import { authFetch } from "./utils"

export type FriendType = {
  avatar: string
  id: string
  signup_date: string
  stats: StatsType
  status: "online" | "playing" | undefined
  username: string
}

export type UserType = {
  avatar: string
  jwt: string | undefined
  signup_date: string
  stats: StatsType
  username: string
}

type AllUsersType = { avatar: string; id: string; signup_date: string; username: string }

type StatsType = { elo: number; games: number; losses: number; wins: number }

const SERVER_URL = import.meta.env["VITE_SERVER_URL"]

export const register = (username: string, password: string, avatar: string, elo: number) =>
  fetch(`${SERVER_URL}/users/register`, {
    body: JSON.stringify({ avatar, elo, password, username }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })

export const logIn = (username: string, password: string) =>
  fetch(`${SERVER_URL}/users/login`, {
    body: JSON.stringify({ password, username }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })

export const updateUserInfo = (username: string, password: string, avatar: string) =>
  authFetch(`${SERVER_URL}/users`, {
    body: JSON.stringify({ avatar, password, username }),
    headers: { "Content-Type": "application/json" },
    method: "PUT",
  })

export const deleteUser = () => authFetch(`${SERVER_URL}/users`, { method: "DELETE" })

export const getCurrentUser = async () => {
  const response = await authFetch(`${SERVER_URL}/users/me`)
  if (!response) return null

  return response.json() as Promise<UserType>
}

export const getAllUsers = async () => {
  const response = await authFetch(`${SERVER_URL}/users/all`)
  if (!response) return null

  return response.json() as Promise<AllUsersType[]>
}

export const getFriends = async () => {
  const response = await authFetch(`${SERVER_URL}/friends`)
  if (!response) return null

  return response.json() as Promise<FriendType[]>
}
