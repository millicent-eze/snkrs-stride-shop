import heroImage from "@/assets/hero-sneakers.jpg";

export const HeroSection = () => {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Featured sneakers"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <p className="mb-4 font-body text-sm tracking-[0.3em] text-accent animate-fade-in">
          NEW COLLECTION
        </p>
        <h1 className="mb-6 font-display text-6xl font-bold leading-tight text-foreground md:text-8xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
          STEP INTO<br />
          <span className="text-gradient">THE FUTURE</span>
        </h1>
        <p className="mx-auto max-w-md font-body text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Premium sneakers for those who dare to stand out.
        </p>
      </div>
    </section>
  );
};
