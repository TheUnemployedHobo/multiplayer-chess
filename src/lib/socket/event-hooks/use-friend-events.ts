import { useEffect, useEffectEvent } from "react"

import useAuthStore from "@/hooks/use-auth-store"

import { type FnType, socket } from ".."

type UserInfoType = { avatar: string; elo: number; userId: string; username: string }

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

export const useFriendRemoval = (fn: FnType<undefined>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("friends:unfriend", listener)

    return () => {
      socket.off("friends:unfriend", listener)
    }
  }, [])

  return (friendId: string) => socket.emit("friends:unfriend", friendId)
}
