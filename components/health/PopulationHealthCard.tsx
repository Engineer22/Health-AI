
import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PopulationHealthCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  metric: string;
}

const PopulationHealthCard = ({ icon: Icon, title, description, metric }: PopulationHealthCardProps) => {
  return (
    <Card className="bg-black/30 backdrop-blur-lg border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Icon className="h-6 w-6 text-primary" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-white/70 mb-4">{description}</p>
        <div className="text-sm font-medium text-primary">{metric}</div>
      </CardContent>
    </Card>
  );
};

export default PopulationHealthCard;
