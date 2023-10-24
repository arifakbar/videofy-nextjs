import { Button } from "@/components/ui/button";
import UserAvatar from "../user-avatar";
import WatchLater from "../watch-later/page";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import { useState } from "react";

export default function VideoInfo({ video }) {
  const { onOpen } = useModal();

  // console.log("VID: ", video);

  const [showMore, setShowMore] = useState(false);

  const description = video?.description;

  const router = useRouter();

  const handleUserClick = () => {
    router.push("/user/users/1");
  };

  return (
    <div className="flex flex-col gap-y-2 w-full md:w-[70%]">
      <div className="w-full h-[60vh] bg-green-200">
        <img
          src={video?.thumbnail}
          alt="NF"
          className="w-full h-full object-fill"
        />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-2 items-start w-full">
          <h3 className="text-xl font-semibold text-black dark:text-white">
            {video?.name}
          </h3>
          <div className="w-full flex gap-y-4 md:items-center justify-between">
            <div className="flex gap-x-2 items-center">
              <div onClick={handleUserClick} className="cursor-pointer over">
                <UserAvatar src={video?.userId?.profilePic} />
              </div>
              <div>
                <p
                  onClick={handleUserClick}
                  className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 cursor-pointer"
                >
                  {video?.userId?.name}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {video?.userId?.subscribers} Subscribers
                </p>
              </div>
            </div>
            <div className="h-full flex justify-center md:flex-row flex-col gap-y-2 md:gap-x-2">
              <WatchLater />
              <Button
                variant="outline"
                onClick={() => onOpen("playlists", { toAdd: true })}
              >
                Add to Playlist
              </Button>
            </div>
          </div>
          {description?.lenght > 250 ? (
            <div className="">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {showMore ? description : description?.substring(0, 250)}
                ...{" "}
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="text-xs border-0 text-black dark:text-white cursor-pointer"
                >
                  {showMore ? "show less" : "show more"}
                </button>
              </p>
            </div>
          ) : (
            <div className="">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
