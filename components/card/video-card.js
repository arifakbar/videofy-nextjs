"use client";

import UserAvatar from "@/components/user-avatar";
import { PlayCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import ActionTooltip from "../ui/action-tooltip";
import { useState } from "react";

export default function VideoCard({ className, profile }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    alert("Like Video");
    setIsLiked(true);
  };

  const handleUnlike = () => {
    alert("Unliked Video");
    setIsLiked(false);
  };

  return (
    <div className={className ? className : "w-[350px] m-5"}>
      <div className="h-[250px] relative overflow-hidden cursor-pointer">
        <div className="absolute flex w-full h-full cursor-pointer opacity-0 hover:opacity-100 duration-300 z-10 items-center justify-center bg-black bg-opacity-75">
          <ActionTooltip label="Play">
            <PlayCircle className="h-9 w-9 text-zinc-500 dark:text-zinc-400" />
          </ActionTooltip>
        </div>
        <img
          src="https://picsum.photos/200/300?random=7"
          alt="Video Banner"
          className="h-full w-full object-fit"
        />
      </div>
      <div className="flex gap-x-3 items-center mt-2">
        {!profile && (
          <UserAvatar
            className="cursor-pointer"
            src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
          />
        )}
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-[75%] justify-center">
            <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Video Title
            </p>
            {profile && (
              <small className="text-xs text-zinc-500 dark:text-zinc-400">
                20 views - 10 likes
              </small>
            )}
            {!profile && (
              <small className="text-xs text-zinc-500 dark:text-zinc-400 cursor-pointer">
                Uploader Name
              </small>
            )}
          </div>
          {!profile && (
            <small className="text-xs text-zinc-500 dark:text-zinc-400">
              20 views
            </small>
          )}
          {profile && !isLiked && (
            <ActionTooltip label="Like">
              <ThumbsUp
                className="w-5 h-5 cursor-pointer hover:text-blue-500 transition"
                onClick={handleLike}
              />
            </ActionTooltip>
          )}
          {profile && isLiked && (
            <ActionTooltip label="Like">
              <ThumbsDown
                className="w-5 h-5 cursor-pointer hover:text-red-500 transition"
                onClick={handleUnlike}
              />
            </ActionTooltip>
          )}
        </div>
      </div>
    </div>
  );
}
