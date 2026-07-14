import { Skeleton } from "./ui/skeleton"

type PropsType = { quantity: number }

export function StatItemPlaceholder({ quantity }: PropsType) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {Array.from({ length: quantity }, (_, i) => (
        <Skeleton className="h-20" key={i} />
      ))}
    </div>
  )
}

export function UserItemPlaceholder({ quantity }: PropsType) {
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
