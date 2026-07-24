import { useEffect, useEffectEvent } from "react"

import type { FnType, GameFinishedPayloadType, MovePayloadType } from "../common-types"

import { socket } from "."

export const useBotGameStart = (fn: FnType<undefined>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("bot:start", listener)

    return () => {
      socket.off("bot:start", listener)
    }
  }, [])

  return (skill: number) => socket.emit("bot:start", skill)
}

export const useBotGameMove = (fn: FnType<MovePayloadType>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("bot:move", listener)

    return () => {
      socket.off("bot:move", listener)
    }
  }, [])

  return (movement: MovePayloadType) => socket.emit("bot:move", movement)
}

export const useOnBotGameFinish = (fn: FnType<GameFinishedPayloadType>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("bot:finish", listener)

    return () => {
      socket.off("bot:finish", listener)
    }
  }, [])
}

export const useBotGameUndo = (fn: FnType<undefined>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("bot:undo", listener)

    return () => {
      socket.off("bot:undo", listener)
    }
  }, [])

  return () => socket.emit("bot:undo", undefined)
}

export const resignBotGame = () => socket.emit("bot:resign", undefined)
