import UserVideoCard from "@/components/card/user-video-card";
import { Separator } from "@/components/ui/separator";

export default function UserVideos() {
  return (
    <div>
      <h3 className="ml-3 text-2xl my-4 font-semibold text-zinc-500 dark:text-zinc-400">
        Your Videos
      </h3>
      <Separator className="h-1 bg-zinc-500 dark:bg-zinc-400" />
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
