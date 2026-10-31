"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

const ImageTabs = [
  {
    buttonText: "My Collection",
    imgSrc: "/hero-images/hero1.png",
  },
  {
    buttonText: "Market Place",
    imgSrc: "/hero-images/hero2.png",
  },
  {
    buttonText: "My Listings",
    imgSrc: "/hero-images/hero3.png",
  },
];

function ImageSectionTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = ImageTabs[activeIndex];

  return (
    <section className="container mx-auto px-4 animate-fade-in">
      <div className="mx-auto max-w-6xl">
        {/* Tabs */}
        <section
          role="tablist"
          aria-label="Feature previews"
          className="flex gap-2 justify-center mb-8 flex-wrap"
        >
          {ImageTabs.map((tab, index) => (
            <Button
              key={tab.buttonText}
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls="feature-panel"
              variant={activeIndex === index ? "default" : "outline"}
              onClick={() => setActiveIndex(index)}
              className="hover:cursor-pointer"
            >
              {tab.buttonText}
            </Button>
          ))}
        </section>

        <section
          id="feature-panel"
          role="tabpanel"
          aria-labelledby={activeTab.buttonText}
          className="relative w-full overflow-hidden rounded-lg shadow-xl border border-gray-200"
        >
          <Image
            src={ImageTabs[0].imgSrc}
            alt={ImageTabs[0].buttonText}
            width={1200}
            height={800}
            aria-hidden
            className="w-full h-auto opacity-0"
            priority
          />
          {ImageTabs.map((tab, index) => (
            <Image
              key={tab.buttonText}
              src={tab.imgSrc}
              alt={tab.buttonText}
              fill
              sizes="(max-width: 768px) 100vw, 1152px"
              aria-hidden={activeIndex !== index}
              className={`absolute inset-0 object-cover transition-opacity duration-500 ease-in-out motion-reduce:transition-none ${
                activeIndex === index
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            />
          ))}
        </section>
      </div>
    </section>
  );
}

export default ImageSectionTabs;
