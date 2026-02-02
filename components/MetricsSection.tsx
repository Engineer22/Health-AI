
import { Users, Clock, TrendingUp } from "lucide-react";

const metrics = [
  {
    value: "1000+",
    label: "Healthcare Providers",
    icon: Users,
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    value: "40%",
    label: "Time Saved for Providers",
    icon: Clock,
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    value: "50,000+",
    label: "Patients Supported",
    icon: TrendingUp,
    color: "from-orange-500/20 to-red-500/20",
  },
];

const MetricsSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="relative group hover:scale-105 transition-transform duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity`}></div>
              <div className="relative p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <metric.icon className="h-8 w-8 text-white mb-4" />
                <h3 className="text-4xl font-bold text-white mb-2">{metric.value}</h3>
                <p className="text-white/80">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
