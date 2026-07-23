import { useEffect, useEffectEvent } from "react"

import type { FnType, GameFinishedPayloadType, MovePayloadType } from "../common-types"

import { socket } from "."

export const useBotSessionStart = (fn: FnType<undefined>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("bot:start", listener)

    return () => {
      socket.off("bot:start", listener)
    }
  }, [])

  return (skill: number) => socket.emit("bot:start", skill)
}

export const useBotSessionMove = (fn: FnType<MovePayloadType>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("bot:move", listener)

    return () => {
      socket.off("bot:move", listener)
    }
  }, [])

  return (movement: MovePayloadType) => socket.emit("bot:move", movement)
}

export const useOnBotSessionFinish = (fn: FnType<GameFinishedPayloadType>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("bot:finish", listener)

    return () => {
      socket.off("bot:finish", listener)
    }
  }, [])
}

export const useBotSessionUndo = (fn: FnType<undefined>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("bot:undo", listener)

    return () => {
      socket.off("bot:undo", listener)
    }
  }, [])

  return () => socket.emit("bot:undo", undefined)
}

export const resignBotSession = () => socket.emit("bot:resign", undefined)
