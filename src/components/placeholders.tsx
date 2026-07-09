import { Skeleton } from "./ui/skeleton"

type PropsType = { quantity: number }

export function ItemPlaceholder({ quantity }: PropsType) {
  return Array.from({ length: quantity }, (_, i) => (
    <div className="flex items-center gap-x-3" key={i}>
      <Skeleton className="size-14 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-25 rounded-full" />
        <Skeleton className="h-5 w-36 rounded-full" />
      </div>
    </div>
  ))
}
