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

const formSchema = z.object({
  text: z.string().min(2, "Text is required."),
});

export default function Comments({ videoId, initialComments }) {
  const { data: session } = useSession();

  const router = useRouter();
  const [comments, setComments] = useState(initialComments);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      console.log(values);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const handleClose = () => {
    form.reset();
  };

  return (
    <div className="h-[90%] md:h-[90%] p-1 border border-zinc-500 dark:border-zinc-400 flex flex-col items-start justify-between">
      <div className="h-[90%] w-full">
        <ScrollArea className="h-full pt-1 flex-1 w-full">
          {comments?.map((c) => {
            return (
              <div key={c?._id} className="flex items-center gap-x-2 mb-3">
                <div
                  onClick={() => router.push(`/user/users/${c?.userId?._id}`)}
                  className="cursor-pointer"
                >
                  <UserAvatar
                    className="w-6 h-6 md:h-6 md:w-6"
                    src={c?.userId?.profilePic}
                  />
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {c?.text}
                </p>
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

{
  /* <div className="w-full flex gap-x-1 items-center justify-between">
            <Input
              className="focus-none border border-black dark:border-white bg-transparent dark:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Enter your comment here..."
              {...field}
              disabled={isLoading}
            />
            <Button className="focus-none border border-black dark:border-white bg-transparent dark:bg-transparent text-zinc-500 dark:text-zinc-400 font-semibold">
              Post
            </Button>
          </div> */
}
