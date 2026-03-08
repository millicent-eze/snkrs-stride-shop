import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { data: products, isLoading } = useProducts(20, query ? `title:${query}*` : undefined);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        <section className="container mx-auto px-4 py-20">
          <div className="mb-12 text-center">
            <p className="font-body text-sm tracking-[0.3em] text-accent mb-2">SEARCH RESULTS</p>
            <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
              "{query}"
            </h1>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="font-display text-2xl text-muted-foreground">No results found</p>
              <p className="mt-2 font-body text-muted-foreground">
                Try different keywords or browse our collections.
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default SearchResults;
