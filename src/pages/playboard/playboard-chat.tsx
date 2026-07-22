import { SendHorizontalIcon } from "lucide-react"
import { useState } from "react"

import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import useChessStore from "@/hooks/use-chess-store"
import { useGameChat } from "@/lib/socket/event-hooks/use-game-events"

export default function PlayBoardChat() {
  const [messages, setMessages] = useState<{ color: "black" | "white"; message: string }[]>([])
  const orientation = useChessStore((state) => state.orientation)

  const sendMessage = useGameChat((message) => setMessages((p) => [...p, message]))

  return (
    <Card className="h-80 md:h-auto md:flex-1">
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent className="min-h-0">
        <ScrollArea className="h-full">
          <div className="space-y-3">
            {messages.map(({ color, message }, i) => (
              <Bubble key={i} variant={orientation === color ? "tinted" : "secondary"}>
                <BubbleContent>{message}</BubbleContent>
              </Bubble>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="mt-auto shrink-0">
        <form
          action={(e) => {
            const msg = e.get("msg") as string
            if (msg.trim()) sendMessage(msg)
          }}
          className="flex grow items-center gap-x-3"
        >
          <Input maxLength={100} name="msg" placeholder="Type something..." />
          <Button size="icon-lg" type="submit">
            <SendHorizontalIcon />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
