"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

type PillButtonBase = {
  variant?: "solid" | "outline";
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

type PillButtonAsLink = PillButtonBase & {
  href: string;
  type?: never;
  onClick?: never;
};

type PillButtonAsButton = PillButtonBase & {
  href?: never;
  type?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type PillButtonProps = PillButtonAsLink | PillButtonAsButton;

const shimmerClassName =
  "pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:60%_100%] bg-no-repeat animate-shimmer motion-reduce:hidden";

export default function PillButton(props: PillButtonProps) {
  const { variant = "solid", icon: Icon, children, className } = props;

  const classes = cn(
    "group relative inline-flex touch-target items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold",
    variant === "solid" &&
      "overflow-hidden bg-gradient-to-r from-accent-500 to-violet text-white shadow-glow transition-transform hover:scale-105 focus-visible:scale-105",
    variant === "outline" &&
      "border border-white/25 bg-transparent text-white transition-colors hover:border-white/60 hover:bg-white/5",
    className,
  );

  const content = (
    <>
      {variant === "solid" ? <span aria-hidden className={shimmerClassName} /> : null}
      <span className="relative inline-flex items-center gap-2">
        {children}
        {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
      </span>
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} data-cursor-hover className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled}
      data-cursor-hover
      onClick={props.onClick}
      className={classes}
    >
      {content}
    </button>
  );
}
