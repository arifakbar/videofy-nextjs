"use client";

import UserVideoCard from "@/components/card/user-video-card";
import SpinLoading from "@/components/spinLoading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal";
import { useState } from "react";

export default function UserVideos() {
  const { onOpen } = useModal();

  const [loading, setLoading] = useState(false);

  return loading ? (
    <SpinLoading />
  ) : (
    <div className="px-4">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-2xl my-4 font-semibold text-zinc-500 dark:text-zinc-400">
          Your Videos
        </h3>
        <Button variant="outline" onClick={() => onOpen("newVideo")}>
          New Video
        </Button>
      </div>
      <Separator className="bg-zinc-500 dark:bg-zinc-400 my-3" />
      <div className="w-full flex justify-center flex-wrap">
        <UserVideoCard />
        <UserVideoCard />
        <UserVideoCard />
        <UserVideoCard />
        <UserVideoCard />
        <UserVideoCard />
        <UserVideoCard />
        <UserVideoCard />
        <UserVideoCard />
        <UserVideoCard />
        <UserVideoCard />
      </div>
    </div>
  );
}
