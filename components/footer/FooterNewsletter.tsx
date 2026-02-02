
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const FooterNewsletter = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter.",
    });
    setEmail("");
  };

  return (
    <div className="sm:col-span-2 md:col-span-4 lg:col-span-1">
      <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
      <form onSubmit={handleNewsletterSubmit} className="space-y-2">
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white/10 text-white rounded px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            aria-label="Email for newsletter"
          />
          <Button 
            type="submit" 
            size="sm" 
            className="bg-blue-500 hover:bg-blue-600 text-white"
            aria-label="Subscribe to newsletter"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-slate-400 text-xs">
          Subscribe to get updates about new features and releases.
        </p>
      </form>
    </div>
  );
};

export default FooterNewsletter;
