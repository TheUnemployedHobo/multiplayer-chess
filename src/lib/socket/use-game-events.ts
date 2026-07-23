import { useEffect, useEffectEvent } from "react"

import type { FnType, GameFinishedPayloadType, MovePayloadType } from "../common-types"

import { socket } from "."

export const useGameMove = (fn: FnType<MovePayloadType>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("game:move", listener)

    return () => {
      socket.off("game:move", listener)
    }
  }, [])

  return (movement: MovePayloadType) => socket.emit("game:move", movement)
}

export const useOnGameFinish = (fn: FnType<GameFinishedPayloadType>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("game:finished", listener)

    return () => {
      socket.off("game:finished", listener)
    }
  }, [])
}

export const useGameResign = (fn: FnType<GameFinishedPayloadType>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("game:resign", listener)

    return () => {
      socket.off("game:resign", listener)
    }
  }, [])

  return () => socket.emit("game:resign", undefined)
}

export const useGameDrawOffer = (fn: FnType<{ message: string; offerRole: "offeree" | "offeror" }>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("game:draw-offer", listener)

    return () => {
      socket.off("game:draw-offer", listener)
    }
  }, [])

  return () => socket.emit("game:draw-offer", undefined)
}

export const useGameDrawOfferDecline = (fn: FnType<string>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("game:draw-offer:decline", listener)

    return () => {
      socket.off("game:draw-offer:decline", listener)
    }
  }, [])

  return () => socket.emit("game:draw-offer:decline", undefined)
}

export const useGameDrawOfferAccept = (fn: FnType<undefined>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("game:draw-offer:accept", listener)

    return () => {
      socket.off("game:draw-offer:accept", listener)
    }
  }, [])

  return () => socket.emit("game:draw-offer:accept", undefined)
}

export const useGameChat = (fn: FnType<{ color: "black" | "white"; message: string }>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("game:chat", listener)

    return () => {
      socket.off("game:chat", listener)
    }
  }, [])

  return (message: string) => socket.emit("game:chat", message)
}
