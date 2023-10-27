"use client";

import { Separator } from "@/components/ui/separator";
import { useParams, redirect } from "next/navigation";
import UserCatVideoCard from "@/components/card/user-cat-video-card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SpinLoading from "@/components/spinLoading";
import axios from "axios";
import { useSession } from "next-auth/react";

const avail = ["History", "Watch Later", "Liked Videos"];

function UserCategories() {
  const params = useParams();
  const { category } = params;

  if (!avail.includes(decodeURI(category))) return redirect("/");

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    loadVideos();
  }, [session]);

  const loadVideos = async () => {
    let search = "";
    if (decodeURI(category) === "History") search = "history";
    if (decodeURI(category) === "Watch Later") search = "watch_later";
    if (decodeURI(category) === "Liked Videos") search = "liked";
    try {
      setLoading(true);
      const res = await axios.get(`/api/user/video/${search}`);
      if (decodeURI(category) === "History") setVideos(res.data.data?.history);
      if (decodeURI(category) === "Watch Later")
        setVideos(res.data.data?.watchLater);
      if (decodeURI(category) === "Liked Videos")
        setVideos(res.data.data?.likedVideos);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return loading ? (
    <SpinLoading />
  ) : (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl">{decodeURI(category)}</h2>
        <Button variant="outline">Remove All</Button>
      </div>
      <Separator className="h-[2px] bg-zinc-500 dark:bg-zinc-700 rounded-md w-full" />
      <div className="w-full flex justify-center flex-wrap">
        {videos &&
          videos?.map((v) => {
            return <UserCatVideoCard type={decodeURI(category)} video={v} />;
          })}
      </div>
    </div>
  );
}

export default UserCategories;
