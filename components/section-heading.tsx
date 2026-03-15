import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", align === "center" && "text-center", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-serif text-4xl uppercase leading-none sm:text-5xl lg:text-6xl">{title}</h2>
      {description ? <p className="max-w-2xl text-sm leading-7 text-bone/65">{description}</p> : null}
    </div>
  );
}
