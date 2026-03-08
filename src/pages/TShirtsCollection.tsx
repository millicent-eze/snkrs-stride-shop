import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { CollectionFilters } from "@/components/CollectionFilters";
import { useProducts } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";

const TShirtsCollection = () => {
  const { data: products, isLoading } = useProducts(20, "product_type:t-shirt OR tag:t-shirt");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let filtered = products.filter((p) =>
      p.node.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount));
        break;
      case "price-desc":
        filtered.sort((a, b) => parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount));
        break;
      case "title-asc":
        filtered.sort((a, b) => a.node.title.localeCompare(b.node.title));
        break;
      case "title-desc":
        filtered.sort((a, b) => b.node.title.localeCompare(a.node.title));
        break;
    }
    return filtered;
  }, [products, searchQuery, sortBy]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        <section className="container mx-auto px-4 py-20">
          <div className="mb-12 text-center">
            <p className="font-body text-sm tracking-[0.3em] text-accent mb-2">COLLECTION</p>
            <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">MEN'S T-SHIRTS</h1>
            <p className="mt-4 mx-auto max-w-md font-body text-muted-foreground">Premium tees for the modern man.</p>
          </div>

          <CollectionFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="font-display text-2xl text-muted-foreground">No t-shirts found</p>
              <p className="mt-2 font-body text-muted-foreground">Try different filters or search terms.</p>
            </div>
          )}
        </section>

        <footer className="border-t border-border py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="font-display text-sm tracking-wider text-muted-foreground">© 2026 SNEAKER SPOT. ALL RIGHTS RESERVED.</p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default TShirtsCollection;
