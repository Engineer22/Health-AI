
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface FooterLinksProps {
  title: string;
  links: Array<{
    name: string;
    href: string;
    isExternal?: boolean;
  }>;
}

const FooterLinks = ({ title, links }: FooterLinksProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, isExternal: boolean) => {
    if (isExternal) {
      e.preventDefault();
      toast({
        title: "Coming Soon",
        description: `${e.currentTarget.textContent} page is under construction`,
      });
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            {link.isExternal ? (
              <a
                href="#"
                className="text-slate-300 hover:text-white transition-colors text-sm"
                onClick={(e) => handleClick(e, true)}
              >
                {link.name}
              </a>
            ) : (
              <Link
                to={link.href}
                className="text-slate-300 hover:text-white transition-colors text-sm"
              >
                {link.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
