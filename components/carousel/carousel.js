"use client";

import { Carousel } from "flowbite-react";
import { PlayCircle } from "lucide-react";
import ActionTooltip from "../ui/action-tooltip";

// https://picsum.photos/200/300?random=3

export default function VideoCarousel() {
  return (
    <div className="h-[350px] mb-4">
      <Carousel
        slideInterval={2000}
        pauseOnHover
        indicators={false}
        className="rounded-0"
      >
        <div className="flex w-full gap-x-4 items-center justify-center">
          <div className="w-[49%] relative flex items-center justify-center">
            <div className="absolute flex flex-col gap-y-3 opacity-0 hover:opacity-100 h-full w-full cursor-pointer duration-300 z-10 items-center justify-center bg-black bg-opacity-75">
              <ActionTooltip label="Play">
                <PlayCircle className="h-9 w-9 text-zinc-500 dark:text-zinc-400" />
              </ActionTooltip>
              <p className="text-xl font-bold text-zinc-500 dark:text-zinc-400">
                Video Title
              </p>
            </div>
            <img
              alt="NF"
              src="https://picsum.photos/200/300?random=1"
              className="w-full object-center"
            />
          </div>
          <div className="w-[49%] relative flex items-center justify-center">
            <div className="absolute flex flex-col gap-y-3 opacity-0 hover:opacity-100  h-full w-full cursor-pointer duration-300 z-10 items-center justify-center bg-black bg-opacity-75">
              <ActionTooltip label="Play">
                <PlayCircle className="h-9 w-9 text-zinc-500 dark:text-zinc-400" />
              </ActionTooltip>
              <p className="text-xl font-bold text-zinc-500 dark:text-zinc-400">
                Video Title
              </p>
            </div>
            <img
              alt="NF"
              src="https://picsum.photos/200/300?random=6"
              className="w-full object-center"
            />
          </div>
        </div>
        <div className="flex w-full gap-x-4 items-center justify-center">
          <div className="w-[49%] relative flex items-center justify-center">
            <div className="absolute flex flex-col gap-y-3 opacity-0 hover:opacity-100  h-full w-full cursor-pointer duration-300 z-10 items-center justify-center bg-black bg-opacity-75">
              <ActionTooltip label="Play">
                <PlayCircle className="h-9 w-9 text-zinc-500 dark:text-zinc-400" />
              </ActionTooltip>
              <p className="text-xl font-bold text-zinc-500 dark:text-zinc-400">
                Video Title
              </p>
            </div>
            <img
              alt="NF"
              src="https://picsum.photos/200/300?random=3"
              className="w-full object-center"
            />
          </div>
          <div className="w-[49%] relative flex items-center justify-center">
            <div className="absolute flex flex-col gap-y-3 opacity-0 hover:opacity-100  h-full w-full cursor-pointer duration-300 z-10 items-center justify-center bg-black bg-opacity-75">
              <ActionTooltip label="Play">
                <PlayCircle className="h-9 w-9 text-zinc-500 dark:text-zinc-400" />
              </ActionTooltip>
              <p className="text-xl font-bold text-zinc-500 dark:text-zinc-400">
                Video Title
              </p>
            </div>
            <img
              alt="NF"
              src="https://picsum.photos/200/300?random=4"
              className="w-full object-center"
            />
          </div>
        </div>
        <div className="flex w-full gap-x-4 items-center justify-center">
          <div className="w-[49%] relative flex items-center justify-center">
            <div className="absolute flex flex-col gap-y-3 opacity-0 hover:opacity-100  h-full w-full cursor-pointer duration-300 z-10 items-center justify-center bg-black bg-opacity-75">
              <ActionTooltip label="Play">
                <PlayCircle className="h-9 w-9 text-zinc-500 dark:text-zinc-400" />
              </ActionTooltip>
              <p className="text-xl font-bold text-zinc-500 dark:text-zinc-400">
                Video Title
              </p>
            </div>
            <img
              alt="NF"
              src="https://picsum.photos/200/300?random=5"
              className="w-full object-center"
            />
          </div>
          <div className="w-[49%] relative flex items-center justify-center">
            <div className="absolute flex flex-col gap-y-3 opacity-0 hover:opacity-100  h-full w-full cursor-pointer duration-300 z-10 items-center justify-center bg-black bg-opacity-75">
              <ActionTooltip label="Play">
                <PlayCircle className="h-9 w-9 text-zinc-500 dark:text-zinc-400" />
              </ActionTooltip>
              <p className="text-xl font-bold text-zinc-500 dark:text-zinc-400">
                Video Title
              </p>
            </div>
            <img
              alt="NF"
              src="https://picsum.photos/200/300?random=7"
              className="w-full object-center"
            />
          </div>
        </div>
        <div className="flex w-full gap-x-4 items-center justify-center">
          <div className="w-[49%] relative flex items-center justify-center">
            <div className="absolute flex flex-col gap-y-3 opacity-0 hover:opacity-100  h-full w-full cursor-pointer duration-300 z-10 items-center justify-center bg-black bg-opacity-75">
              <ActionTooltip label="Play">
                <PlayCircle className="h-9 w-9 text-zinc-500 dark:text-zinc-400" />
              </ActionTooltip>
              <p className="text-xl font-bold text-zinc-500 dark:text-zinc-400">
                Video Title
              </p>
            </div>
            <img
              alt="NF"
              src="https://picsum.photos/200/300?random=8"
              className="w-full object-center"
            />
          </div>
          <div className="w-[49%] relative flex items-center justify-center">
            <div className="absolute flex flex-col gap-y-3 opacity-0 hover:opacity-100  h-full w-full cursor-pointer duration-300 z-10 items-center justify-center bg-black bg-opacity-75">
              <ActionTooltip label="Play">
                <PlayCircle className="h-9 w-9 text-zinc-500 dark:text-zinc-400" />
              </ActionTooltip>
              <p className="text-xl font-bold text-zinc-500 dark:text-zinc-400">
                Video Title
              </p>
            </div>
            <img
              alt="NF"
              src="https://picsum.photos/200/300?random=9"
              className="w-full object-center"
            />
          </div>
        </div>
      </Carousel>
    </div>
  );
}
