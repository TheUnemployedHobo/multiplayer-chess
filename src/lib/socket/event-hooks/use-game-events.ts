import { useEffect, useEffectEvent } from "react"

import { type FnType, socket } from ".."

type GameFinishedPayload = { result: string; winner: "Black" | "White" | null }
type MovePayload = { from: string; promotion?: string; to: string }

export const useGameMove = (fn: FnType<MovePayload>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("game:move", listener)

    return () => {
      socket.off("game:move", listener)
    }
  }, [])

  return (movement: MovePayload) => socket.emit("game:move", movement)
}

export const useOnGameFinish = (fn: FnType<GameFinishedPayload>) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("game:finished", listener)

    return () => {
      socket.off("game:finished", listener)
    }
  }, [])
}

export const useGameResign = (fn: FnType<GameFinishedPayload>) => {
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
