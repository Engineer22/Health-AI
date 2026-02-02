
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { mainNavigation } from "@/config/navigation";

export const MainNavLinks = () => {
  const location = useLocation();
  
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-1">
        {mainNavigation.map((item) => (
          <NavigationMenuItem key={item.name}>
            <Link
              to={item.href}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                location.pathname === item.href
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              {item.name}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
