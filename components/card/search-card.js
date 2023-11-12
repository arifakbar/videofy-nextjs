import Image from "next/image";
import UserAvatar from "../user-avatar";
import ActionTooltip from "../ui/action-tooltip";
import { PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchCard({ video }) {
  const router = useRouter();
  return (
    <div className="flex gap-x-4 flex-col md:flex-row items-center">
      <div className="rounded-md bg-red-500 h-[200px] w-[350px] overflow-hidden relative cursor-pointer">
        <div className="absolute flex w-full h-full cursor-pointer opacity-0 hover:opacity-100 duration-300 z-10 items-center justify-center bg-black bg-opacity-75">
          <ActionTooltip label="Play">
            <PlayCircle className="h-9 w-9 text-zinc-500 dark:text-zinc-400" />
          </ActionTooltip>
        </div>
        <Image src={video?.thumbnail} alt="NF" fill />
      </div>
      <div
        className="h-full w-full flex flex-col px-4 justify-center gap-y-2 bg-zinc-400 dark:bg-zinc-700 hover:backdrop-blur-md hover:bg-opacity-30 dark:hover:bg-opacity-30 transition-all duration-300"
        style={{ borderRadius: "8px" }} // Adjust the border-radius as needed
      >
        <div className="hidden md:flex flex-col h-[200px] w-full gap-y-1 pt-2">
          <h6
            onClick={() => router.push(`/video/${video?._id}`)}
            className="text-zinc-500 dark:text-zinc-500 font-semibold text-xl cursor-pointer"
          >
            {video?.name}
          </h6>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            {video?.views?.length} Views
          </p>
          <div className="flex items-center gap-x-2 my-2 ">
            <div
              onClick={() => router.push(`/user/users/${video?.userId?._id}`)}
            >
              <UserAvatar
                className="cursor-pointer"
                src={video?.userId?.profilePic}
              />
            </div>
            <p
              onClick={() => router.push(`/user/users/${video?.userId?._id}`)}
              className="text-zinc-500 dark:text-zinc-400 text-sm font-semibold cursor-pointer"
            >
              {video?.userId?.name}
            </p>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm h-[60px] w-[100%] overflow-hidden">
            {video?.description}
          </p>
        </div>
      </div>
    </div>
  );
}
