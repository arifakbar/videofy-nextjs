import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../user-avatar";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; //For form Validation
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Trash2 } from "lucide-react";

import { io } from "socket.io-client";

const formSchema = z.object({
  text: z.string().min(2, "Text is required."),
});

export default function Comments({ videoId, initialComments }) {
  const { data: session } = useSession();

  const router = useRouter();
  const [comments, setComments] = useState(initialComments);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketServerUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_SITE_URL
        : "http://localhost:3001";

    const newSocket = io(socketServerUrl);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Listen for new comments
    if (socket) {
      socket.on("comment", (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
      });
    }

    if (socket) {
      socket.on("deleteComment", (deletedCommentId) => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== deletedCommentId)
        );
      });
    }
  }, [socket]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const isLoading = form.formState.isSubmitting || !session;

  const onSubmit = async (values) => {
    try {
      // console.log(values);
      const res = await axios.post(`/api/video/${videoId}/comments`, values);
      if (socket) {
        socket.emit("comment", res.data.data);
      }
      form.reset();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/video/${videoId}/comments/${id}`);
      if (socket) {
        socket.emit("deleteComment", id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-[90%] md:h-[90%] p-1 border border-zinc-500 dark:border-zinc-400 flex flex-col items-start justify-between">
      <div className="h-[85%] w-full pb-2">
        <ScrollArea className="h-full pt-1 flex-1 w-full">
          {comments?.map((c) => {
            return (
              <div key={c?._id} className="flex items-center gap-x-2 mb-3">
                <div
                  onClick={() => router.push(`/user/users/${c?.userId?._id}`)}
                  className="cursor-pointer"
                >
                  <UserAvatar
                    className="w-7 h-7 md:h-7 md:w-7"
                    src={c?.userId?.profilePic}
                  />
                </div>
                <div className="w-full flex items-center justify-between mx-1">
                  <div className="flex flex-col justify-center">
                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                      {c?.text}
                    </p>
                    <small className="text-[8px] text-zinc-500 dark:text-zinc-400">
                      Posted on: {new Date(c?.createdAt).toLocaleString()}
                    </small>
                  </div>
                  {c?.userId?._id === session?.user?.id && (
                    <Trash2
                      className="h-4 w-4 text-red-500 cursor-pointer"
                      onClick={() => handleDelete(c?._id)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="w-full flex gap-x-1 items-center justify-between">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="w-full">
                  {/* <FormMessage className="text-red-500 text-xs" /> */}
                  <FormControl>
                    <Input
                      className="focus-none border border-black dark:border-white bg-transparent dark:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Enter your comment here..."
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading}
              className="focus-none border border-black dark:border-white bg-transparent dark:bg-transparent text-zinc-500 dark:text-zinc-400 font-semibold"
            >
              Post
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
