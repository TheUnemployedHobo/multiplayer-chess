import { io } from "socket.io-client"

import useAuthStore from "@/hooks/use-auth-store"

import { jwtCookie } from "./utils"

export const socket = io(import.meta.env["VITE_SERVER_URL"], {
  autoConnect: false,
  transports: ["websocket"],
})

export const connectSocket = () => {
  const { clear } = useAuthStore.getState()
  const jwt = jwtCookie.get()

  if (!jwt) {
    clear()
    return
  }

  socket.auth = { jwt }
  socket.connect()
}

export const disconnectSocket = () => socket.disconnect()

socket.on("connect_error", (err) => {
  const { clear } = useAuthStore.getState()
  if (err.message === "Unauthorized") clear()
})
