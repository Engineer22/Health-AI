
import { Button } from "./ui/button";
import { Rocket, Brain, Shield } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background gradient circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-8 animate-fade-up">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-sm text-white/90">HIPAA Compliant Healthcare Solutions</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-up">
          Revolutionizing Healthcare
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            with Advanced AI
          </span>
        </h1>
        
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-fade-up delay-100">
          Experience the future of healthcare with personalized, efficient, and accessible solutions powered by artificial intelligence.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto sm:max-w-none animate-fade-up delay-200">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 gap-2 group w-full sm:w-auto min-w-[200px]"
          >
            <Rocket className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
            Explore Features
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-accent text-white border-2 border-accent hover:bg-accent/90 hover:text-white gap-2 w-full sm:w-auto min-w-[200px]"
          >
            <Brain className="h-5 w-5" />
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
