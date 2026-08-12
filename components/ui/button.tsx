import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-button font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-zeo-accent-500 text-white shadow-lg shadow-zeo-accent-500/30 hover:bg-zeo-accent-600",
        primary: "bg-zeo-primary-500 text-white shadow-lg hover:bg-zeo-primary-600",
        destructive: "bg-zeo-error text-white shadow-sm hover:bg-zeo-error/90",
        outline: "border-2 border-zeo-neutral-300 bg-transparent hover:bg-zeo-neutral-100",
        secondary: "bg-zeo-neutral-100 text-zeo-neutral-900 hover:bg-zeo-neutral-200",
        ghost: "hover:bg-zeo-neutral-100 hover:text-zeo-neutral-900",
        link: "text-zeo-primary-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-button-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
