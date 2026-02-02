
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainNavLinks } from "./navigation/MainNavLinks";
import { UserNavigation } from "./navigation/UserNavigation";
import { MobileMenu } from "./navigation/MobileMenu";
import { MobileNavigation } from "./navigation/MobileNavigation";
import { useToast } from "@/hooks/use-toast";
import Footer from "./Footer";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C1F3C]">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  HealthAI
                </span>
              </Link>
              
              {/* Desktop Navigation Menu */}
              <div className="hidden md:flex">
                <MainNavLinks />
              </div>
            </div>
            
            {/* User Navigation - Desktop */}
            <UserNavigation />

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="text-white"
              >
                <span className="sr-only">Open menu</span>
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <MobileMenu 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
          onNotifications={handleNotifications}
        />
      </nav>

      {/* Main Content */}
      <main className="pt-16 pb-16">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Bottom Navigation for Mobile */}
      <MobileNavigation />
    </div>
  );
};

export default Layout;
