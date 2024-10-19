import { cn } from "@app/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-400 bg-opacity-15", className)}
      {...props}
    />
  )
}

export { Skeleton }
