"use client";

import { Carousel } from "flowbite-react";
import { PlayCircle } from "lucide-react";
import ActionTooltip from "../ui/action-tooltip";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

// https://picsum.photos/200/300?random=3

export default function VideoCarousel() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/videos/random");
      setVideos(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const onPlayClick = (id) => {
    router.push(`/video/${id}`);
  };

  const pairs = videos?.reduce((result, current, index) => {
    if (index % 2 === 0) {
      result.push([current, videos[index + 1]]);
    }
    return result;
  }, []);

  console.log(pairs);

  return (
    <div className="h-[350px] mb-4">
      <Carousel
        slideInterval={2000}
        pauseOnHover
        indicators={false}
        className="rounded-0"
      >
        {pairs?.map((p) => {
          return (
            <div className="flex w-full gap-x-4 items-center justify-center">
              <div
                className="w-[49%] relative flex items-center justify-center"
                onClick={() => onPlayClick(p[0]?._id)}
              >
                <div className="absolute flex flex-col gap-y-3 opacity-0 hover:opacity-100 h-full w-full cursor-pointer duration-300 z-10 items-center justify-center bg-black bg-opacity-75">
                  <ActionTooltip label="Play">
                    <PlayCircle className="h-9 w-9 text-zinc-500 dark:text-zinc-400" />
                  </ActionTooltip>
                  <p className="text-xl font-bold text-zinc-500 dark:text-zinc-400">
                    {p[0]?.name}
                  </p>
                </div>
                <img
                  alt="NF"
                  src={p[0]?.thumbnail}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="w-[49%] relative flex items-center justify-center"
                onClick={() => onPlayClick(p[1]?._id)}
              >
                <div className="absolute flex flex-col gap-y-3 opacity-0 hover:opacity-100  h-full w-full cursor-pointer duration-300 z-10 items-center justify-center bg-black bg-opacity-75">
                  <ActionTooltip label="Play">
                    <PlayCircle className="h-9 w-9 text-zinc-500 dark:text-zinc-400" />
                  </ActionTooltip>
                  <p className="text-xl font-bold text-zinc-500 dark:text-zinc-400">
                    {p[1]?.name}
                  </p>
                </div>
                <img
                  alt="NF"
                  src={p[1]?.thumbnail}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
