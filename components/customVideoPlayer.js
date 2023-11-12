import { useState } from "react";

import dynamic from "next/dynamic"; //To remove hydration error.
import { PauseOctagon, PlaySquare } from "lucide-react";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function CustomVideoPlayer({ url, className }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={`relative overflow-hidden bg-gray-900 rounded-lg shadow-md pt-[1px] ${className}`}
    >
      <ReactPlayer
        url={url}
        playing={isPlaying}
        controls
        width="100%"
        height="100%"
        className="rounded-lg"
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
      />
      <div
        className="absolute top-10 left-0 w-full h-[80%] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <PauseOctagon className="text-3xl text-white cursor-pointer" />
        ) : (
          <PlaySquare className="text-3xl text-white cursor-pointer" />
        )}
      </div>
    </div>
  );
}
