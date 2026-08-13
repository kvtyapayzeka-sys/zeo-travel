import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-button font-bold uppercase tracking-[0.04em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-zeo-coral text-zeo-ink hover:scale-105 hover:bg-zeo-coral/90",
        primary: "bg-zeo-ink text-zeo-sand hover:bg-zeo-ink/90",
        destructive: "bg-zeo-error text-white hover:bg-zeo-error/90",
        outline: "border-2 border-zeo-ink/25 bg-transparent text-zeo-ink hover:border-zeo-coral hover:text-zeo-coral",
        secondary: "bg-zeo-sand text-zeo-ink hover:bg-zeo-sand/80",
        ghost: "text-zeo-ink hover:bg-zeo-ink/5",
        link: "rounded-none text-zeo-coral normal-case tracking-normal underline-offset-4 hover:underline",
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
