import { useEffect, useEffectEvent } from "react"

import { type FnType, socket } from ".."

type MovePayload = { from: string; to: string }

export const useBotStart = (fn: FnType<undefined>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("bot:start", listener)

    return () => {
      socket.off("bot:start", listener)
    }
  }, [])

  return (skill: number) => socket.emit("bot:start", skill)
}

export const useBotMove = (fn: FnType<MovePayload>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("bot:move", listener)

    return () => {
      socket.off("bot:move", listener)
    }
  }, [])

  return (movement: MovePayload) => socket.emit("bot:move", movement)
}

export const useOnBotFinished = (fn: FnType<undefined>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("bot:finished", listener)

    return () => {
      socket.off("bot:finished", listener)
    }
  }, [])
}

export const useBotResign = (fn: FnType<undefined>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("bot:resign", listener)

    return () => {
      socket.off("bot:resign", listener)
    }
  }, [])

  return () => socket.emit("bot:resign", undefined)
}
