import { useEffect, useEffectEvent } from "react"

import type { OpponentInfoType } from "@/hooks/use-chess-store"

import { type FnType, socket } from ".."

export const useMatchJoin = (fn: FnType<OpponentInfoType>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("matchmaking:join", listener)

    return () => {
      socket.off("matchmaking:join", listener)
    }
  }, [])

  return () => socket.emit("matchmaking:join", undefined)
}

export const useMatchLeave = (fn: FnType<undefined>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("matchmaking:leave", listener)

    return () => {
      socket.off("matchmaking:leave", listener)
    }
  }, [])

  return () => socket.emit("matchmaking:leave", undefined)
}
