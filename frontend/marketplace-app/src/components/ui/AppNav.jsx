import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";

export default function AppNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  const isActive = (path) => {
    location.pathname === path;
  };

  return (
    <nav className="w-full border-b bg-background">
      <div className="max-w-screen mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/browse" className="font-semibold text-lg">
          Marketplace
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="flex gap-2">
            {token ? (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/browse"
                      className={`px-3 py-2 rounded-md ${
                        isActive("/browse") ? "bg-muted font-medium" : ""
                      }`}
                    >
                      Browse
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/create"
                      className={`px-3 py-2 rounded-md ${
                        isActive("/create") ? "bg-muted font-medium" : ""
                      }`}
                    >
                      Create
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/listings/me"
                      className={`px-3 py-2 rounded-md ${
                        isActive("/listings/me") ? "bg-muted font-medium" : ""
                      }`}
                    >
                      My Listings
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <Separator orientation="vertical" className="h-6 mx-2" />

                <Button variant="ghost" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavigationMenuItem>
                  <Button variant="ghost" onClick={() => navigate("/")}>
                    Login
                  </Button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Button onClick={() => navigate("/register")}>
                    Register
                  </Button>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
