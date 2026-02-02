
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Brain, UserCircle, DollarSign, Activity, GraduationCap } from "lucide-react";

const HowItWorks = () => {
  const sections = [
    {
      title: "Data Collection & Integration",
      icon: <Activity className="w-12 h-12 mb-4 text-primary" />,
      content: [
        "Seamless integration with Electronic Health Records (EHRs), medical imaging, and wearable devices",
        "Secure collection of patient health data, medical history, and real-time vitals using IoT-enabled wearables"
      ]
    },
    {
      title: "AI-Powered Analysis & Diagnosis",
      icon: <Brain className="w-12 h-12 mb-4 text-primary" />,
      content: [
        "Machine Learning & Deep Learning models analyze medical imaging and health data",
        "Natural Language Processing extracts insights from clinical notes",
        "AI-driven risk assessment predicts potential health threats"
      ]
    },
    {
      title: "Personalized Health Insights",
      icon: <UserCircle className="w-12 h-12 mb-4 text-primary" />,
      content: [
        "Customized AI-generated health recommendations",
        "Real-time alerts for critical health warnings",
        "Proactive health monitoring and intervention"
      ]
    },
    {
      title: "Automated Revenue Cycle",
      icon: <DollarSign className="w-12 h-12 mb-4 text-primary" />,
      content: [
        "AI automation of medical billing and insurance claims",
        "Streamlined financial workflows",
        "Faster reimbursements and reduced administrative costs"
      ]
    },
    {
      title: "Public Health Monitoring",
      icon: <Activity className="w-12 h-12 mb-4 text-primary" />,
      content: [
        "Population health trend analysis",
        "Disease outbreak prediction",
        "Resource allocation optimization"
      ]
    },
    {
      title: "AI-Driven Workforce Training",
      icon: <GraduationCap className="w-12 h-12 mb-4 text-primary" />,
      content: [
        "Interactive training simulations",
        "Certification programs",
        "Evidence-based treatment recommendations"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C1F3C] py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-8">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm text-white/90">Powered by Advanced AI Technology</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              How HealthAI Works
            </span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Experience the future of healthcare through our advanced AI-driven platform,
            delivering personalized and efficient healthcare solutions.
          </p>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <Card 
              key={index} 
              className="relative group hover:scale-105 transition-all duration-300 bg-black/30 backdrop-blur-lg border-white/10"
            >
              <CardHeader className="relative text-center pb-4">
                <div className="flex justify-center transform transition-transform group-hover:scale-110">
                  {section.icon}
                </div>
                <CardTitle className="text-2xl text-white mt-2">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start text-white/80 hover:text-white transition-colors">
                      <span className="mr-2 text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-20 animate-fade-up">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
            Why Choose HealthAI?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { text: "Faster, More Accurate Diagnoses", icon: <Brain className="w-6 h-6" /> },
              { text: "Personalized Patient Care", icon: <UserCircle className="w-6 h-6" /> },
              { text: "Automation & Cost Reduction", icon: <DollarSign className="w-6 h-6" /> },
              { text: "Scalable Public Health Solutions", icon: <Activity className="w-6 h-6" /> },
              { text: "Secure & Compliant", icon: <Shield className="w-6 h-6" /> },
              { text: "Data-Driven Decisions", icon: <Activity className="w-6 h-6" /> }
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="group bg-black/30 backdrop-blur-lg border border-white/10 p-6 rounded-lg 
                         hover:bg-white/5 transition-all duration-300 flex items-center gap-4
                         hover:scale-105 cursor-pointer"
              >
                <div className="text-primary group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <p className="font-semibold text-white group-hover:text-white/90">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
