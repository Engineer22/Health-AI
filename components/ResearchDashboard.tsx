
import { LineChart, Brain, Database, TestTube } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const features = [
  {
    title: "Population Health Analytics",
    description: "Track disease trends with aggregated, anonymized data and predictive outbreak management models.",
    Icon: LineChart,
  },
  {
    title: "Digital Biomarkers",
    description: "Integrate sensor-based data for real-world evidence and clinical insights.",
    Icon: Brain,
  },
  {
    title: "Advanced Data Analytics",
    description: "AI-powered tools for patient data analysis and decentralized clinical trials.",
    Icon: Database,
  },
  {
    title: "Clinical Research Management",
    description: "Streamline clinical trials with automated workflows and real-time participant monitoring.",
    Icon: TestTube,
  },
];

const ResearchDashboard = () => {
  return (
    <section className="py-16" id="research-dashboard">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">Research & Public Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow bg-black/30 backdrop-blur-lg border border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <feature.Icon className="h-6 w-6 text-primary" />
                  <span>{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchDashboard;

