"use client";

import { ChevronRightCircle } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { toast } from "sonner";
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
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useIsMobile } from "@/hooks/use-mobile";

const deliveryTimes = [
  {
    value: "asap",
    id: "delivery-asap",
    label: "Standard delivery",
    description: "25–35 min · Driver assigned now",
    badge: "Fastest",
  },
  {
    value: "5-00",
    id: "delivery-5-00",
    label: "5:00 PM – 5:15 PM",
    description: "Prep starts at 4:45 PM",
  },
  {
    value: "5-30",
    id: "delivery-5-30",
    label: "5:30 PM – 5:45 PM",
    description: "Good if you're heading home",
  },
  {
    value: "6-00",
    id: "delivery-6-00",
    label: "6:00 PM – 6:15 PM",
    description: "Most popular · High demand",
  },
  {
    value: "6-30",
    id: "delivery-6-30",
    label: "6:30 PM – 6:45 PM",
    description: "Last slot before kitchen closes",
  },
];

const ImageCarousel = ({ images }: { images: string[] }) => {
  if (!images || images.length === 0) return null;

  return (
    <Carousel
      className="relative w-full sm:max-w-xs"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <Card className="border border-red-500">
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

export function ProductDetailsDrawer({ product }: { product: IProduct }) {
  const [open, setOpen] = React.useState(false);
  const [deliveryTime, setDeliveryTime] = React.useState("asap");
  const isMobile = useIsMobile();

  function handleConfirm() {
    const selected = deliveryTimes.find((time) => time.value === deliveryTime);

    if (!selected) {
      return;
    }

    setOpen(false);
    toast("Delivery time confirmed", {
      description: selected.label,
    });
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerTrigger
        render={
          <Button variant="ghost">
            <ChevronRightCircle />
          </Button>
        }
      />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Pick a delivery time</DrawerTitle>
          <DrawerDescription>
            We&apos;ll prepare your order as soon as possible.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <ImageCarousel images={product.images} />
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
            </div>
          {/* <RadioGroup
            value={deliveryTime}
            onValueChange={setDeliveryTime}
            className="gap-2"
          >
            {deliveryTimes.map((time) => (
              <FieldLabel
                key={time.value}
                htmlFor={time.id}
              >
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle className="flex items-center gap-2">
                      {time.label}
                      {time.badge ? (
                        <Badge variant="secondary">{time.badge}</Badge>
                      ) : null}
                    </FieldTitle>
                    <FieldDescription>{time.description}</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem
                    value={time.value}
                    id={time.id}
                  />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup> */}
        </div>
        <DrawerFooter>
          <Button
            onClick={handleConfirm}
            className="h-[34px]"
          >
            Confirm Delivery Time
          </Button>
          <DrawerClose render={<Button variant="outline">Cancel</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
