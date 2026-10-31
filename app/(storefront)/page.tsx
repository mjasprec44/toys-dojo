import FeaturesSection from "./_components/FeaturesSection";
import HeroSection from "./_components/HeroSection";
import ImagesSection from "./_components/ImagesSection";

export default function LandingPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      {/* Hero Images Section */}
      <ImagesSection />
      {/* Feature Section */}
      <FeaturesSection />
    </main>
  );
}
