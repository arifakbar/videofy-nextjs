"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; //For form Validation

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";

import { Search as S } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SearchCard from "@/components/card/search-card";
import axios from "axios";
import SpinLoading from "@/components/spinLoading";
import { Badge } from "@/components/ui/badge";
import ProfileCard from "@/components/card/profile-card";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  text: z.string().min(3, "Min. 3 alphabets are required."),
});

export default function Search() {
  const params = useParams();
  const initialText = params.text;

  const [videos, setVideos] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("vid");

  useEffect(() => {
    loadVideo();
  }, [initialText]);

  const loadVideo = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/videos/search/${initialText}`);
      setVideos(res.data.videos);
      setProfiles(res.data.users);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      router.push(values.text);
      form.reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 md:px-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-x-2">
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 h-[50px] dark:border dark:text-white border border-b-white border-b-2 dark:border-b-2 dark:border-b-zinc-500 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Search"
                        {...field}
                      />
                      <Button
                        disabled={isLoading}
                        variant="outline"
                        className="h-[50px] w-[80px]"
                      >
                        <S className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <Separator className="my-4 bg-zinc-500 dark:bg-zinc-400" />

      <div className="flex gap-x-4">
        <Badge
          onClick={() => setView("vid")}
          variant="secondary"
          className="py-2 px-4 cursor-pointer"
        >
          Videos
        </Badge>
        <Badge
          onClick={() => setView("profile")}
          variant="secondary"
          className="py-2 px-4 cursor-pointer"
        >
          Users
        </Badge>
      </div>

      <Separator className="my-4 bg-zinc-500 dark:bg-zinc-400" />
      <ScrollArea>
        <div className="h-[calc(100vh-280px)]">
          {loading ? (
            <SpinLoading />
          ) : view === "vid" ? (
            <div className="flex flex-col gap-y-6">
              {videos.length < 1 ? (
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                  No Results found!
                </p>
              ) : (
                videos?.map((v) => {
                  return <SearchCard video={v} />;
                })
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-y-6 mt-3">
              {profiles.length < 1 ? (
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                  No Results found!
                </p>
              ) : (
                profiles?.map((p) => {
                  return <ProfileCard profile={p} />;
                })
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
