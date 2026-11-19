import { ArrowRightLeft, Edit2, MoreVertical, Trash2 } from "lucide-react";
import Image from "next/image";
import { IProduct } from "../types/product.types";
import { ProductDetailsDrawer } from "./ProductDetailsDrawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatPrice,
  formatString,
  getBadgeConfig,
} from "@/lib/utils/formatters";
import { IColumn } from "@/types/common.types";

const ProductCard = ({
  product,
  columns,
}: {
  product: IProduct;
  columns: IColumn[];
}) => {
  const { name, condition, price, images, slug, order } = product;
  const badge = getBadgeConfig(condition);
  return (
    <Card className="group relative cursor-pointer py-0 shadow-sm transition-shadow hover:shadow-lg">
      <CardContent className="w-72 max-w-72 p-2">
        <div className="flex gap-2">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md">
            <Image
              src={images[0]}
              alt={`Product image - ${name}`}
              fill
              sizes="96px"
              className="object-cover"
              loading={order < 1 ? "eager" : "lazy"}
            />
          </div>
          <div className="flex max-w-36 min-w-0 flex-1 flex-col justify-between gap-1 py-2">
            <p
              className="truncate text-sm leading-tight font-semibold"
              title={formatString(name)}
            >
              {formatString(name)}
            </p>

            <div>
              {price != null && (
                <p className="text-base leading-tight font-bold tracking-tight">
                  {formatPrice(price)}
                </p>
              )}

              {condition && (
                <Badge
                  variant={badge.variant ?? "default"}
                  className={`${badge.className ?? ""} w-fit max-w-full truncate text-[10px] font-medium`}
                >
                  {badge.label}
                </Badge>
              )}
            </div>
          </div>
          <div className="p-1">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    aria-label={`Actions for ${product.name}`}
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:cursor-pointer hover:bg-white/20"
                  >
                    <MoreVertical
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </Button>
                }
              />

              <DropdownMenuContent
                className="w-auto"
                align="end"
              >
                <DropdownMenuItem className="text-muted-foreground hover:cursor-pointer">
                  <Edit2 className="h-3 w-3" />
                  Edit
                </DropdownMenuItem>

                {columns.length > 1 && (
                  <>
                    {columns
                      .filter((c) => c._id !== product.columnId)
                      .map((col) => (
                        <DropdownMenuItem
                          key={col.name}
                          className="text-muted-foreground hover:cursor-pointer"
                        >
                          <ArrowRightLeft className="h-3 w-3" />
                          Move to {col.name}
                        </DropdownMenuItem>
                      ))}
                  </>
                )}
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="absolute right-2 bottom-2">
          <ProductDetailsDrawer product={product} />
        </div>
      </CardContent>
    </Card>
  );
};

export default function SortableProductCard({
  product,
  columns,
}: {
  product: IProduct;
  columns: IColumn[];
}) {
  return (
    <div>
      {!product || !columns ? (
        <Skeleton className="bg-muted-foreground/20 h-32 w-72" />
      ) : (
        <ProductCard
          product={product}
          columns={columns}
        />
      )}
    </div>
  );
}
