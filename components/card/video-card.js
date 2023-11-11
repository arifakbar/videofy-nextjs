"use client";

import UserAvatar from "@/components/user-avatar";
import { PlayCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import ActionTooltip from "../ui/action-tooltip";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VideoCard({ className, profile, video }) {
  const [isLiked, setIsLiked] = useState(false);

  const router = useRouter();

  const onClick = () => {
    router.push(`/video/${video._id}`);
  };

  const onUserClick = () => {
    router.push(`/user/users/${video?.userId._id}`);
  };

  return (
    <div className={className ? className : "w-[350px] m-5"}>
      <div
        className="h-[250px] relative overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <div className="absolute flex w-full h-full cursor-pointer opacity-0 hover:opacity-100 duration-300 z-10 items-center justify-center bg-black bg-opacity-75">
          <ActionTooltip label="Play">
            <PlayCircle className="h-9 w-9 text-zinc-500 dark:text-zinc-400" />
          </ActionTooltip>
        </div>
        <img
          src={video?.thumbnail}
          alt="Video Banner"
          className="h-full w-full object-fit"
        />
      </div>
      <div className="flex gap-x-3 items-center mt-2">
        {!profile && (
          <div onClick={onUserClick}>
            <UserAvatar
              className="cursor-pointer"
              src={video?.userId?.profilePic}
            />
          </div>
        )}
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-[75%] justify-center">
            <p
              className="text-sm font-semibold text-zinc-500 dark:text-zinc-400"
              onClick={onClick}
            >
              {video?.name}
            </p>
            {profile && (
              <small className="text-xs text-zinc-500 dark:text-zinc-400">
                {video?.views?.length} views - {video?.likes?.length} likes
              </small>
            )}
            {!profile && (
              <small
                className="text-xs text-zinc-500 dark:text-zinc-400 cursor-pointer"
                onClick={onUserClick}
              >
                {video?.userId?.name}
              </small>
            )}
          </div>
          {!profile && (
            <small className="text-xs text-zinc-500 dark:text-zinc-400">
              {video?.views?.length} views
            </small>
          )}
        </div>
      </div>
    </div>
  );
}
