import { Button } from "@/components/ui/button";
import UserAvatar from "../user-avatar";
import WatchLater from "../watch-later/page";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import { useState } from "react";

export default function VideoInfo() {
  const { onOpen } = useModal();

  const [showMore, setShowMore] = useState(false);

  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultricies dapibus nunc eget dignissim. Pellentesque lacinia maximus mollis. Nulla feugiat tellus nec nibh congue, a euismod lorem pulvinar. Maecenas id velit ac ligula fringilla aliquet ut sit amet risus. Phasellus convallis turpis eu turpis semper, in euismod urna scelerisque. Nam sit amet rhoncus odio. Aliquam at urna eget orci molestie cursus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultricies dapibus nunc eget dignissim. Pellentesque lacinia maximus mollis. Nulla feugiat tellus nec nibh congue, a euismod lorem pulvinar. Maecenas id velit ac ligula fringilla aliquet ut sit amet risus. Phasellus convallis turpis eu turpis semper, in euismod urna scelerisque. Nam sit amet rhoncus odio. Aliquam at urna eget orci molestie cursus.";

  const router = useRouter();

  const handleUserClick = () => {
    router.push("/user/users/1");
  };
  return (
    <div className="flex flex-col gap-y-2 w-full md:w-[70%]">
      <div className="w-full h-[60vh] bg-green-200">Video Player</div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-2 items-start w-full">
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Video Title
          </h3>
          <div className="w-full flex gap-y-4 md:items-center justify-between">
            <div className="flex gap-x-2 items-center">
              <div onClick={handleUserClick} className="cursor-pointer">
                <UserAvatar src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" />
              </div>
              <div>
                <p
                  onClick={handleUserClick}
                  className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 cursor-pointer"
                >
                  User name
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  20 Subscribers
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
          <div className="">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {showMore ? description : description.substring(0, 250)}...{" "}
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-xs border-0 text-black dark:text-white cursor-pointer"
              >
                {showMore ? "show less" : "show more"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
