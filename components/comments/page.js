import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../user-avatar";

export default function Comments({ }) {

    const router = useRouter();

    const handleUserClick = () => {
        router.push("/user/users/1");
    };

    return <div className="h-[90%] md:h-[90%] p-1 border border-zinc-500 dark:border-zinc-400 flex flex-col items-start justify-between">
        <div className="h-[90%] w-full">
            <ScrollArea className="h-full pt-1 flex-1 w-full">
                <div className="flex items-center gap-x-2 mb-3">
                    <div onClick={handleUserClick} className="cursor-pointer">
                        <UserAvatar className="w-6 h-6 md:h-6 md:w-6" src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" />
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Comments</p>
                </div>
                <div className="flex items-center gap-x-2 mb-3">
                    <div onClick={handleUserClick} className="cursor-pointer">
                        <UserAvatar className="w-6 h-6 md:h-6 md:w-6" src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" />
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Comments</p>
                </div><div className="flex items-center gap-x-2 mb-3">
                    <div onClick={handleUserClick} className="cursor-pointer">
                        <UserAvatar className="w-6 h-6 md:h-6 md:w-6" src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" />
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Comments</p>
                </div>
            </ScrollArea>
        </div>
        <div className="w-full flex gap-x-1 items-center justify-between" >
            <Input className="focus-none border border-black dark:border-white bg-transparent dark:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Enter your comment here..." />
            <Button className="focus-none border border-black dark:border-white bg-transparent dark:bg-transparent text-zinc-500 dark:text-zinc-400 font-semibold">Post</Button>
        </div>
    </div>
}