import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

function BrandMark({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-full bg-white", className)}>
      <Image
        src="/gooddemon-logo.png"
        alt="GOODDEMON logo"
        fill
        sizes="64px"
        className="object-cover"
      />
    </div>
  );
}

export function Logo({
  compact = false,
  className
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link href="/" className={cn("flex items-center gap-3 text-bone", className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/15 bg-white p-[2px] shadow-halo">
        <BrandMark className="h-full w-full" />
      </div>
      {compact ? null : (
        <div className="leading-none">
          <p className="font-serif text-[1.55rem] uppercase tracking-[-0.08em] text-bone sm:text-[1.8rem]">
            GOODDEMON
          </p>
          <p className="pl-1 pt-1 text-[0.58rem] uppercase tracking-[0.82em] text-bone/48">
            Society
          </p>
        </div>
      )}
    </Link>
  );
}

export function Wordmark({
  className,
  subtitle = "Society"
}: {
  className?: string;
  subtitle?: string;
}) {
  return (
    <div className={cn("leading-none text-bone", className)}>
      <p className="font-serif text-[3.4rem] uppercase tracking-[-0.09em] sm:text-[5rem] lg:text-[7.2rem]">
        GOODDEMON
      </p>
      <p className="pl-2 pt-3 text-[0.72rem] uppercase tracking-[0.95em] text-bone/56 sm:text-[0.82rem] lg:text-[1rem]">
        {subtitle}
      </p>
    </div>
  );
}
