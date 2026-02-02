
import { Link, useLocation } from "react-router-dom";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mainNavigation } from "@/config/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNotifications: () => void;
}

export const MobileMenu = ({ isOpen, onClose, onNotifications }: MobileMenuProps) => {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {mainNavigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "block px-3 py-2 rounded-md text-base font-medium transition-colors",
              location.pathname === item.href
                ? "bg-primary/10 text-primary"
                : "text-gray-600 hover:bg-gray-100"
            )}
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onNotifications}
              className="mr-4"
            >
              <Bell className="h-5 w-5" />
              <span className="ml-3">Notifications</span>
            </Button>
          </div>
          <div className="flex items-center px-3 mt-2">
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100"
              onClick={onClose}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
