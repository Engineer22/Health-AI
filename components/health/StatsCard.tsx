
import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface StatItem {
  label: string;
  value: string;
}

interface StatsCardProps {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  stats: StatItem[];
}

const StatsCard = ({ title, icon: Icon, iconColor, stats }: StatsCardProps) => {
  return (
    <Card className="bg-black/30 backdrop-blur-lg border border-white/10 hover:scale-105 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Icon className={`h-6 w-6 text-[${iconColor}]`} />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-sm text-white/60">{stat.label}</p>
              <p className="text-lg font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
