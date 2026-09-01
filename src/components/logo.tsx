import { cn } from "@/lib/utils";

export function PatioLogo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <img
      src="/logo.png"
      alt="the Patio"
      className={cn(
        "w-auto object-contain object-center",
        size === "lg" ? "h-28 sm:h-36" : size === "sm" ? "h-12" : "h-20",
        className,
      )}
    />
  );
}
