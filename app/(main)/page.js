"use client";

import VideoCard from "@/components/card/video-card";
import VideoCarousel from "@/components/carousel/carousel";
import MobileCarousel from "@/components/carousel/mobileCarousel";
import { Separator } from "@/components/ui/separator";

export default function Home() {

  return (
    <div className="py-4 px-1">
      <div className="hidden md:block">
        <VideoCarousel />
      </div>
      <div className="md:hidden">
        <MobileCarousel />
      </div>
      <Separator className="h-1 bg-zinc-500 dark:bg-zinc-400" />
      <div className="w-full flex justify-center flex-wrap">
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </div>
    </div>
  );
}
