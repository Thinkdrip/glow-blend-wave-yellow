import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-32 w-full resize-y rounded-md bg-surface px-4 py-3.5 text-base leading-relaxed text-fg shadow-card placeholder:text-subtle",
        "transition-[box-shadow] duration-150 ease-out",
        "hover:shadow-card-hover",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
