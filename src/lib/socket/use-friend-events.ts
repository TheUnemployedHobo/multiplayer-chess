import { useEffect, useEffectEvent } from "react"

import useAuthStore from "@/hooks/use-auth-store"

import type { FnType, StatusType } from "../common-types"

import { socket } from "."

export const useFriendRequests = (
  fn: FnType<
    | { payload: { avatar: string; id: string; message: string; username: string }; role: "requestee" }
    | { payload: { message: string }; role: "requestor" }
  >,
) => {
  const { avatar, username } = useAuthStore((s) => s.user)!
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("friend:request", listener)

    return () => {
      socket.off("friend:request", listener)
    }
  }, [])

  return (partyB: { id: string; username: string }) =>
    socket.emit("friend:request", { partyA: { avatar, username }, partyB })
}

export const useAcceptFriendRequest = (fn: FnType<string>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("friend:request:accept", listener)

    return () => {
      socket.off("friend:request:accept", listener)
    }
  }, [])

  return (friendId: string) => socket.emit("friend:request:accept", friendId)
}

export const useFriendPresence = (fn: FnType<StatusType & { userId: string }>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("friend:status", listener)

    return () => {
      socket.off("friend:status", listener)
    }
  }, [])
}

export const useFriendRemoval = (fn: FnType<string | undefined>) => {
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
    | { payload: { avatar: string; id: string; message: string; username: string }; role: "invitee" }
  >,
) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("friend:invite", listener)

    return () => {
      socket.off("friend:invite", listener)
    }
  }, [])

  return (payload: { partyA: { avatar: string; username: string }; partyB: { id: string; username: string } }) =>
    socket.emit("friend:invite", payload)
}

export const acceptInvite = (friendId: string) => socket.emit("friend:invite:accept", friendId)
