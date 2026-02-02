
import { Brain, Watch, DollarSign, Heart, Activity, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const features = [
  {
    title: "AI Diagnostics",
    description: "Advanced AI-powered diagnostic tools for accurate and rapid health assessments.",
    Icon: Brain,
  },
  {
    title: "Wearable Integration",
    description: "Seamless integration with wearable devices for continuous health monitoring.",
    Icon: Watch,
  },
  {
    title: "Revenue Cycle Automation",
    description: "Streamline billing and claims processing with intelligent automation.",
    Icon: DollarSign,
  },
  {
    title: "Personalized Care",
    description: "Tailored healthcare solutions based on individual patient needs.",
    Icon: Heart,
  },
  {
    title: "Public Health Insights",
    description: "Real-time analytics and insights for public health management.",
    Icon: Activity,
  },
  {
    title: "Workforce Training",
    description: "Comprehensive training programs for healthcare professionals.",
    Icon: GraduationCap,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">Our Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-black/30 backdrop-blur-lg border border-white/10 hover:shadow-lg transition-shadow">
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

export default FeaturesSection;
