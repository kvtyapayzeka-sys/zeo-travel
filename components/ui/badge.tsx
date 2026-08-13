import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-2 border-zeo-ink bg-transparent text-zeo-ink",
        secondary: "border border-zeo-ink/20 bg-transparent text-zeo-ink/70",
        destructive: "bg-zeo-error/10 text-zeo-error",
        success: "bg-zeo-success/10 text-zeo-success",
        warning: "bg-zeo-warning/10 text-zeo-warning",
        accent: "bg-zeo-coral text-zeo-ink",
        outline: "border border-zeo-ink/30 text-zeo-ink",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
