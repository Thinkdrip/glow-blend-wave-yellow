import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[transform,background-color,color,box-shadow,opacity] duration-150 ease-out select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 active:enabled:scale-[0.96]",
  {
    variants: {
      variant: {
        ink: "bg-ink text-ink-fg shadow-card hover:bg-fg",
        primary: "bg-primary text-primary-fg shadow-card hover:opacity-90",
        outline: "bg-surface text-fg shadow-card hover:shadow-card-hover",
        ghost: "bg-transparent text-muted hover:text-fg hover:bg-surface-2/60",
      },
      size: {
        default: "h-12 rounded-md px-5 text-sm",
        lg: "h-14 rounded-lg px-6 text-base",
        sm: "h-10 rounded-sm px-3.5 text-sm",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: {
      variant: "ink",
      size: "default",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant, size, type = "button", asChild = false, ...props },
    ref,
  ) {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
