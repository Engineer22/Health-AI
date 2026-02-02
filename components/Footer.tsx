
import FooterLinks from "./footer/FooterLinks";
import FooterSocial from "./footer/FooterSocial";
import FooterNewsletter from "./footer/FooterNewsletter";

const Footer = () => {
  const quickLinks = [
    { name: "Health Trends", href: "/health-trends" },
    { name: "Telemedicine", href: "/telemedicine" },
    { name: "Medical Records", href: "/records" },
    { name: "Population Health", href: "/population" },
  ];

  const resourceLinks = [
    { name: "About Us", href: "/" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Privacy Policy", href: "#", isExternal: true },
    { name: "Terms of Service", href: "#", isExternal: true },
  ];

  return (
    <footer className="bg-slate-900 border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">HealthAI</h3>
            <p className="text-slate-300 text-sm">
              Empowering healthcare through innovative AI solutions and comprehensive health analytics.
            </p>
          </div>

          {/* Quick Links */}
          <FooterLinks title="Quick Links" links={quickLinks} />

          {/* Resources */}
          <FooterLinks title="Resources" links={resourceLinks} />

          {/* Social & Contact */}
          <FooterSocial />

          {/* Newsletter Section */}
          <FooterNewsletter />
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-slate-400 text-sm">
            © {new Date().getFullYear()} HealthAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
