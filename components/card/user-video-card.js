"use client";

import { Edit2, PlayCircle, Trash2 } from "lucide-react";
import ActionTooltip from "../ui/action-tooltip";
import { useModal } from "@/hooks/use-modal";
import { useRouter } from "next/navigation";

export default function UserVideoCard({ video }) {
  const { onOpen } = useModal();

  const router = useRouter();

  // console.log("V: ", video);

  const onClick = () => {
    router.push(`/video/${video?._id}`);
  };

  return (
    <div className="w-[300px] m-3">
      <div
        onClick={onClick}
        className="h-[250px] relative overflow-hidden cursor-pointer"
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
        <div className="flex flex-col items-start w-[80%] justify-center">
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            {video?.name}
          </p>
          <div className="flex gap-x-2 items-center">
            <small className="text-xs text-zinc-500 dark:text-zinc-400">
              {video?.views} views
            </small>
            <p>-</p>
            <small className="text-xs text-zinc-500 dark:text-zinc-400">
              {video?.likes} Likes
            </small>
            <p>-</p>
            <small className="text-xs text-zinc-500 dark:text-zinc-400">
              {video?.dislikes} Dislikes
            </small>
          </div>
          <small className="text-xs text-zinc-500 dark:text-zinc-400">
            Category - <b>{video?.category}</b>
          </small>
        </div>
        <div className="flex gap-x-3">
          <ActionTooltip label="Edit">
            <Edit2
              className="w-5 h-5 cursor-pointer hover:text-green-500"
              onClick={() => onOpen("editUserVideo", { video: {}, user: {} })}
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash2
              className="w-5 h-5 cursor-pointer hover:text-red-500 transition"
              onClick={() => onOpen("deleteUserVideo", { video: {}, user: {} })}
            />
          </ActionTooltip>
        </div>
      </div>
    </div>
  );
}
