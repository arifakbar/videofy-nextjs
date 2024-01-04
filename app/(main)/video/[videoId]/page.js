"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { ThumbsDown, ThumbsUp } from "lucide-react";

import Comments from "@/components/section/comments";
import VideoCard from "@/components/card/video-card";
import VideoInfo from "@/components/section/video-info";
import { useEffect, useState } from "react";
import axios from "axios";
import SpinLoading from "@/components/spinLoading";
import { useSession } from "next-auth/react";
import ActionTooltip from "@/components/ui/action-tooltip";
import { io } from "socket.io-client";

export default function Video() {
  const params = useParams();
  const { videoId } = params;
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState({});
  const [relatedVideos, setRelatedVideos] = useState([]);

  const { data: session } = useSession();

  //liked, unliked, disliked, undisliked

  const [liked, setLiked] = useState(false);
  const [unliked, setUnliked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [undisliked, setUndisliked] = useState(false);

  const [subscribed, setSubscribed] = useState(false);

  const [totalLikes, setTotalLikes] = useState([]);
  const [totalDislikes, setTotalDislikes] = useState([]);

  useEffect(() => {
    loadVideo();
  }, [videoId, session?.user?.id]);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketServerUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_SITE_URL
        : "http://localhost:3001";

    // console.log("socketServerUrl: ", socketServerUrl);

    const newSocket = io(socketServerUrl);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to like server");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Listen for new likes
    if (socket) {
      socket.on("liked", (newUserId) => {
        setTotalLikes((prevUserIds) => [...prevUserIds, newUserId]);
        setTotalDislikes((prevUserIds) =>
          prevUserIds.filter((userId) => userId !== newUserId)
        );
      });
    }

    if (socket) {
      socket.on("unliked", (removedUserId) => {
        setTotalLikes((prevUserIds) =>
          prevUserIds.filter((userId) => userId !== removedUserId)
        );
      });
    }

    if (socket) {
      socket.on("disliked", (newUserId) => {
        setTotalDislikes((prevUserIds) => [...prevUserIds, newUserId]);
        setTotalLikes((prevUserIds) =>
          prevUserIds.filter((userId) => userId !== newUserId)
        );
      });
    }

    if (socket) {
      socket.on("undisliked", (removedUserId) => {
        setTotalDislikes((prevUserIds) =>
          prevUserIds.filter((userId) => userId !== removedUserId)
        );
      });
    }
  }, [socket]);

  const loadVideo = async () => {
    try {
      setLoading(true);
      let res = {};
      if (session?.user) {
        res = await axios.patch(`/api/video/${videoId}`, {
          userId: session.user.id,
        });
      } else {
        res = await axios.get(`/api/video/${videoId}`);
      }
      // console.log(res.data.data);
      setVideo(res.data.data);
      const res2 = await axios.get(`/api/videos/${res.data.data.category}`);
      setRelatedVideos(res2.data.data);
      if (res.data.data?.likes.includes(session.user.id)) setLiked(true);
      if (res.data.data?.dislikes.includes(session.user.id)) setDisliked(true);
      if (res.data.data?.userId?.subscribers.includes(session.user.id));
      setTotalDislikes(res.data.data.dislikes);
      setTotalLikes(res.data.data.likes);
      setSubscribed(true);
      // console.log("RES: ", res.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const updatedVideo = async (liked, unliked, disliked, undisliked) => {
    try {
      const res = await axios.patch(`/api/user/video/${videoId}`, {
        liked,
        unliked,
        disliked,
        undisliked,
      });
      // setTotalDislikes(res.data.data.dislikes);
      // setTotalLikes(res.data.data.likes);
      // console.log("UPDATED:", res.data.data);
      // setVideo({
      //   ...video,
      //   likes: res.data.data.likes,
      //   dislikes: res.data.data.dislikes,
      // });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (type) => {
    if (!session?.user) return;
    if (type === "liked") {
      if (liked === false) {
        setLiked(true);
        setDisliked(false);
        setUnliked(false);
        setDisliked(false);
        if (socket) {
          socket.emit("liked", session?.user?.id);
        }
        updatedVideo(true, false, false, false);
      } else {
        setUnliked(true);
        setLiked(false);
        setDisliked(false);
        setUndisliked(false);
        if (socket) {
          socket.emit("unliked", session?.user?.id);
        }
        updatedVideo(false, true, false, false);
      }
    } else {
      if (disliked === false) {
        setDisliked(true);
        setLiked(false);
        setUndisliked(false);
        setUnliked(false);
        if (socket) {
          socket.emit("disliked", session?.user?.id);
        }
        updatedVideo(false, false, true, false);
      } else {
        setUndisliked(true);
        setDisliked(false);
        setLiked(false);
        setUnliked(false);
        if (socket) {
          socket.emit("undisliked", session?.user?.id);
        }
        updatedVideo(false, false, false, true);
      }
    }
  };

  const handleSubscribe = async () => {
    try {
      if (subscribed === true) {
        // alert("remove");
        const res = await axios.patch(
          `/api/user/${video?.userId?._id}/subscribe`,
          {
            type: "remove",
          }
        );
        setSubscribed(false);
      } else {
        // alert("add");
        const res = await axios.patch(
          `/api/user/${video?.userId?._id}/subscribe`,
          {
            type: "add",
          }
        );
        setSubscribed(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return loading ? (
    <SpinLoading />
  ) : (
    <div className="p-4">
      <div className="mb-4 flex flex-col md:flex-row justify-between">
        <VideoInfo video={video} />
        <div className="h-[40vh] my-2 md:my-0 md:h-[60vh] md:w-[29%] flex flex-col gap-y-4 md:gap-y-0 md:justify-between">
          <div className="h-[10%] flex justify-between items-center md:mb-2">
            <div className="flex gap-x-4">
              <div className="flex gap-x-2 items-center">
                <ThumbsUp
                  onClick={() => handleClick("liked")}
                  className={`h-5 w-5 ${
                    liked
                      ? "text-red-500 dark:text-red-400"
                      : "text-zinc-500 dark:text-zinc-400"
                  } ${session?.user ? "cursor-pointer" : "cursor-not-allowed"}`}
                />{" "}
                <p
                  className="text-sm font-semibold 
                text-zinc-500 dark:text-zinc-400"
                >
                  {/* {video?.likes?.length} */}
                  {totalLikes?.length}
                </p>
              </div>
              <div className="flex gap-x-2 items-center">
                <ThumbsDown
                  onClick={() => handleClick("disliked")}
                  className={`h-5 w-5 ${
                    disliked
                      ? "text-red-500 dark:text-red-400"
                      : "text-zinc-500 dark:text-zinc-400"
                  } ${session?.user ? "cursor-pointer" : "cursor-not-allowed"}`}
                />
                <p
                  className="text-sm font-semibold 
                text-zinc-500 dark:text-zinc-400"
                >
                  {/* {video?.dislikes?.length} */}
                  {totalDislikes?.length}
                </p>
              </div>
            </div>
            {session?.user?.id !== video?.userId?._id && (
              <>
                {session?.user ? (
                  <Button variant="outline" onClick={handleSubscribe}>
                    {!subscribed ? "Subscribe" : "Unsubscribe"}
                  </Button>
                ) : (
                  <ActionTooltip label="Login to Subscribe">
                    <Button variant="disabled">Subscribe</Button>
                  </ActionTooltip>
                )}
              </>
            )}
          </div>
          <Comments videoId={videoId} initialComments={video?.comments} />
        </div>
      </div>
      <Separator className="bg-zinc-500 dark:bg-zinc-400" />
      <div className=" mt-4 w-full flex justify-center flex-wrap">
        {relatedVideos?.map((r) => {
          if (r._id !== videoId)
            return (
              <VideoCard key={r._id} className="w-[300px] m-3" video={r} />
            );
        })}
      </div>
    </div>
  );
}
