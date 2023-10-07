"use client";

import { Carousel } from "flowbite-react";

// https://picsum.photos/200/300?random=3

export default function MobileCarousel() {
  return (
    <div className="h-[350px] mb-4">
      <Carousel
        slideInterval={2000}
        pauseOnHover
        indicators={false}
        className="rounded-0"
      >
        <img
          alt="NF"
          src="https://picsum.photos/200/300?random=1"
          className="object-center rounded"
        />
        <img
          alt="NF"
          src="https://picsum.photos/200/300?random=6"
          className="object-center"
        />
        <img
          alt="NF"
          src="https://picsum.photos/200/300?random=3"
          className="object-center"
        />
        <img
          alt="NF"
          src="https://picsum.photos/200/300?random=4"
          className="object-center"
        />
      </Carousel>
    </div>
  );
}
