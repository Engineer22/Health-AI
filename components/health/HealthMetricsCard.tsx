
import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface HealthMetricsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle?: string;
}

const HealthMetricsCard = ({ icon: Icon, title, value, subtitle }: HealthMetricsCardProps) => {
  return (
    <Card className="bg-black/30 backdrop-blur-lg border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Icon className="h-6 w-6 text-primary" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary">{value}</div>
        {subtitle && <p className="text-white/60 text-sm mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
};

export default HealthMetricsCard;
