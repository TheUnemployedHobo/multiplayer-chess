import { useEffect, useState } from "react"

import { socket } from "./socket"

export const useOnlineUsers = () => {
  const [onlineCount, setOnlineCount] = useState(0)

  useEffect(() => {
    socket.on("users:online-count", setOnlineCount)

    return () => {
      socket.off("users:online-count", setOnlineCount)
    }
  }, [])

  return onlineCount
}
