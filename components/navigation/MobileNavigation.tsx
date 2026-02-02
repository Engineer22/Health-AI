
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { mobileMainNavigation } from "@/config/navigation";

export const MobileNavigation = () => {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-lg border-t border-white/10">
      <div className="grid grid-cols-4 h-16">
        {mobileMainNavigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-xs transition-colors",
              location.pathname === item.href
                ? "text-primary"
                : "text-white/60 hover:text-white"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};
