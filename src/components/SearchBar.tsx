import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm flex items-start justify-center pt-32">
          <div className="w-full max-w-lg px-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sneakers, t-shirts..."
                className="h-14 pl-12 pr-12 text-lg bg-secondary border-border font-body"
              />
              <button
                type="button"
                onClick={() => { setIsOpen(false); setQuery(""); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </form>
            <p className="mt-3 text-center font-body text-sm text-muted-foreground">
              Press Enter to search or Esc to close
            </p>
          </div>
          <button
            className="absolute inset-0 -z-10"
            onClick={() => { setIsOpen(false); setQuery(""); }}
            onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
          />
        </div>
      )}
    </>
  );
};
