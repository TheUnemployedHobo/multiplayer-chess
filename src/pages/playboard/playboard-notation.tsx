import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import useChessStore from "@/hooks/use-chess-store"

export default function PlayBoardNotation() {
  const history = useChessStore((state) => state.history)

  return (
    <Card className="h-80 md:h-auto md:min-h-0 md:flex-1">
      <CardHeader className="shrink-0">
        <CardTitle>Moves</CardTitle>
      </CardHeader>
      <CardContent className="min-h-0 flex-1">
        <ScrollArea className="h-full">
          {history.length ? (
            <ol className="flex flex-wrap gap-3">
              {history.map((_, i) =>
                i % 2 !== 0 ? null : (
                  <li className="whitespace-nowrap" key={i}>
                    <span>{Math.floor(i / 2) + 1}. </span>
                    <span>
                      {history.at(i)}
                      {history.at(i + 1) ? ` ${history.at(i + 1)}` : ""}
                    </span>
                  </li>
                ),
              )}
            </ol>
          ) : (
            <p className="text-muted-foreground">No moves yet.</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
