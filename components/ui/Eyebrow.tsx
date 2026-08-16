import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export default function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-cta",
        className,
      )}
    >
      <span aria-hidden className="block h-px w-8 bg-current" />
      {children}
    </p>
  );
}
