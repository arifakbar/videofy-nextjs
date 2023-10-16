"use client";
import { useState } from "react";

import SpinLoading from "@/components/spinLoading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useEffect } from "react";

function UserAccount() {
  const [loading, setLoading] = useState(false);
  const { onOpen } = useModal();

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const res = await axios.get("/api/user/currentUser");
      console.log(res.data.data);
      setCurrentUser(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return loading ? (
    <SpinLoading />
  ) : (
    <div className="flex flex-col h-[calc(100vh-70px)] items-center justify-center">
      <div className="w-[80%] flex flex-col items-center md:flex-row md:gap-x-4 gap-y-4 border-2 border-zinc-500 dark:border-x-zinc-400 py-4 px-8 ">
        <Avatar className="h-[250px] w-[250px]">
          <AvatarImage src={currentUser?.profilePic} />
        </Avatar>
        <div className="md:h-[245px] md:w-1 bg-zinc-500 md:mx-2" />
        <div className="flex flex-col items-center md:items-start justify-center">
          <h3 className="text-zinc-500 dark:text-zinc-400 font-semibold text-2xl">
            Your Details
          </h3>
          <Separator className="my-2 bg-zinc-500 dark:bg-zinc-400" />
          <p className="text-zinc-500 dark:text-zinc-400 font-semibold p-2 rounded-md my-1">
            Email - {currentUser?.email}
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 font-semibold p-2 rounded-md my-1">
            {" "}
            Display Name - {currentUser?.name}
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 font-semibold p-2 rounded-md my-1">
            Subscribers - {currentUser?.subscribers}
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 font-semibold p-2 rounded-md my-1">
            Joined - {new Date(currentUser?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <Button
        onClick={() => onOpen("userUpdate", { user: {} })}
        variant="outline"
        className="mt-4"
      >
        Update Profile
      </Button>
    </div>
  );
}

export default UserAccount;
