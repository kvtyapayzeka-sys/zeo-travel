import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-caption font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-zeo-primary-100 text-zeo-primary-700",
        secondary: "bg-zeo-neutral-100 text-zeo-neutral-700",
        destructive: "bg-zeo-error/10 text-zeo-error",
        success: "bg-zeo-success/10 text-zeo-success",
        warning: "bg-zeo-warning/10 text-zeo-warning",
        accent: "bg-zeo-accent-500 text-white",
        outline: "border border-zeo-neutral-300 text-zeo-neutral-700",
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
