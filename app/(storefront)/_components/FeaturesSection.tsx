import { Package, Store, LayoutDashboard } from "lucide-react";

function FeaturesSection() {
  return (
    <section className="border-t bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Feature 1: Listing Management */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-2xl font-semibold text-foreground">
                List & Sell Your Figures
              </h3>

              <div className="inline-flex h-12 w-12 items-center justify-center">
                <Package className="h-6 w-6 text-foreground" />
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
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-2xl font-semibold text-foreground">
                Explore the Marketplace
              </h3>

              <div className="inline-flex h-12 w-12 items-center justify-center">
                <Store className="h-6 w-6 text-foreground" />
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
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-2xl font-semibold text-foreground">
                Manage Your Collection
              </h3>

              <div className="inline-flex h-12 w-12 items-center justify-center">
                <LayoutDashboard className="h-6 w-6 text-foreground" />
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
