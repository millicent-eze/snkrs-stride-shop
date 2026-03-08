import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ArrowRight } from "lucide-react";
import sneakerImg from "@/assets/product-aj1.jpg";
import tshirtImg from "@/assets/tshirt-gucci-black.jpg";

const Index = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <HeroSection />

        {/* Bio Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <p className="font-body text-sm tracking-[0.3em] text-accent mb-3">WHO WE ARE</p>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl mb-8">
            MORE THAN JUST A STORE
          </h2>
          <blockquote className="mx-auto max-w-2xl border-l-4 border-accent pl-6 text-left">
            <p className="font-body text-base italic leading-relaxed text-muted-foreground md:text-lg">
              "At <span className="text-foreground font-medium">Sneaker Spot</span>, we live and breathe street style. 
              From heat-on-your-feet kicks to designer tees that turn heads — we curate the freshest drops 
              so you never have to settle for basic. Whether you're flexing at the function or keeping it 
              casual, we've got the drip to match your energy. 🔥"
            </p>
          </blockquote>
        </section>

        {/* Category Showcase */}
        <section className="container mx-auto px-4 pb-16">
          <div className="mb-10 text-center">
            <p className="font-body text-sm tracking-[0.3em] text-accent mb-2">WHAT WE OFFER</p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              SHOP BY CATEGORY
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              to="/collections/sneakers"
              className="group relative overflow-hidden rounded-sm border border-border aspect-[4/3] block"
            >
              <img
                src={sneakerImg}
                alt="Sneakers collection"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-body text-xs tracking-[0.2em] text-accent mb-1">COLLECTION</p>
                <h3 className="font-display text-3xl font-bold text-foreground">SNEAKERS</h3>
                <span className="mt-2 inline-flex items-center gap-1 font-body text-sm text-muted-foreground transition-colors group-hover:text-accent">
                  Shop now <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
            <Link
              to="/collections/t-shirts"
              className="group relative overflow-hidden rounded-sm border border-border aspect-[4/3] block"
            >
              <img
                src={tshirtImg}
                alt="T-Shirts collection"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-body text-xs tracking-[0.2em] text-accent mb-1">COLLECTION</p>
                <h3 className="font-display text-3xl font-bold text-foreground">T-SHIRTS</h3>
                <span className="mt-2 inline-flex items-center gap-1 font-body text-sm text-muted-foreground transition-colors group-hover:text-accent">
                  Shop now <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
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

export default Index;
