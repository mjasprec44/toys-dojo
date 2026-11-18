import { ArrowRightLeft, Edit2, MoreVertical, Trash2 } from "lucide-react";
import Image from "next/image";
import { IProduct } from "../types/product.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  formatPrice,
  formatString,
  getBadgeConfig,
} from "@/lib/utils/formatters";
import { IColumn } from "@/types/common.types";

const ImageCarousel = ({ images }: { images: string[] }) => {
  if (!images || images.length === 0) return null;

  return (
    <Carousel
      className="relative w-full max-w-48 sm:max-w-xs"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <Card className="w-full border border-red-500">
              <CardContent className="relative flex aspect-square items-center justify-center overflow-hidden">
                <Image
                  src={src}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-1 z-10" />
      <CarouselNext className="right-1 z-10" />
    </Carousel>
  );
};

const ProductCard = ({
  product,
  columns,
}: {
  product: IProduct;
  columns: IColumn[];
}) => {
  const { name, condition, price, images, slug } = product;
  const badge = getBadgeConfig(condition);
  return (
    <Card className="group cursor-pointer py-0 shadow-sm transition-shadow hover:shadow-lg">
      <CardContent className="w-72 max-w-72 border p-2">
        <div className="flex gap-2">
          {/* <ImageCarousel images={images} /> */}
          {/* <div className="flex aspect-square h-12 w-12 items-center justify-center overflow-hidden">
              <Image
                src={images[0]}
                alt={`Product image - ${name}`}
                fill
                className="object-cover"
              />
            </div> */}
          {/* <div className="flex flex-row items-center justify-between">
              
              <Link href={itemDetail(slug)}>
                <SquareArrowUpRightExit className="h-4 w-4 hover:cursor-pointer" />
              </Link>
            </div> */}

          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md">
            <Image
              src={images[0]}
              alt={`Product image - ${name}`}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <div className="flex max-w-36 min-w-0 flex-1 flex-col justify-between gap-1 py-2">
            <h3
              className="truncate text-sm leading-tight font-semibold"
              title={formatString(name)}
            >
              {formatString(name)}
            </h3>

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
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:cursor-pointer hover:bg-white/20"
                  >
                    <MoreVertical className="h-4 w-4" />
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

          {/* <AccordionSection product={product} /> */}
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
      <ProductCard
        product={product}
        columns={columns}
      />
    </div>
  );
}
