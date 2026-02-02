
import { 
  PieChart, 
  Map, 
  TrendingUp, 
  Activity, 
  Brain,
  Weight,
  Utensils 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HealthMetricsCard from "@/components/health/HealthMetricsCard";
import HealthChart from "@/components/health/HealthChart";
import StatsCard from "@/components/health/StatsCard";
import PopulationHealthCard from "@/components/health/PopulationHealthCard";

const mockHealthData = [
  { day: 'Mon', heartRate: 72, steps: 8400, sleep: 7.2, calories: 2200 },
  { day: 'Tue', heartRate: 75, steps: 10200, sleep: 6.8, calories: 2400 },
  { day: 'Wed', heartRate: 71, steps: 9300, sleep: 7.5, calories: 2300 },
  { day: 'Thu', heartRate: 73, steps: 7800, sleep: 7.8, calories: 2100 },
  { day: 'Fri', heartRate: 74, steps: 11200, sleep: 6.5, calories: 2600 },
  { day: 'Sat', heartRate: 70, steps: 6500, sleep: 8.2, calories: 1900 },
  { day: 'Sun', heartRate: 69, steps: 5900, sleep: 8.5, calories: 1800 },
];

const HealthTrends = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C1F3C] text-white">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Health Trends Title Section */}
        <div className="flex flex-col gap-4 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
            Health Analytics Dashboard
          </h1>
          <p className="text-white/80">Monitor your health metrics and track population health trends.</p>
        </div>

        {/* Summary Cards Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <HealthMetricsCard
            icon={Activity}
            title="Daily Steps"
            value="8,432"
            subtitle="Goal: 10,000 steps"
          />
          <HealthMetricsCard
            icon={Brain}
            title="Stress Level"
            value="Low"
            subtitle="Based on HRV"
          />
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mt-8 animate-fade-in">
          <HealthChart
            title="Weekly Heart Rate Trends"
            data={mockHealthData}
            dataKey="heartRate"
            strokeColor="#F97316"
          />
          <HealthChart
            title="Sleep Duration Analysis"
            data={mockHealthData}
            dataKey="sleep"
            strokeColor="#1EAEDB"
          />
        </div>

        {/* Enhanced Health Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 animate-fade-in">
          <StatsCard
            title="Body Metrics"
            icon={Weight}
            iconColor="#9b87f5"
            stats={[
              { label: "Weight", value: "68 kg" },
              { label: "BMI", value: "22.5" },
              { label: "Body Fat", value: "18%" },
              { label: "Muscle Mass", value: "32.5 kg" },
            ]}
          />
          
          <StatsCard
            title="Nutrition"
            icon={Utensils}
            iconColor="#8B5CF6"
            stats={[
              { label: "Calories", value: "2,100 / 2,500" },
              { label: "Water Intake", value: "1.8L / 2.5L" },
              { label: "Protein", value: "85g / 120g" },
              { label: "Carbs", value: "245g / 300g" },
            ]}
          />
          
          <StatsCard
            title="Daily Activity"
            icon={Activity}
            iconColor="#F97316"
            stats={[
              { label: "Active Minutes", value: "45 mins" },
              { label: "Calories Burned", value: "420 kcal" },
              { label: "Distance", value: "5.2 km" },
              { label: "Active Hours", value: "4.5 hrs" },
            ]}
          />
        </div>

        {/* Population Health Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
            Population Health Insights
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PopulationHealthCard
              icon={Map}
              title="Disease Mapping"
              description="View real-time maps showing disease spread and health trends across regions."
              metric="Coverage: 150+ regions"
            />
            <PopulationHealthCard
              icon={PieChart}
              title="Demographics"
              description="Analyze population health data by age, gender, and socioeconomic groups."
              metric="Data from 1M+ individuals"
            />
            <PopulationHealthCard
              icon={TrendingUp}
              title="Trend Analysis"
              description="Track and predict health trends using advanced analytics and ML models."
              metric="95% prediction accuracy"
            />
          </div>
        </div>

        {/* Button Section */}
        <div className="flex justify-end gap-4 mt-8">
          <Button variant="outline" className="bg-black/30 text-white border-white/10 hover:bg-white/10">
            Export Data
          </Button>
          <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
            View Detailed Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HealthTrends;
