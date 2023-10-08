import Image from "next/image";
import UserAvatar from "../user-avatar";
import ActionTooltip from "../ui/action-tooltip";
import { PlayCircle } from "lucide-react";

export default function SearchCard() {
  return (
    <div className="flex gap-x-3 flex-col md:flex-row items-center">
      <div className="h-[200px] w-[350px] overflow-hidden relative cursor-pointer">
        <div className="absolute flex w-full h-full cursor-pointer opacity-0 hover:opacity-100 duration-300 z-10 items-center justify-center bg-black bg-opacity-75">
          <ActionTooltip label="Play">
            <PlayCircle className="h-9 w-9 text-zinc-500 dark:text-zinc-400" />
          </ActionTooltip>
        </div>
        <Image
          src="https://picsum.photos/200/300?random=7"
          alt="NF"
          width={350}
          height={200}
          className="object-fit"
        />
      </div>
      <div className="hidden md:flex flex-col h-[200px] w-full gap-y-1">
        <h6 className="text-dark dark:text-white font-semibold text-xl cursor-pointer">
          Video Title
        </h6>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">20 Views</p>
        <div className="flex items-center gap-x-2 my-2 ">
          <UserAvatar
            className="cursor-pointer"
            src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
          />
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-semibold cursor-pointer">
            User name
          </p>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Description</p>
      </div>
      <div className="md:hidden flex gap-x-3 items-center mt-2 w-[300px]">
        <UserAvatar
          className="cursor-pointer"
          src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
        />
        <div className="w-full flex items-center justify-between ">
          <div className="flex flex-col items-start w-[75%] justify-center">
            <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Video Title
            </p>
            <small className="text-xs text-zinc-500 dark:text-zinc-400 cursor-pointer">
              Uploader Name
            </small>
          </div>
          <small className="text-xs text-zinc-500 dark:text-zinc-400">
            20 views
          </small>
        </div>
      </div>
    </div>
  );
}
