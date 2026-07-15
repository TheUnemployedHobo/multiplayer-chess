import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useChessStore from "@/hooks/use-chess-store"

export default function PlayBoardNotation() {
  const history = useChessStore((state) => state.history)

  return (
    <Card className="grow">
      <CardHeader>
        <CardTitle>Moves</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  )
}
