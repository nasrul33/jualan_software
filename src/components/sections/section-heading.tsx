import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  level?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  level = "h2",
}: SectionHeadingProps) {
  const HeadingTag = level;

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      <Badge variant="default">{eyebrow}</Badge>
      <HeadingTag className="mt-4 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
        {title}
      </HeadingTag>
      <p className="mt-4 text-base leading-7 text-slate-700">{description}</p>
    </div>
  );
}
