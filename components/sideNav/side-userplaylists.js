import { PlayCircle } from "lucide-react";

export default function SideUserPlaylists() {
    return <button
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1"
    >
        <PlayCircle className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        <p className="line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">
            Playlists
        </p>
    </button>
}

