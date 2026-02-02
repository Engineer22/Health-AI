
import { Github, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const FooterSocial = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
      <div className="flex space-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-slate-300 hover:text-white hover:bg-white/10"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-slate-300 hover:text-white hover:bg-white/10"
          aria-label="Twitter"
        >
          <Twitter className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-slate-300 hover:text-white hover:bg-white/10"
          aria-label="Email"
        >
          <Mail className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default FooterSocial;
