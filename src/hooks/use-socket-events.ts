import { useEffect, useEffectEvent, useState } from "react"

import useAuthStore from "@/hooks/use-auth-store"
import { socket } from "@/lib/socket"

type UserInfoType = { avatar: string; elo: number; userId: string; username: string }

export const useOnlineUsers = () => {
  const [onlineCount, setOnlineCount] = useState(0)

  useEffect(() => {
    socket.on("users:online-count", setOnlineCount)

    return () => {
      socket.off("users:online-count", setOnlineCount)
    }
  }, [])

  return onlineCount
}

export const useSendFriendRequest = () => {
  const { user } = useAuthStore()

  return (friendId: string) => {
    if (!user) return

    socket.emit("friends:incoming-request", {
      avatar: user.avatar,
      friendId,
      username: user.username,
    })
  }
}

export const useIncomingFriendRequest = (fn: (userInfo: UserInfoType) => void) => {
  const listener = useEffectEvent(fn)

  useEffect(() => {
    socket.on("friends:incoming-request", listener)

    return () => {
      socket.off("friends:incoming-request", listener)
    }
  }, [])
}

// export const useAcceptFriendRequest = (listener: () => void) => {
//   useEffect(() => {
//     socket.on("friends:accept-request", listener)

//     return () => {
//       socket.off("friends:accept-request", listener)
//     }
//   }, [])
// }
