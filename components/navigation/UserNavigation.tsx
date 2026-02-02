
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export const UserNavigation = () => {
  const { toast } = useToast();

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications",
    });
  };

  return (
    <div className="hidden md:flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleNotifications}
        className="relative"
      >
        <Bell className="h-5 w-5" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="flex items-center gap-2"
          >
            <User className="h-5 w-5" />
            <span className="hidden sm:inline">Profile</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => toast({ title: "Profile settings coming soon" })}>
            Profile Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast({ title: "Preferences coming soon" })}>
            Preferences
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/login" className="w-full">Sign In</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
