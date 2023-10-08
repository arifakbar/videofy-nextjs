import UserVideoCard from "@/components/card/user-video-card";
import { Separator } from "@/components/ui/separator";

export default function UserVideos() {
  return (
    <div className="px-4">
      <h3 className="text-2xl my-4 font-semibold text-zinc-500 dark:text-zinc-400">
        Your Videos
      </h3>
      <Separator className="bg-zinc-500 dark:bg-zinc-400 my-3" />
      <div className="w-full flex justify-center flex-wrap">
        <UserVideoCard />
        <UserVideoCard />
        <UserVideoCard />
        <UserVideoCard />
        <UserVideoCard />
        <UserVideoCard />
        <UserVideoCard />
        <UserVideoCard />
        <UserVideoCard />
        <UserVideoCard />
        <UserVideoCard />
      </div>
    </div>
  );
}
