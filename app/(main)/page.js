"use client";

import VideoCard from "@/components/card/video-card";
import VideoCarousel from "@/components/carousel/carousel";
import MobileCarousel from "@/components/carousel/mobileCarousel";
import SpinLoading from "@/components/spinLoading";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/videos");
      setVideos(res.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return loading ? (
    <SpinLoading />
  ) : (
    <div className="py-4 px-1">
      <div className="hidden md:block">
        <VideoCarousel />
      </div>
      <div className="md:hidden">
        <MobileCarousel />
      </div>
      <Separator className="h-1 bg-zinc-500 dark:bg-zinc-400" />
      <div className="w-full flex justify-center flex-wrap">
        {videos?.map((v) => {
          return <VideoCard video={v} />;
        })}
      </div>
    </div>
  );
}
