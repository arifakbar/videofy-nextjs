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
import { useEffect, useState } from "react";
import SpinLoading from "@/components/spinLoading";
import axios from "axios";

export default function UserPlaylist() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [mainVideo, setMainVideo] = useState({});

  const { id } = params;

  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    loadPlaylist();
  }, [id]);

  const loadPlaylist = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/user/playlists/${id}`);
      setVideos(res.data.data.videos);
      loadMainVideo(res.data.data.videos[0]._id);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const loadMainVideo = async (videoId) => {
    try {
      const res = await axios.get(`/api/video/${videoId}`);
      setMainVideo(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserClick = (id) => {
    router.push(`/user/users/${id}`);
  };

  const onPlayClick = (id) => {
    loadMainVideo(id);
  };

  const handleDelete = async (videoId) => {
    try {
      setLoading(true);
      await axios.patch(`/api/user/playlists/${id}`, {
        videoId,
        type: "remove",
      });
      setLoading(false);
      loadPlaylist();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const description = mainVideo?.description;

  return loading ? (
    <SpinLoading />
  ) : (
    <div className="p-2 h-[calc(100vh-70px)] flex md:flex-row flex-col items-center justify-between gap-2">
      {videos.length < 1 ? (
        <div className="h-full w-full m-2">
          <p className="text-sm text-zinc-400 dark:text-zinc-500 font-semibold">
            No vidoes yet. Add some!
          </p>
        </div>
      ) : (
        <>
          <div className="w-full md:w-[70%] md:h-full min-h-[60%] flex flex-col gap-2">
            <div className="w-full h-[75%] bg-pink-200">
              <img
                src={mainVideo?.thumbnail}
                alt="NF"
                className="w-full h-full object-fill"
              />
            </div>
            <div className="flex flex-col gap-y-2 items-start w-full">
              <h3 className="text-xl font-semibold text-black dark:text-white">
                {mainVideo?.name}
              </h3>
              <div className="w-full flex gap-y-4 md:items-center justify-between">
                <div className="flex gap-x-2 items-center">
                  <div
                    onClick={() => handleUserClick(mainVideo?.userId?._id)}
                    className="cursor-pointer"
                  >
                    <UserAvatar src={mainVideo?.userId?.profilePic} />
                  </div>
                  <div>
                    <p
                      onClick={handleUserClick}
                      className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 cursor-pointer"
                    >
                      {mainVideo?.userId?.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {mainVideo?.userId?.subscribers} Subscribers
                    </p>
                  </div>
                </div>
              </div>
              <ScrollArea>
                <div className="max-h-[70px]">
                  {description?.lenght > 250 ? (
                    <div className="">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {showMore
                          ? description
                          : description?.substring(0, 250)}
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
              </ScrollArea>
            </div>
          </div>
          <ScrollArea className="mt-4 md:mt-0 w-full md:w-[29%] border-2 border-zinc-500 dark:border-zinc-400 h-[35%] md:h-full">
            <div className="flex flex-col gap-2 p-2 h-full">
              {videos?.map((v) => {
                return (
                  <div
                    key={v._id}
                    className="flex gap-2 flex-start items-start h-[100px] overflow-hidden"
                  >
                    <div
                      className="h-full w-[40%] rounded-md relative overflow-hidden cursor-pointer"
                      onClick={() => onPlayClick(v._id)}
                    >
                      <div className="absolute flex w-full h-full cursor-pointer opacity-0 hover:opacity-100 duration-300 z-10 items-center justify-center bg-black bg-opacity-75">
                        <ActionTooltip label="Play">
                          <PlayCircle className="h-9 w-9 text-zinc-500 dark:text-zinc-400" />
                        </ActionTooltip>
                      </div>
                      <img
                        src={v?.thumbnail}
                        alt="Video Banner"
                        className="h-full w-full object-fit"
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-[55%]">
                      <h3 className="text-lg font-semibold text-black dark:text-white">
                        {v?.name}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {v?.description?.substring(0, 90)}...
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
                              Are you sure you want to remove this video from
                              playlist?
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>No</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(v._id)}
                            >
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
        </>
      )}
    </div>
  );
}
