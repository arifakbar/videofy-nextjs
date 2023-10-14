"use client";

import ActionTooltip from "@/components/ui/action-tooltip";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PlayCircle, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function UserPlaylist() {
  const params = useParams();
  const router = useRouter();

  const { id } = params;

  const [showMore, setShowMore] = useState(false);

  const handleUserClick = () => {
    router.push("/user/users/1");
  };

  const onPlayClick = (id) => {
    router.push(`/user/playlist/${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete ${id}`);
  };

  const vid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultricies dapibus nunc eget dignissim. Pellentesque lacinia maximus mollis. Nulla feugiat tellus nec nibh congue, a euismod lorem pulvinar. Maecenas id velit ac ligula fringilla aliquet ut sit amet risus. Phasellus convallis turpis eu turpis semper, in euismod urna scelerisque. Nam sit amet rhoncus odio. Aliquam at urna eget orci molestie cursus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultricies dapibus nunc eget dignissim. Pellentesque lacinia maximus mollis. Nulla feugiat tellus nec nibh congue, a euismod lorem pulvinar. Maecenas id velit ac ligula fringilla aliquet ut sit amet risus. Phasellus convallis turpis eu turpis semper, in euismod urna scelerisque. Nam sit amet rhoncus odio. Aliquam at urna eget orci molestie cursus.";

  return (
    <div className="p-2 h-[calc(100vh-70px)] flex md:flex-row flex-col items-center justify-between gap-2">
      <div className="w-full md:w-[70%] md:h-full min-h-[60%] flex flex-col gap-2">
        <div className="w-full h-[75%] bg-pink-200">Video Player</div>
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
            <div className="flex gap-x-4 items-center">
              <div className="flex gap-x-2 items-center">
                <ThumbsUp className="h-5 w-5 text-zinc-500 dark:text-zinc-400 cursor-pointer" />{" "}
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                  20
                </p>
              </div>
              <ThumbsDown className="h-5 w-5 text-zinc-500 dark:text-zinc-400 cursor-pointer" />
            </div>
          </div>
          <ScrollArea>
            <div className="max-h-[70px]">
              <p className="hidden md:block text-sm text-zinc-500 dark:text-zinc-400">
                {showMore ? description : description.substring(0, 250)}...{" "}
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="text-xs border-0 text-black dark:text-white cursor-pointer"
                >
                  {showMore ? "show less" : "show more"}
                </button>
              </p>
              <p className="md:hidden text-sm text-zinc-500 dark:text-zinc-400">
                {showMore ? description : description.substring(0, 100)}...{" "}
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="text-xs border-0 text-black dark:text-white cursor-pointer"
                >
                  {showMore ? "show less" : "show more"}
                </button>
              </p>
            </div>
          </ScrollArea>
        </div>
      </div>
      <ScrollArea className="mt-4 md:mt-0 w-full md:w-[29%] border-2 border-zinc-500 dark:border-zinc-400 h-[35%] md:h-full">
        <div className="flex flex-col gap-2 p-2 h-full">
          {vid.map((v) => {
            return (
              <div
                key={v}
                className="flex gap-2 flex-start items-start h-[100px] overflow-hidden"
              >
                <div
                  className="h-full w-[40%] rounded-md relative overflow-hidden cursor-pointer"
                  onClick={() => onPlayClick(v)}
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
                <div className="flex flex-col gap-2 w-[55%]">
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    Video Title
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {description.substring(0, 90)}...
                  </p>
                </div>
                <div className="h-full w-[5%] flex items-center justify-center">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <ActionTooltip label="Delete">
                        <Trash2 className="w-5 h-5 text-zinc-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-500 transition cursor-pointer" />
                      </ActionTooltip>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this Playlist?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>No</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(1)}>
                          Yes
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
