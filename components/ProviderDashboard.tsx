import { Users, Brain, Activity, Receipt, MessageSquare, UserCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const features = [
  {
    title: "Patient Management",
    description: "View patient profiles, health trends, and diagnostics in real-time with EHR integration.",
    Icon: Users,
  },
  {
    title: "AI Clinical Support",
    description: "Get AI-powered diagnostic recommendations and critical condition alerts.",
    Icon: Brain,
  },
  {
    title: "Remote Monitoring",
    description: "Monitor patients' wearable data and vital signs with real-time alerts.",
    Icon: Activity,
  },
  {
    title: "Billing Automation",
    description: "Streamline billing and claims processing with fraud detection features.",
    Icon: Receipt,
  },
  {
    title: "Team Collaboration",
    description: "Secure messaging and video conferencing for team consultations.",
    Icon: MessageSquare,
  },
  {
    title: "User Administration",
    description: "Manage provider access levels and permissions with role-based controls.",
    Icon: UserCog,
  },
];

const ProviderDashboard = () => {
  return (
    <section className="py-16 bg-gray-50" id="provider-dashboard">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Provider Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <feature.Icon className="h-6 w-6 text-primary" />
                  <span>{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProviderDashboard;