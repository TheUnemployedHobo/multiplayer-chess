import { useEffect, useEffectEvent, useState } from "react"

import useAuthStore from "@/hooks/use-auth-store"
import { socket } from "@/lib/socket"

type UserInfoType = { avatar: string; elo: number; userId: string; username: string }

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

export const useFriendRequests = (fn: (userInfo: UserInfoType) => void) => {
  const listener = useEffectEvent(fn)
  const { user } = useAuthStore()

  useEffect(() => {
    socket.on("friends:incoming-request", listener)

    return () => {
      socket.off("friends:incoming-request", listener)
    }
  }, [])

  return (friendId: string) => {
    if (!user) return

    socket.emit("friends:incoming-request", {
      avatar: user.avatar,
      friendId,
      username: user.username,
    })
  }
}

export const useAcceptFriendRequest = (fn: (message: string) => void) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("friends:accept-request", listener)

    return () => {
      socket.off("friends:accept-request", listener)
    }
  }, [])

  return (friendId: string) => socket.emit("friends:accept-request", friendId)
}
