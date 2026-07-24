import { useEffect, useEffectEvent } from "react"

import type { FnType, GameFinishedPayloadType, MovePayloadType } from "../common-types"

import { socket } from "."

export const useMpGameMove = (fn: FnType<MovePayloadType>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("game:move", listener)

    return () => {
      socket.off("game:move", listener)
    }
  }, [])

  return (movement: MovePayloadType) => socket.emit("game:move", movement)
}

export const useOnMpGameFinish = (fn: FnType<GameFinishedPayloadType>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("game:finish", listener)

    return () => {
      socket.off("game:finish", listener)
    }
  }, [])
}

export const useMpGameDrawOffer = (fn: FnType<{ message: string; role: "offeree" | "offeror" }>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("game:draw-offer", listener)

    return () => {
      socket.off("game:draw-offer", listener)
    }
  }, [])

  return () => socket.emit("game:draw-offer", undefined)
}

export const useMpGameDrawOfferDecline = (fn: FnType<string>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("game:draw-offer:decline", listener)

    return () => {
      socket.off("game:draw-offer:decline", listener)
    }
  }, [])

  return () => socket.emit("game:draw-offer:decline", undefined)
}

export const useMpGameChat = (fn: FnType<{ color: "black" | "white"; message: string }>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("game:chat", listener)

    return () => {
      socket.off("game:chat", listener)
    }
  }, [])

  return (message: string) => socket.emit("game:chat", message)
}

export const resignMpGame = () => socket.emit("game:resign", undefined)
export const acceptDrawOffer = () => socket.emit("game:draw-offer:accept", undefined)
