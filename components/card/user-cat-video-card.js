import { PlayCircle, Trash2 } from "lucide-react";
import ActionTooltip from "../ui/action-tooltip";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import SpinLoading from "../spinLoading";
import axios from "axios";

export default function UserCatVideoCard({ type, video }) {
  const onClick = () => {
    if (type == "History") return removeFromHistory();
    if (type == "Liked Videos") return removeFromLikedVideos();
    if (type == "Watch Later") return removeFromWatchlater();
  };

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onPlayClick = () => {
    router.push(`/video/${video._id}`);
  };

  const removeFromWatchlater = async () => {
    const type = "remove";
    try {
      setLoading(true);
      await axios.patch(`/api/user/video/${video._id}/watch_later`, {
        type,
      });
      router.refresh();
      window.location.reload();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const removeFromHistory = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/user/video/${video._id}/history`);
      router.refresh();
      window.location.reload();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const removeFromLikedVideos = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/user/video/${video._id}/liked`);
      router.refresh();
      window.location.reload();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return loading ? (
    <SpinLoading />
  ) : (
    <div className={"w-[300px] m-3"}>
      <div
        className="h-[250px] relative overflow-hidden cursor-pointer"
        onClick={onPlayClick}
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
        <div className="w-full flex items-center justify-between">
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            {video?.name}
          </p>
          <ActionTooltip label="Remove">
            <Trash2
              className="w-5 h-5 cursor-pointer hover:text-red-500 transition"
              onClick={onClick}
            />
          </ActionTooltip>
        </div>
      </div>
    </div>
  );
}
