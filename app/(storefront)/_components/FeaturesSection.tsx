import { Package, Store, LayoutDashboard } from "lucide-react";

function FeaturesSection() {
  return (
    <section className="bg-background border-t py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Feature 1: Listing Management */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-foreground text-2xl font-semibold">
                List & Sell Your Figures
              </h2>

              <div className="inline-flex h-12 w-12 items-center justify-center">
                <Package className="text-foreground h-6 w-6" />
              </div>
            </div>

            <p className="text-muted-foreground">
              Create detailed listings for your toys and figures. Showcase
              specific details like brand, make, condition, and set your asking
              price or trade preferences.
            </p>
          </div>

          {/* Feature 2: The Marketplace */}

          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-foreground text-2xl font-semibold">
                Explore the Marketplace
              </h2>

              <div className="inline-flex h-12 w-12 items-center justify-center">
                <Store className="text-foreground h-6 w-6" />
              </div>
            </div>

            <p className="text-muted-foreground">
              Browse a global marketplace of collector items. Discover rare
              finds, filter by condition, and visit other users&apos; personal
              storefronts to see their entire inventory.
            </p>
          </div>

          {/* Feature 3: User Dashboard */}

          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-foreground text-2xl font-semibold">
                Manage Your Collection
              </h2>

              <div className="inline-flex h-12 w-12 items-center justify-center">
                <LayoutDashboard className="text-foreground h-6 w-6" />
              </div>
            </div>

            <p className="text-muted-foreground">
              Keep everything organized in one place. Track your active sales,
              monitor pending trades, and manage your personal wishlist through
              an intuitive dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
