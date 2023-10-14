"use client";

import { Separator } from "@/components/ui/separator";
import { useParams, redirect } from "next/navigation";
import UserCatVideoCard from "@/components/card/user-cat-video-card";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const avail = ["History", "Watch Later", "Liked Videos"];

function UserCategories() {
  const params = useParams();
  const { category } = params;

  if (!avail.includes(decodeURI(category))) return redirect("/");

  const [video, setVideo] = useState({});

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl">{decodeURI(category)}</h2>
        <Button variant="outline">Remove All</Button>
      </div>
      <Separator className="h-[2px] bg-zinc-500 dark:bg-zinc-700 rounded-md w-full" />
      <div className="w-full flex justify-center flex-wrap">
        <UserCatVideoCard type={decodeURI(category)} videoId={video._id} />
        <UserCatVideoCard type={decodeURI(category)} videoId={video._id} />
        <UserCatVideoCard type={decodeURI(category)} videoId={video._id} />
        <UserCatVideoCard type={decodeURI(category)} videoId={video._id} />
        <UserCatVideoCard type={decodeURI(category)} videoId={video._id} />
        <UserCatVideoCard type={decodeURI(category)} videoId={video._id} />
        <UserCatVideoCard type={decodeURI(category)} videoId={video._id} />
        <UserCatVideoCard type={decodeURI(category)} videoId={video._id} />
        <UserCatVideoCard type={decodeURI(category)} videoId={video._id} />
        <UserCatVideoCard type={decodeURI(category)} videoId={video._id} />
        <UserCatVideoCard type={decodeURI(category)} videoId={video._id} />
      </div>
    </div>
  );
}

export default UserCategories;
