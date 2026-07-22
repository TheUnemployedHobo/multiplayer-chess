import { useEffect, useEffectEvent } from "react"

import useAuthStore from "@/hooks/use-auth-store"

import { type FnType, socket } from ".."

type UserInfoType = { avatar: string; elo: number; userId: string; username: string }

export const useFriendRequests = (fn: FnType<UserInfoType>) => {
  const user = useAuthStore((state) => state.user)
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("friend:incoming-request", listener)

    return () => {
      socket.off("friend:incoming-request", listener)
    }
  }, [])

  return (friendId: string) => {
    if (!user) return

    socket.emit("friend:incoming-request", {
      avatar: user.avatar,
      friendId,
      username: user.username,
    })
  }
}

export const useAcceptFriendRequest = (fn: FnType<string>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("friend:accept-request", listener)

    return () => {
      socket.off("friend:accept-request", listener)
    }
  }, [])

  return (friendId: string) => socket.emit("friend:accept-request", friendId)
}

export const useFriendPresence = (fn: FnType<{ status: "online" | "playing" | undefined; userId: string }>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("friend:status", listener)

    return () => {
      socket.off("friend:status", listener)
    }
  }, [])
}

export const useFriendRemoval = (fn: FnType<undefined>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("friend:unfriend", listener)

    return () => {
      socket.off("friend:unfriend", listener)
    }
  }, [])

  return (friendId: string) => socket.emit("friend:unfriend", friendId)
}

export const useFriendInviteToGame = (
  fn: FnType<
    | { payload: string; role: "inviter" }
    | { payload: { avatar: string; description: string; id: string; username: string }; role: "invitee" }
  >,
) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("friend:invite-to-game", listener)

    return () => {
      socket.off("friend:invite-to-game", listener)
    }
  }, [])

  return (payload: { invitee: { id: string; username: string }; inviter: { avatar: string; username: string } }) =>
    socket.emit("friend:invite-to-game", payload)
}
