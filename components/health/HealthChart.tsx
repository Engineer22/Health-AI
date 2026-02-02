
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface HealthChartProps {
  title: string;
  data: any[];
  dataKey: string;
  strokeColor: string;
}

const HealthChart = ({ title, data, dataKey, strokeColor }: HealthChartProps) => {
  return (
    <Card className="bg-black/30 backdrop-blur-lg border border-white/10">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={strokeColor} 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HealthChart;
