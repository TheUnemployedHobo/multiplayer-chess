export const register = async (username: string, password: string, avatar: string, elo: number) => {
  const response = await fetch("http://localhost:3000/users/register", {
    body: JSON.stringify({ avatar, elo, password, username }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })
  return response.status
}

export const logIn = async (username: string, password: string) => {
  const response = await fetch("http://localhost:3000/users/login", {
    body: JSON.stringify({ password, username }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })
  return response.text()
}
