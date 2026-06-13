import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, size = "default", ...props }: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      className={cn(
        "group/card bg-card text-card-foreground ring-foreground/5 dark:ring-foreground/10 flex flex-col gap-5 overflow-hidden rounded-[min(var(--radius-4xl),24px)] py-5 text-sm shadow-sm ring-1 has-[>img:first-child]:pt-0 data-[size=sm]:gap-4 data-[size=sm]:py-4 *:[img:first-child]:rounded-t-[min(var(--radius-4xl),24px)] *:[img:last-child]:rounded-b-[min(var(--radius-4xl),24px)]",
        className,
      )}
      data-size={size}
      data-slot="card"
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      data-slot="card-action"
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-5 group-data-[size=sm]/card:px-4", className)} data-slot="card-content" {...props} />
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("text-muted-foreground text-sm", className)} data-slot="card-description" {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center rounded-b-[min(var(--radius-4xl),24px)] px-5 group-data-[size=sm]/card:px-4 [.border-t]:pt-5 group-data-[size=sm]/card:[.border-t]:pt-4",
        className,
      )}
      data-slot="card-footer"
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-[min(var(--radius-4xl),24px)] px-5 group-data-[size=sm]/card:px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-5 group-data-[size=sm]/card:[.border-b]:pb-4",
        className,
      )}
      data-slot="card-header"
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("font-heading text-base font-medium", className)} data-slot="card-title" {...props} />
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
