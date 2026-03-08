import { useParams } from "react-router-dom";
import { useState } from "react";
import { useProductByHandle } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading: loading } = useProductByHandle(handle || "");
  const addItem = useCartStore(state => state.addItem);
  const cartLoading = useCartStore(state => state.isLoading);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center pt-16 bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center pt-16 bg-background">
          <p className="text-muted-foreground font-display text-xl">Product not found</p>
        </div>
      </>
    );
  }

  const { node } = product;
  const images = node.images.edges;
  const variants = node.variants.edges;
  const selectedVariant = variants[selectedVariantIdx]?.node;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: node.title });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Images */}
            <div className="space-y-4">
              {images[0] && (
                <div className="aspect-square overflow-hidden rounded-sm bg-secondary">
                  <img
                    src={images[0].node.url}
                    alt={images[0].node.altText || node.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(1).map((img, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-sm bg-secondary">
                      <img src={img.node.url} alt={img.node.altText || ""} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <p className="font-body text-sm tracking-[0.2em] text-accent mb-2">SNEAKER SPOT</p>
              <h1 className="font-display text-4xl font-bold text-foreground mb-4">{node.title}</h1>
              <p className="font-body text-muted-foreground mb-6 leading-relaxed">{node.description}</p>

              {selectedVariant && (
                <p className="font-display text-3xl font-bold text-foreground mb-6">
                  {selectedVariant.price.currencyCode} {parseFloat(selectedVariant.price.amount).toFixed(2)}
                </p>
              )}

              {/* Variant options */}
              {node.options.map((option) => (
                <div key={option.name} className="mb-4">
                  <p className="font-body text-sm text-muted-foreground mb-2">{option.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v, idx) => {
                      const optVal = v.node.selectedOptions.find(o => o.name === option.name)?.value;
                      if (!optVal) return null;
                      // Deduplicate
                      const prevSame = variants.slice(0, idx).some(pv =>
                        pv.node.selectedOptions.find(o => o.name === option.name)?.value === optVal
                      );
                      if (prevSame) return null;

                      const isSelected = selectedVariant?.selectedOptions.find(o => o.name === option.name)?.value === optVal;
                      return (
                        <button
                          key={optVal}
                          onClick={() => {
                            const matchIdx = variants.findIndex(vv =>
                              vv.node.selectedOptions.find(o => o.name === option.name)?.value === optVal
                            );
                            if (matchIdx >= 0) setSelectedVariantIdx(matchIdx);
                          }}
                          className={`px-4 py-2 text-sm font-body border rounded-sm transition-colors ${
                            isSelected
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                          }`}
                        >
                          {optVal}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <Button
                size="lg"
                className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90 font-display tracking-wider"
                onClick={handleAddToCart}
                disabled={cartLoading || !selectedVariant?.availableForSale}
              >
                {cartLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  <ShoppingCart className="h-5 w-5 mr-2" />
                )}
                {selectedVariant?.availableForSale ? "ADD TO CART" : "SOLD OUT"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetail;
