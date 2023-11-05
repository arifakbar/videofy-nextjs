"use client";

import UserVideoCard from "@/components/card/user-video-card";
import SpinLoading from "@/components/spinLoading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export default function UserVideos() {
  const { onOpen } = useModal();

  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState({});

  const { data: session, status } = useSession();

  if (status !== "loading" && (!session || !session.user)) {
    return redirect("/");
  }

  useEffect(() => {
    loadVideos();
  }, [session]);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/user/video");
      setVideos(res.data.data);
      // console.log(res.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

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
      {videos?.userVideos?.length > 0 ? (
        <div className="w-full flex justify-center flex-wrap">
          {videos.userVideos?.map((v) => {
            return (
              <Fragment key={v.id}>
                <UserVideoCard video={v} />
              </Fragment>
            );
          })}
        </div>
      ) : (
        <p className="text-sm my-4 text-zinc-500 dark:text-zinc-400">
          No videos yet. Upload one.
        </p>
      )}
    </div>
  );
}
