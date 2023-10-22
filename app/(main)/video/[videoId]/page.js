"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { ThumbsDown, ThumbsUp } from "lucide-react";

import Comments from "@/components/section/comments";
import VideoCard from "@/components/card/video-card";
import VideoInfo from "@/components/section/video-info";
import { useEffect, useState } from "react";
import axios from "axios";
import SpinLoading from "@/components/spinLoading";

export default function Video() {
  const params = useParams();
  const { videoId } = params;
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState({});

  useEffect(() => {
    loadVideo();
  }, [videoId]);

  const loadVideo = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/video/${videoId}`);
      setVideo(res.data.data);
      console.log("RES: ", res.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return loading ? (
    <SpinLoading />
  ) : (
    <div className="p-4">
      <div className="mb-4 flex flex-col md:flex-row justify-between">
        <VideoInfo video={video} />
        <div className="h-[40vh] my-2 md:my-0 md:h-[60vh] md:w-[29%] flex flex-col gap-y-4 md:gap-y-0 md:justify-between">
          <div className="h-[10%] flex justify-between items-center ">
            <div className="flex gap-x-4">
              <div className="flex gap-x-2 items-center">
                <ThumbsUp className="h-5 w-5 text-zinc-500 dark:text-zinc-400 cursor-pointer" />{" "}
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                  {video?.likes}
                </p>
              </div>
              <ThumbsDown className="h-5 w-5 text-zinc-500 dark:text-zinc-400 cursor-pointer" />
            </div>
            <Button variant="outline">Subscribe</Button>
          </div>
          <Comments />
        </div>
      </div>
      <Separator className="bg-zinc-500 dark:bg-zinc-400" />
      <div className=" mt-4 w-full flex justify-center flex-wrap">
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
      </div>
    </div>
  );
}
