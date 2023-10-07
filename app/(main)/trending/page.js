import VideoCard from "@/components/card/video-card";
import { Separator } from "@/components/ui/separator";

export default function Trending() {
  //Desc with no. of views

  return (
    <div>
      <h3 className="ml-3 text-2xl my-4 font-semibold text-zinc-500 dark:text-zinc-400">
        Trending Videos
      </h3>
      <Separator className="h-1 bg-zinc-500 dark:bg-zinc-400" />
      <div className="w-full flex justify-center flex-wrap">
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
        <VideoCard className="w-[300px] m-3" />
      </div>
    </div>
  );
}
