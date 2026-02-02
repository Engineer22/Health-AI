
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

const FeatureCard = ({ title, description, Icon }: FeatureCardProps) => {
  return (
    <Card className="bg-black/30 backdrop-blur-lg border border-white/10 hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Icon className="h-6 w-6 text-primary" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-white/70">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
