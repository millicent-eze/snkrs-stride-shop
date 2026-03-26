import { Link } from "react-router-dom";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchBar } from "@/components/SearchBar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const { user, loading, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="font-display text-2xl font-bold tracking-wider text-foreground">
          SNEAKER SPOT
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link to="/collections/sneakers" className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground">
            Sneakers
          </Link>
          <Link to="/collections/t-shirts" className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground">
            T-Shirts
          </Link>
          <SearchBar />
          {!loading && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="border-border">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-muted-foreground text-xs" disabled>
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="border-border font-body text-sm">
                  Sign In
                </Button>
              </Link>
            )
          )}
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
};
