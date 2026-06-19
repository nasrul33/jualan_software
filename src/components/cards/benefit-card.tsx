import { MarketingIcon } from "@/components/icons/icon-map";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BenefitItem } from "@/types/marketing";

interface BenefitCardProps {
  benefit: BenefitItem;
}

export function BenefitCard({ benefit }: BenefitCardProps) {
  return (
    <Card className="h-full bg-white transition-shadow hover:shadow-soft">
      <CardHeader>
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-800">
          <MarketingIcon name={benefit.icon} className="h-5 w-5" />
        </div>
        <CardTitle>{benefit.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{benefit.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
