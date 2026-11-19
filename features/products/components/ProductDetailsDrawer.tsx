"use client";

import { ChevronRightCircle, SquareArrowUpRightExit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";
import { IProduct } from "../types/product.types";
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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { itemDetail } from "@/constants/routes";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatPrice, formatString } from "@/lib/utils/formatters";

const ImageCarousel = ({ images }: { images: string[] }) => {
  if (!images || images.length === 0) return null;

  return (
    <Carousel
      className="relative w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <Card className="p-0">
              <CardContent
                // className="relative flex aspect-square items-center justify-center overflow-hidden"
                className="relative aspect-square p-0"
              >
                <Image
                  src={src}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-1 z-10 h-5 w-5" />
      <CarouselNext className="right-1 z-10 h-5 w-5" />
    </Carousel>
  );
};

export function ProductDetailsDrawer({ product }: { product: IProduct }) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  function handleConfirm() {
    setOpen(false);
    toast("Update successfully");
  }

  const productDetails = [
    {
      value: formatString(product.brand),
      id: product.brand,
      label: "Brand",
    },
    {
      value: formatString(product.name),
      id: product.name,
      label: "Name",
    },
    {
      value: formatString(product.description),
      id: "product-description",
      label: "Description",
    },
    {
      value: formatPrice(product.price),
      id: product.price,
      label: "Price",
    },
    {
      value: product.quantity,
      id: "product-quantity",
      label: "Quantity",
    },
    {
      value: product.openForTrade ? "Yes" : "No",
      label: "Open for trade",
    },
    {
      value: formatString(product.condition),
      label: "Condition",
    },
    {
      value:
        product.issues.length > 1
          ? formatString(product.issues.join(","))
          : product.issues[0],
      label: "Issues",
    },
  ];

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerTrigger
        render={
          <Button
            variant="ghost"
            aria-label={`Actions for ${product.name}`}
            type="button"
            className="hover:cursor-pointer"
          >
            <ChevronRightCircle aria-hidden="true" />
          </Button>
        }
      />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Product details</DrawerTitle>
          <DrawerDescription>
            View the details and specifications for this product.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <ImageCarousel images={product.images} />

          {productDetails.map((item) =>
            item.value ? (
              <FieldLabel key={item.label}>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle className="flex items-center gap-2">
                      {item.label}
                    </FieldTitle>

                    <FieldDescription>{item.value}</FieldDescription>
                  </FieldContent>
                </Field>
              </FieldLabel>
            ) : null,
          )}

          <div className="flex flex-row items-center justify-between p-4">
            <p>View in marketplace</p>
            <Link href={itemDetail(product.slug)}>
              <SquareArrowUpRightExit className="h-4 w-4 hover:cursor-pointer" />
            </Link>
          </div>
        </div>
        <DrawerFooter>
          <Button
            onClick={handleConfirm}
            className="h-8.5"
          >
            Update
          </Button>
          <DrawerClose render={<Button variant="outline">Cancel</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
