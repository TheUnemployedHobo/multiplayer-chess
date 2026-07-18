import { SendHorizontalIcon } from "lucide-react"

import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function PlayBoardChat() {
  return (
    <Card className="h-80 md:h-auto md:flex-1">
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent className="min-h-0">
        <ScrollArea className="h-full">
          <div className="space-y-3">
            <Bubble variant="tinted">
              <BubbleContent>Hey there! What&apos;s up?</BubbleContent>
            </Bubble>
            <Bubble variant="muted">
              <BubbleContent>Not much.</BubbleContent>
            </Bubble>
            <Bubble variant="tinted">
              <BubbleContent>Ready for another match?</BubbleContent>
            </Bubble>
            <Bubble variant="muted">
              <BubbleContent>No not really</BubbleContent>
            </Bubble>
            <Bubble variant="tinted">
              <BubbleContent>Why?</BubbleContent>
            </Bubble>
            <Bubble variant="muted">
              <BubbleContent>Enough chess for today</BubbleContent>
            </Bubble>
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="mt-auto flex shrink-0 gap-x-3">
        <Input placeholder="Type something..." />
        <Button size="icon-lg">
          <SendHorizontalIcon />
        </Button>
      </CardFooter>
    </Card>
  )
}
