"use client";

import VideoCard from "@/components/card/video-card";
import SpinLoading from "@/components/spinLoading";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Trending() {
  //Desc with no. of views

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/videos/trending");
      setVideos(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="ml-3 text-2xl my-4 font-semibold text-zinc-500 dark:text-zinc-400">
        Trending Videos
      </h3>
      <Separator className="h-1 bg-zinc-500 dark:bg-zinc-400" />
      {loading ? (
        <SpinLoading />
      ) : (
        <div className="w-full flex justify-center flex-wrap">
          {videos?.map((v) => {
            return <VideoCard className="w-[300px] m-3" video={v} />;
          })}
        </div>
      )}
    </div>
  );
}
