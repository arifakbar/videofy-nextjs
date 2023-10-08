import UserAvatar from "@/components/user-avatar";
import { PlayCircle, Trash2 } from "lucide-react";
import ActionTooltip from "../ui/action-tooltip";
import { useModal } from "@/hooks/use-modal";
import { useRouter } from "next/navigation";

export default function UserCatVideoCard({ type, videoId }) {
  const onClick = () => {
    if (type == "History") return alert("Remove From User History");
    if (type == "Liked Videos") return alert("Remove From User Liked Video");
    if (type == "Watch Later") return alert("Remove From User Watch Later");
  };

  const router = useRouter();

  const onPlayClick = () => {
    router.push(`/video/1`);
  };

  return (
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
          src="https://picsum.photos/200/300?random=7"
          alt="Video Banner"
          className="h-full w-full object-fit"
        />
      </div>
      <div className="flex gap-x-3 items-center mt-2">
        <div className="w-full flex items-center justify-between">
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            Video Title
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
