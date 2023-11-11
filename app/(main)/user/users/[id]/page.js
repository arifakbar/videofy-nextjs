"use client";

import VideoCard from "@/components/card/video-card";
import SpinLoading from "@/components/spinLoading";
import ActionTooltip from "@/components/ui/action-tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersProfile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [subscribed, setSubscribed] = useState(false);

  const { data: session, status } = useSession();

  // if (status !== "loading" && (!session || !session.user)) {
  //   return redirect("/");
  // }

  useEffect(() => {
    if (session?.user) {
      if (session.user.id === id) {
        router.push(`/user/videos`);
      }
    }
  }, [session]);

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/user/${id}`);
      setUser(res.data.data);
      if (res.data.data?.subscribers.includes(session.user.id))
        setSubscribed(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleSubscribe = async () => {
    try {
      if (subscribed === true) {
        // alert("remove");
        const res = await axios.patch(`/api/user/${user?._id}/subscribe`, {
          type: "remove",
        });
        setSubscribed(false);
      } else {
        // alert("add");
        const res = await axios.patch(`/api/user/${user?._id}/subscribe`, {
          type: "add",
        });
        setSubscribed(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return loading ? (
    <SpinLoading />
  ) : (
    <div className="px-4">
      <div className="flex md:flex-row flex-col md:items-center md:justify-between w-full py-3 gap-y-2">
        <div className="flex items-center gap-4">
          <div className="h-[65px] w-[65px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center overflow-hidden">
            <Image src={user?.profilePic} alt="NF" width={65} height={65} />
          </div>
          <div className="flex flex-col items-start">
            <h3 className="md:text-xl font-semibold text-zinc-500 dark:text-zinc-400">
              User name - {user?.name}
            </h3>
            <h3 className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
              Subscribers - {user?.subscribers?.length}
            </h3>
          </div>
        </div>
        {session?.user ? (
          <Button variant="outline" onClick={handleSubscribe}>
            {!subscribed ? "Subscribe" : "Unsubscribe"}
          </Button>
        ) : (
          <ActionTooltip label="Login to Subscribe">
            <Button variant="disabled">Subscribe</Button>
          </ActionTooltip>
        )}
      </div>
      <Separator className="bg-zinc-500 dark:bg-zinc-400 mb-3" />
      <div className="w-full flex justify-center flex-wrap">
        {user?.userVideos?.map((v) => {
          return (
            <VideoCard className="w-[300px] m-3" profile={true} video={v} />
          );
        })}
      </div>
    </div>
  );
}
