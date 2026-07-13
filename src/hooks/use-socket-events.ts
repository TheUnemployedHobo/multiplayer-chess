import { useEffect, useEffectEvent, useState } from "react"

import useAuthStore from "@/hooks/use-auth-store"
import { socket } from "@/lib/socket"

type FnType<T> = (data: T) => Promise<void> | void

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

export const useFriendRequests = (fn: FnType<UserInfoType>) => {
  const user = useAuthStore((state) => state.user)
  const listener = useEffectEvent(fn)

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

export const useAcceptFriendRequest = (fn: FnType<string>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("friends:accept-request", listener)

    return () => {
      socket.off("friends:accept-request", listener)
    }
  }, [])

  return (friendId: string) => socket.emit("friends:accept-request", friendId)
}

export const useFriendPresence = (fn: FnType<{ status: "online" | "playing" | undefined; userId: string }>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("friends:status", listener)

    return () => {
      socket.off("friends:status", listener)
    }
  }, [])
}
