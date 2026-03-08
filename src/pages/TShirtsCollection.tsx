import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";

const TShirtsCollection = () => {
  const { data: products, isLoading } = useProducts(20, "product_type:t-shirt OR tag:t-shirt");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        <section className="container mx-auto px-4 py-20">
          <div className="mb-12 text-center">
            <p className="font-body text-sm tracking-[0.3em] text-accent mb-2">COLLECTION</p>
            <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
              MEN'S T-SHIRTS
            </h1>
            <p className="mt-4 mx-auto max-w-md font-body text-muted-foreground">
              Premium tees for the modern man.
            </p>
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
              <p className="font-display text-2xl text-muted-foreground">No t-shirts found</p>
              <p className="mt-2 font-body text-muted-foreground">
                Tell us what t-shirts you want to add!
              </p>
            </div>
          )}
        </section>

        <footer className="border-t border-border py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="font-display text-sm tracking-wider text-muted-foreground">
              © 2026 SNEAKER SPOT. ALL RIGHTS RESERVED.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default TShirtsCollection;
