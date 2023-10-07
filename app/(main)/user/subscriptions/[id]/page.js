"use client";

import VideoCard from "@/components/card/video-card";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";

export default function UserSubscription() {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <h3 className="ml-3 text-2xl my-4 font-semibold text-zinc-500 dark:text-zinc-400">
        User name - {id}
      </h3>
      <Separator className="h-1 bg-zinc-500 dark:bg-zinc-400" />
      <div className="w-full flex justify-center flex-wrap">
        <VideoCard className="w-[300px] m-3" subscribed={true} />
        <VideoCard className="w-[300px] m-3" subscribed={true} />
        <VideoCard className="w-[300px] m-3" subscribed={true} />
        <VideoCard className="w-[300px] m-3" subscribed={true} />
        <VideoCard className="w-[300px] m-3" subscribed={true} />
        <VideoCard className="w-[300px] m-3" subscribed={true} />
        <VideoCard className="w-[300px] m-3" subscribed={true} />
        <VideoCard className="w-[300px] m-3" subscribed={true} />
        <VideoCard className="w-[300px] m-3" subscribed={true} />
        <VideoCard className="w-[300px] m-3" subscribed={true} />
        <VideoCard className="w-[300px] m-3" subscribed={true} />
      </div>
    </div>
  );
}
