import { Activity, Brain, Calendar, MessageSquare, Pill, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const features = [
  {
    title: "Health Dashboard",
    description: "Monitor vital signs and get personalized health insights from your wearables.",
    Icon: Activity,
  },
  {
    title: "AI Diagnostics",
    description: "Advanced symptom analysis and risk assessment powered by AI.",
    Icon: Brain,
  },
  {
    title: "Mental Health Support",
    description: "Access virtual therapy support and track your mental wellbeing.",
    Icon: MessageSquare,
  },
  {
    title: "Medication Reminders",
    description: "Never miss a dose with smart medication and appointment reminders.",
    Icon: Pill,
  },
  {
    title: "Telemedicine",
    description: "Connect with healthcare providers through secure video consultations.",
    Icon: Calendar,
  },
  {
    title: "Health Records",
    description: "Securely manage and share your medical records and lab results.",
    Icon: FileText,
  },
];

const PatientDashboard = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Patient Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
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

export default PatientDashboard;