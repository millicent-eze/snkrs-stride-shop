import { Link } from "react-router-dom";
import { CartDrawer } from "@/components/CartDrawer";

export const Navbar = () => {
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
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
};
