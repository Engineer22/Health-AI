
import { Activity, Heart, Timer, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface HealthMetric {
  icon: JSX.Element;
  label: string;
  value: string;
  trend: string;
  color: string;
}

const WearableData = () => {
  const healthMetrics: HealthMetric[] = [
    {
      icon: <Heart className="h-5 w-5" />,
      label: "Heart Rate",
      value: "72 bpm",
      trend: "+2 from yesterday",
      color: "text-red-400",
    },
    {
      icon: <Activity className="h-5 w-5" />,
      label: "Steps",
      value: "8,432",
      trend: "Daily goal: 10,000",
      color: "text-emerald-400",
    },
    {
      icon: <Timer className="h-5 w-5" />,
      label: "Sleep",
      value: "7h 23m",
      trend: "Good sleep quality",
      color: "text-blue-400",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      label: "Activity Score",
      value: "82/100",
      trend: "Above average",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {healthMetrics.map((metric) => (
        <Card key={metric.label} className="bg-white/10 border-white/20 backdrop-blur-lg hover:bg-white/20 transition-colors group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              {metric.label}
            </CardTitle>
            <div className={`${metric.color} transition-transform group-hover:scale-110`}>
              {metric.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metric.value}</div>
            <p className="text-xs text-white/60 mt-1">
              {metric.trend}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WearableData;
