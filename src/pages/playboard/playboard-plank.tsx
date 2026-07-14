import { Chessboard } from "@mirasen/react-chessboard"

export default function PlayBoardPlank() {
  return (
    <Chessboard
      className="aspect-square overflow-hidden rounded-2xl"
      orientation="white"
      position={{ id: 0, position: "start" }}
    />
  )
}
