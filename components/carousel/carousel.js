"use client";

import { Carousel } from "flowbite-react";

// https://picsum.photos/200/300?random=3

export default function VideoCarousel() {
  return (
    <div className="h-[350px] mb-4">
      <Carousel
        slideInterval={2000}
        pauseOnHover
        indicators={false}
        className="rounded-0"
      >
        <div className="flex w-full gap-x-4 items-center justify-center overflow-hidden">
          <img
            alt="NF"
            src="https://picsum.photos/200/300?random=1"
            className="w-[49%] object-center rounded"
          />
          <img
            alt="NF"
            src="https://picsum.photos/200/300?random=6"
            className="w-[49%] object-center"
          />
        </div>
        <div className="flex w-full gap-x-4 items-center justify-center">
          <img
            alt="NF"
            src="https://picsum.photos/200/300?random=1"
            className="w-[49%] object-center"
          />
          <img
            alt="NF"
            src="https://picsum.photos/200/300?random=6"
            className="w-[49%] object-center"
          />
        </div>
        <div className="flex w-full gap-x-4 items-center justify-center">
          <img
            alt="NF"
            src="https://picsum.photos/200/300?random=1"
            className="w-[49%] object-center"
          />
          <img
            alt="NF"
            src="https://picsum.photos/200/300?random=6"
            className="w-[49%] object-center"
          />
        </div>
        <div className="flex w-full gap-x-4 items-center justify-center">
          <img
            alt="NF"
            src="https://picsum.photos/200/300?random=1"
            className="w-[49%] object-center"
          />
          <img
            alt="NF"
            src="https://picsum.photos/200/300?random=6"
            className="w-[49%] object-center"
          />
        </div>
      </Carousel>
    </div>
  );
}
