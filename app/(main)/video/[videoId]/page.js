"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import UserAvatar from "@/components/user-avatar";
import { useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function Video() {
  const params = useParams();
  const { videoId } = params;

  const [showMore, setShowMore] = useState(false);

  const router = useRouter();

  const handleUserClick = () => {
    router.push("/user/users/1");
  };

  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultricies dapibus nunc eget dignissim. Pellentesque lacinia maximus mollis. Nulla feugiat tellus nec nibh congue, a euismod lorem pulvinar. Maecenas id velit ac ligula fringilla aliquet ut sit amet risus. Phasellus convallis turpis eu turpis semper, in euismod urna scelerisque. Nam sit amet rhoncus odio. Aliquam at urna eget orci molestie cursus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultricies dapibus nunc eget dignissim. Pellentesque lacinia maximus mollis. Nulla feugiat tellus nec nibh congue, a euismod lorem pulvinar. Maecenas id velit ac ligula fringilla aliquet ut sit amet risus. Phasellus convallis turpis eu turpis semper, in euismod urna scelerisque. Nam sit amet rhoncus odio. Aliquam at urna eget orci molestie cursus.";

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col md:flex-row justify-between">
        <div className="flex flex-col gap-y-2 w-full md:w-[70%]">
          <div className="w-full h-[60vh] bg-green-200">Video Player</div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-y-2 items-start w-[78%]">
              <h3 className="text-xl font-semibold text-black dark:text-white">
                Video Title
              </h3>
              <div className="flex gap-x-2 items-center">
                <div onClick={handleUserClick}>
                  <UserAvatar src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                    User name
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    20 Subscribers
                  </p>
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
            <div className="h-full flex flex-col justify-center gap-y-2">
              <Button variant="outline">Add to Watch Later</Button>
              <Button variant="outline">Add to Playlist</Button>
            </div>
          </div>
        </div>
        <div className="h-[60vh] md:w-[28%] flex flex-col justify-between">
          <div className="h-[10%] flex justify-between items-center ">
            <div className="flex gap-x-4">
              <div className="flex gap-x-2 items-center">
                <ThumbsUp className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />{" "}
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                  20
                </p>
              </div>
              <ThumbsDown className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
            </div>
            <Button variant="outline">Subscribe</Button>
          </div>
          <div className="h-[90%] bg-yellow-200">Comments</div>
        </div>
      </div>
      <Separator className="bg-zinc-500 dark:bg-zinc-400" />
      <div>Lower</div>
    </div>
  );
}
