import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  width = "shell",
}: {
  children: React.ReactNode;
  className?: string;
  width?: "shell" | "prose";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-(--spacing-gutter)",
        width === "shell" ? "max-w-(--container-shell)" : "max-w-(--container-prose)",
        className,
      )}
    >
      {children}
    </div>
  );
}
