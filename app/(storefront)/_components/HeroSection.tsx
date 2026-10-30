import AuthButtons from "./AuthButtons";

function HeroSection() {
  return (
    <section className="flex-1 bg-gray-100 py-20">
      <section className="container mx-auto px-4 py-32 animate-fade-in">
        <article className="border border-green-700 mx-auto max-w-4xl text-center">
          <h1 className="text-gray-900 mb-6 text-6xl font-bold leading-tight">
            A better way to buy and sell your collectibles
          </h1>
          <p className="text-muted-foreground mb-8 text-xl">
            Capture, organize, and manage your inventory in one place
          </p>

          <AuthButtons />
        </article>
      </section>
    </section>
  );
}

export default HeroSection;
