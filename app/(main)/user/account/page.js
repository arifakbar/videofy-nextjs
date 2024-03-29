"use client";
import { useState } from "react";

import SpinLoading from "@/components/spinLoading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

function UserAccount() {
  const [loading, setLoading] = useState(false);
  const { onOpen } = useModal();

  const [currentUser, setCurrentUser] = useState({});

  const { data: session, status } = useSession();

  const router = useRouter();

  if (status !== "loading" && (!session || !session.user)) {
    return redirect("/");
  }

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/user/currentUser");
      console.log(res.data.data);
      setCurrentUser(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return loading ? (
    <SpinLoading />
  ) : (
    <div className="flex flex-row h-[calc(100vh-70px)] items-center">
      <div className="relative flex flex-col h-full w-[65%] items-center justify-center">
        <div className="relative p-6 w-full md:w-[90%] lg:w-[80%] xl:w-[70%]  flex flex-col items-center md:flex-row md:gap-x-4 gap-y-4 bg-white dark:bg-[#1E1F22] border border-gray-500 dark:border-gray-400 rounded-md shadow-md">
          <div className="flex-shrink-0">
            <Avatar className="h-32 w-32 md:h-40 md:w-40">
              <AvatarImage src={currentUser?.profilePic} />
            </Avatar>
          </div>
          <div className="md:h-40 md:w-1 bg-gray-500 dark:bg-gray-400 md:mx-2" />
          <div className="flex flex-col items-center md:items-start justify-center">
            <h3 className="text-gray-500 dark:text-gray-400 font-semibold text-3xl mb-2">
              Your Details
            </h3>
            <Separator className="my-2 bg-gray-600 dark:bg-gray-500 h-px w-16" />
            <p className="text-gray-500 dark:text-gray-400 font-medium p-2 rounded-md my-1">
              📧 Email: {currentUser?.email}
            </p>
            <p className="text-gray-500 dark:text-gray-400 font-medium p-2 rounded-md my-1">
              👤 Display Name: {currentUser?.name}
            </p>
            <p className="text-gray-500 dark:text-gray-400 font-medium p-2 rounded-md my-1">
              📈 Subscribers: {currentUser?.subscribers?.length}
            </p>
            <p className="text-gray-500 dark:text-gray-400 font-medium p-2 rounded-md my-1">
              📅 Joined: {new Date(currentUser?.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="absolute flex items-center justify-center top-0 left-1/2 transform -translate-x-1/2 -mt-4 w-8 h-8 bg-white dark:bg-[#1E1F22] border border-gray-500 dark:border-gray-400 rounded-full">
            <div className="w-4 h-4 bg-[#E3E5E8] dark:bg-[#313338] border border-gray-500 dark:border-gray-400 rounded-full" />
          </div>
        </div>
        <Button
          onClick={() => onOpen("userUpdate", { user: {} })}
          variant="outline"
          className="mt-4 px-6 py-2 text-white bg-gray-600 dark:bg-gray-700 border border-gray-500 dark:border-gray-600 rounded-full hover:bg-opacity-80 transition duration-300 shadow-md"
        >
          Update Profile
        </Button>
      </div>
      <div className="flex items-center h-full w-[35%]">
        <div className="relative h-[65%] p-3 w-full md:w-[90%] lg:w-[80%] xl:w-[70%] flex flex-col md:gap-x-4 gap-y-4 bg-white dark:bg-[#1E1F22] border border-gray-500 dark:border-gray-400 rounded-md shadow-md">
          <h3 className="underline text-gray-500 dark:text-gray-400 font-semibold text-xl">
            Your Subscribers
          </h3>
          <ScrollArea className="">
            <div className="flex flex-col gap-2 h-[80%]">
              {currentUser?.subscribers?.map((s) => {
                return (
                  <button
                    onClick={() => router.push(`/user/users/${s._id}`)}
                    // key={s._id}
                    className="group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={s?.profilePic} />
                    </Avatar>
                    <p className="line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">
                      {s.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;

// /w-8 h-8 bg-gray-800 border border-gray-600 dark:border-gray-400 rounded-full
