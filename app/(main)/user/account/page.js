"use client";
import { useState } from "react";

import SpinLoading from "@/components/spinLoading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

function UserAccount() {
  const [loading, setLoading] = useState(false);
  const { onOpen } = useModal();

  return loading ? (
    <SpinLoading />
  ) : (
    <div className="flex flex-col h-[calc(100vh-70px)] items-center justify-center">
      <div className="flex flex-col items-center md:flex-row md:gap-x-4 gap-y-4 border-2 border-zinc-500 dark:border-x-zinc-400 py-4 px-8 ">
        <Avatar className="h-[250px] w-[250px]">
          <AvatarImage src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" />
        </Avatar>
        <div className="md:h-[245px] md:w-1 bg-zinc-500 md:mx-2" />
        <div className="flex flex-col items-center md:items-start justify-center">
          <h3 className="text-zinc-500 dark:text-zinc-400 font-semibold text-2xl">
            Your Details
          </h3>
          <Separator className="my-2 bg-zinc-500 dark:bg-zinc-400" />
          <p className="text-zinc-500 dark:text-zinc-400 font-semibold p-2 rounded-md my-1">
            Email -
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 font-semibold p-2 rounded-md my-1">
            {" "}
            Display Name -
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 font-semibold p-2 rounded-md my-1">
            Subscribers -
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 font-semibold p-2 rounded-md my-1">
            Joined - {new Date().toLocaleDateString()}
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
