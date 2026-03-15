import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
};

type ButtonLinkProps = SharedProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href">;

type ButtonElementProps = SharedProps & {
  href?: never;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

type ButtonProps = ButtonLinkProps | ButtonElementProps;

const variants = {
  primary:
    "border border-ember/60 bg-ember text-bone hover:border-blood hover:bg-blood shadow-[0_14px_40px_rgba(125,16,16,0.35)]",
  secondary:
    "border border-ember/30 bg-white/[0.04] text-bone hover:border-ember/65 hover:bg-ember/10",
  ghost: "border border-transparent bg-transparent text-bone/70 hover:text-ember"
};

export function Button(props: ButtonProps) {
  const { className, children, variant = "primary", ...rest } = props;
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-xs uppercase tracking-[0.22em] transition duration-300",
    variants[variant],
    className
  );

  if ("href" in props) {
    const { href, ...linkProps } = rest as Omit<ButtonLinkProps, keyof SharedProps>;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
