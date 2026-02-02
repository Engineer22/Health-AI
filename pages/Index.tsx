
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, Activity, MessageCircle, Heart, UserCog, Bell, 
  ActivitySquare, Apple, Phone, Users, Mail, Shield, 
  Database, Bot, Lock, LineChart, Dna, Share2, Award,
  Stethoscope, BookOpen, Download
} from "lucide-react";

export default function Index() {
  const { toast } = useToast();

  const handleFeatureClick = (feature: string) => {
    toast({
      title: "Coming Soon",
      description: `The ${feature} feature will be available soon!`,
    });
  };

  const features = [
    // Core Medical Features
    { name: "AI-Powered Diagnosis", icon: Brain, color: "bg-blue-100", description: "Advanced symptom analysis with Infermedica API integration" },
    { name: "Real-Time Health Monitoring", icon: Activity, color: "bg-green-100", description: "Connected with Google Fit & Apple HealthKit" },
    { name: "24/7 Medical Assistant", icon: Bot, color: "bg-purple-100", description: "GPT-4 powered medical chatbot with voice support" },
    { name: "Mental Health Suite", icon: Heart, color: "bg-pink-100", description: "AI-driven meditation & mood tracking" },
    
    // Advanced Health Tech
    { name: "Virtual Consultations", icon: UserCog, color: "bg-cyan-100", description: "Secure video calls with healthcare providers" },
    { name: "Smart Health Alerts", icon: Bell, color: "bg-orange-100", description: "Personalized medication & appointment reminders" },
    { name: "Fitness AI Coach", icon: ActivitySquare, color: "bg-yellow-100", description: "Custom workout plans based on health data" },
    { name: "DNA Insights", icon: Dna, color: "bg-indigo-100", description: "Genetic health risk assessment & recommendations" },
    
    // Data & Security
    { name: "Health Data Analytics", icon: LineChart, color: "bg-violet-100", description: "Advanced health trends visualization" },
    { name: "HIPAA Compliant", icon: Shield, color: "bg-red-100", description: "Enterprise-grade security & privacy" },
    { name: "Research Portal", icon: BookOpen, color: "bg-emerald-100", description: "Access to anonymized health studies" },
    { name: "Developer API", icon: Database, color: "bg-blue-100", description: "Integration capabilities for health platforms" }
  ];

  const healthMetrics = [
    { title: "AI Accuracy", value: "99.9%", description: "In diagnostic assistance" },
    { title: "Active Users", value: "1M+", description: "Growing community" },
    { title: "Health Parameters", value: "50+", description: "Tracked in real-time" },
    { title: "Research Papers", value: "25+", description: "Published findings" }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-black bg-clip-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            The Future of Healthcare is Here
          </motion.h1>

          <motion.p 
            className="text-lg mb-8 text-center max-w-3xl mx-auto text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Experience healthcare reimagined through advanced AI, real-time monitoring, and personalized insights.
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              size="lg"
              className="bg-[#0070F3] hover:bg-[#0070F3]/90 text-white px-8"
              onClick={() => handleFeatureClick("AI Health Assessment")}
            >
              Start Free Assessment
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="px-8"
              onClick={() => handleFeatureClick("Demo")}
            >
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Integration Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {["HIPAA Compliant", "FDA Registered", "ISO Certified", "AI Powered"].map((badge, index) => (
            <div key={index} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <Shield className="h-4 w-4 text-[#0070F3]" />
              <span className="text-sm font-medium">{badge}</span>
            </div>
          ))}
        </div>
        
        {/* Features Grid */}
        <Card className="w-full max-w-6xl mx-auto bg-white shadow-lg border border-gray-200 mb-16">
          <CardContent className="p-6">
            <h2 className="text-3xl font-bold mb-8 text-center text-black">
              Cutting-Edge Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleFeatureClick(feature.name)}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <div className={`p-3 rounded-full ${feature.color} mb-3`}>
                          <feature.icon className="h-6 w-6 text-[#0070F3]" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{feature.name}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {healthMetrics.map((metric, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <h3 className="text-3xl font-bold text-[#0070F3] mb-2">{metric.value}</h3>
                <p className="font-medium text-gray-900">{metric.title}</p>
                <p className="text-sm text-gray-600">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Testimonials Section */}
        <motion.div 
          className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-black">
            Trusted by Healthcare Professionals
          </h2>
          <div className="space-y-4">
            <p className="text-gray-700 italic">"The AI-powered diagnostics have revolutionized our approach to patient care. The accuracy and speed are unprecedented." - Dr. Sarah Chen, Chief of Medicine</p>
            <p className="text-gray-700 italic">"The integration with our existing systems was seamless. The real-time monitoring has helped us save countless lives." - Dr. James Wilson, Emergency Care</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
