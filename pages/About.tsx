
import { 
  Brain, Watch, DollarSign, Activity, 
  Shield, FlaskConical, GraduationCap,
  Bot
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const features = [
    {
      title: "AI Diagnostics",
      description: "Advanced machine learning algorithms analyze EHRs, medical imaging, and patient data for fast, precise diagnoses.",
      icon: Brain,
    },
    {
      title: "Wearable Integration",
      description: "Seamless integration with wearable devices for real-time health tracking and risk assessment.",
      icon: Watch,
    },
    {
      title: "Revenue Automation",
      description: "AI-powered billing and claims processing to streamline financial operations for healthcare providers.",
      icon: DollarSign,
    },
    {
      title: "Public Health Insights",
      description: "AI-driven disease surveillance, population health analytics, and predictive modeling for better resource allocation.",
      icon: Activity,
    },
    {
      title: "Workforce Training",
      description: "AI-powered interactive learning modules and certification programs for healthcare professionals.",
      icon: GraduationCap,
    },
    {
      title: "AI Research Collaboration",
      description: "Foster partnerships between healthcare institutions and AI researchers to accelerate medical breakthroughs.",
      icon: Bot,
    }
  ];

  const technologies = [
    {
      title: "Security & Compliance",
      items: [
        "End-to-End Encryption for all data transactions",
        "Two-Factor Authentication (2FA) for secure access",
        "HIPAA and GDPR compliance",
      ],
      icon: Shield,
    },
    {
      title: "Advanced Technology",
      items: [
        "Machine Learning & Deep Learning",
        "Natural Language Processing (NLP)",
        "Big Data Analytics",
        "Blockchain Technology",
      ],
      icon: FlaskConical,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C1F3C]">
      {/* Hero Section */}
      <section className="relative py-20 text-center space-y-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent animate-fade-up">
            About HealthAI
          </h1>
          <p className="mt-6 text-xl text-white/90 max-w-3xl mx-auto font-medium animate-fade-up delay-100">
            We are an innovative platform dedicated to revolutionizing healthcare through Artificial Intelligence (AI).
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 relative">
        <div className="glass-morphism rounded-2xl p-8 hover:bg-white/5 transition-colors animate-fade-up delay-150">
          <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
          <p className="text-white/90 leading-relaxed text-lg">
            At HealthAI, our mission is to democratize access to cutting-edge healthcare solutions by integrating AI-driven 
            innovations into the healthcare ecosystem. We aim to eliminate inefficiencies, enhance clinical decision-making, 
            and drive proactive patient care through AI-powered automation and predictive analytics.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-white animate-fade-up">What We Offer</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="bg-black/40 backdrop-blur-md border-white/10 hover:bg-white/10 transition-colors group animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white group-hover:text-[#8B5CF6] transition-colors">
                  <feature.icon className="h-6 w-6 text-[#8B5CF6]" />
                  <span className="font-semibold">{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90 leading-relaxed font-medium">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Technology & Security Section */}
      <section className="px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-white animate-fade-up">Technology & Security</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {technologies.map((tech, index) => (
            <Card 
              key={tech.title} 
              className="bg-black/40 backdrop-blur-md border-white/10 hover:bg-white/10 transition-colors group animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white group-hover:text-[#8B5CF6] transition-colors">
                  <tech.icon className="h-6 w-6 text-[#8B5CF6]" />
                  <span className="font-semibold">{tech.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-white">
                  {tech.items.map((item) => (
                    <li key={item} className="leading-relaxed font-medium">{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto glass-morphism rounded-2xl p-8 hover:bg-white/5 transition-colors animate-fade-up">
          <h2 className="text-3xl font-bold mb-6 text-white">Our Vision for the Future</h2>
          <p className="text-white/90 mb-6 text-lg leading-relaxed">
            We envision a future where AI transforms healthcare into a more intelligent, efficient, and patient-centric ecosystem.
            At HealthAI, we are not just developing a platform—we are shaping the future of healthcare through AI-driven innovation.
          </p>
          <ul className="list-disc list-inside space-y-3 text-white/90">
            <li className="leading-relaxed">Healthcare professionals can provide more accurate and timely treatments</li>
            <li className="leading-relaxed">Patients receive personalized, proactive healthcare insights for better self-care</li>
            <li className="leading-relaxed">Public health agencies utilize AI to predict and prevent disease outbreaks</li>
            <li className="leading-relaxed">Biopharma companies leverage AI for faster drug discovery and clinical trials</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;
