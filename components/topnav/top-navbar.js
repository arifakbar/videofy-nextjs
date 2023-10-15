"use client";

import { useRouter } from "next/navigation";
import { ModeToggle } from "../mode-toggle";
import { MobileToggle } from "../mobile-toggle";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal";
import TopUserlinks from "./top-userlinks";
import { useSession } from "next-auth/react";

export default function TopNavbar() {
  const { onOpen } = useModal();

  const router = useRouter();

  const { data: session } = useSession();

  return (
    <div className="bg-gray-200 px-4 flex items-center justify-between h-full text-primary w-full dark:bg-[#1E1F22] bg-white">
      <div className="flex items-center gap-4">
        <MobileToggle />
        <label>
          <p>Videofy</p>
        </label>
      </div>
      <div className="hidden md:flex bg-gray-200 px-4 space-x-8 items-center justify-between h-full text-primary dark:bg-[#1E1F22] bg-white">
        <button
          onClick={() => {
            router.push("/");
          }}
          className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1"
        >
          <p className="line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">
            Home
          </p>
        </button>
        <button
          onClick={() => {
            router.push("/trending");
          }}
          className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1"
        >
          <p className="line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">
            Trending
          </p>
        </button>
        <button
          onClick={() => onOpen("search")}
          className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1"
        >
          <p className="line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">
            Search
          </p>
        </button>
      </div>
      <div className="flex gap-2">
        <ModeToggle />
        {session && session.user ? (
          <TopUserlinks
            name={session.user?.name}
            profilePic={session?.user?.image}
          />
        ) : (
          <Button
            onClick={() => onOpen("login")}
            variant="outline"
            className="w-[70px]"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
