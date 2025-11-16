"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Card,
  CardContent,
} from "@/components/ui";

import IMG1 from "./image/1.webp";
import IMG2 from "./image/2.png";
import IMG3 from "./image/3.jpg";
import IMG4 from "./image/4.webp";
import Image from "next/image";

function Banner() {
  const images = [IMG1, IMG2, IMG3, IMG4];

  return (
    <div className="w-full mx-auto">
      <Carousel
        opts={{
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-2 sm:p-4">
                <Card>
                  <CardContent
                    className="
                      relative 
                      w-full 
                      aspect-[16/9] 
                      sm:aspect-[21/9] 
                      md:aspect-[16/6] 
                      lg:aspect-[16/5] 
                      xl:aspect-[16/4] 
                      overflow-hidden 
                      rounded-xl
                    "
                  >
                    <Image
                      src={image}
                      alt={`banner-${index}`}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default Banner;
