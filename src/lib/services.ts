const BASE_URL = "http://localhost:3000"

export const register = async (username: string, password: string, avatar: string, elo: number) =>
  fetch(`${BASE_URL}/users/register`, {
    body: JSON.stringify({ avatar, elo, password, username }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })

export const logIn = async (username: string, password: string) =>
  fetch(`${BASE_URL}/users/login`, {
    body: JSON.stringify({ password, username }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })
