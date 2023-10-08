"use client";

import { Carousel } from "flowbite-react";
import { useRouter } from "next/navigation";

// https://picsum.photos/200/300?random=3

export default function MobileCarousel() {
  const router = useRouter();

  const onPlayClick = () => {
    router.push(`/video/1`);
  };

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
          onClick={onPlayClick}
        />
        <img
          alt="NF"
          src="https://picsum.photos/200/300?random=6"
          className="object-center"
          onClick={onPlayClick}
        />
        <img
          alt="NF"
          src="https://picsum.photos/200/300?random=3"
          className="object-center"
          onClick={onPlayClick}
        />
        <img
          alt="NF"
          src="https://picsum.photos/200/300?random=4"
          className="object-center"
          onClick={onPlayClick}
        />
      </Carousel>
    </div>
  );
}
