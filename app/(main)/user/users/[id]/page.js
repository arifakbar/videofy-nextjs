"use client";

import VideoCard from "@/components/card/video-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function UsersProfile() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [subscribed, setSubscribed] = useState(true);
  const [btnText, setBtnText] = useState("Unsubscribe");

  const handleClick = () => {
    if (subscribed === true) {
      alert("Unsubscribed");
      setSubscribed(false);
      setBtnText("Subscribe");
      router.refresh();
    } else {
      alert("Subscribed");
      setSubscribed(true);
      setBtnText("Unsubscribe");
      router.refresh();
    }
  };

  return (
    <div className="px-4">
      <div className="flex items-center justify-between w-full py-3">
        <div className="flex items-center gap-4">
          <div className="h-[65px] w-[65px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center overflow-hidden">
            <Image
              src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
              alt="NF"
              width={65}
              height={65}
            />
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-xl font-semibold text-zinc-500 dark:text-zinc-400">
              User name - {id}
            </h3>
            <h3 className="text-sm text-zinc-500 dark:text-zinc-400">
              Subscribers - 20
            </h3>
          </div>
        </div>
        <Button variant="destructive" onClick={handleClick}>
          {btnText}
        </Button>
      </div>
      <Separator className="bg-zinc-500 dark:bg-zinc-400 mb-3" />
      <div className="w-full flex justify-center flex-wrap">
        <VideoCard className="w-[300px] m-3" profile={true} />
        <VideoCard className="w-[300px] m-3" profile={true} />
        <VideoCard className="w-[300px] m-3" profile={true} />
        <VideoCard className="w-[300px] m-3" profile={true} />
        <VideoCard className="w-[300px] m-3" profile={true} />
        <VideoCard className="w-[300px] m-3" profile={true} />
        <VideoCard className="w-[300px] m-3" profile={true} />
        <VideoCard className="w-[300px] m-3" profile={true} />
        <VideoCard className="w-[300px] m-3" profile={true} />
        <VideoCard className="w-[300px] m-3" profile={true} />
        <VideoCard className="w-[300px] m-3" profile={true} />
      </div>
    </div>
  );
}
