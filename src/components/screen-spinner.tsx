import { Spinner } from "./ui/spinner"

export default function ScreenSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Spinner className="size-24" />
    </div>
  )
}
