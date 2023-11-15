"use client";

import { Carousel } from "flowbite-react";
import { PlayCircle } from "lucide-react";
import ActionTooltip from "../ui/action-tooltip";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

// https://picsum.photos/200/300?random=3

export default function MobileCarousel() {
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

  console.log("Mobile: ", videos);

  const onPlayClick = (id) => {
    router.push(`/video/${id}`);
  };

  return (
    <div className="h-[350px] mb-4">
      <Carousel
        slideInterval={2000}
        pauseOnHover
        indicators={false}
        className="rounded-0"
      >
        {videos?.map((v) => {
          return (
            <img
              alt="NF"
              src={v?.thumbnail}
              className="object-center rounded"
              onClick={() => onPlayClick(v?._id)}
            />
          );
        })}
      </Carousel>
    </div>
  );
}
