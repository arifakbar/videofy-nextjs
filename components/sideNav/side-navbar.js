"use client";

import firebase from "firebase/compat/app";

import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

import SideNavlinks from "./side-navlinks";
import { useRouter } from "next/navigation";
import { Flame, Home, Search } from "lucide-react";
import SideUserlinks from "./side-userlinks";
import SideSubscriptions from "./side-subscriptions";
import { UserStore } from "@/hooks/user-store";
import SideUserPlaylists from "./side-userplaylists";

export default function SideNavbar() {
  const router = useRouter();
  const links = ["Music", "Gaming", "News", "Sports"];
  const userLinks = ["History", "Watch Later", "Liked Videos"];

  const { user, token, logoutUser } = UserStore();

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      logoutUser();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-gray-200 px-2 space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-white py-3">
      <ScrollArea className="flex-1 w-full pt-6 md:pt-0">
        <div className="md:hidden mt-4 gap-y-4 bg-gray-200 px-2 flex flex-col items-center justify-between h-full text-primary dark:bg-[#1E1F22] bg-white">
          <button
            onClick={() => {
              router.push("/");
            }}
            className="group rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1"
          >
            <Home className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            <p className="line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">
              Home
            </p>
          </button>
          <button
            onClick={() => {
              router.push("/trending");
            }}
            className="group rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1"
          >
            <Flame className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            <p className="line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">
              Trending
            </p>
          </button>
          <button className="group rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1">
            <Search className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            <p className="line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">
              Search
            </p>
          </button>
        </div>
        <Separator className="md:hidden h-[2px] bg-zinc-500 dark:bg-zinc-700 rounded-md w-full my-3" />
        {links?.map((l) => {
          return <SideNavlinks key={l} name={l} />;
        })}
        <Separator className="h-[2px] bg-zinc-500 dark:bg-zinc-700 rounded-md w-full my-3" />
        {user && token ?
          <>
            {userLinks?.map((l) => {
              return <SideUserlinks key={l} name={l} />;
            })}
            <SideUserPlaylists />
            <Separator className="h-[2px] bg-zinc-500 dark:bg-zinc-700 rounded-md w-full my-3" />
            <SideSubscriptions />
          </>
          :
          <p className="font-semibold text-center my-4 text-xs text-zinc-500 dark:text-zinc-400 ">
            Login to access more functionalities.
          </p>
        }
      </ScrollArea>
      {user && token &&
        <Button onClick={handleLogout} variant="outline" className="w-full">
          Sign Out - {user.name}
        </Button>
      }
    </div>
  );
}
