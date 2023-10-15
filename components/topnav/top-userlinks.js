import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import UserAvatar from "../user-avatar";

export default function TopUserlinks({ name, profilePic }) {
  const router = useRouter();
  console.log(profilePic);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-7 w-7 md:h-10 md:w-10 rounded-full">
          <UserAvatar src={profilePic} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled>{name}</DropdownMenuItem>
        <Separator className="m-1 w-[94%] bg-zinc-400 dark:bg-zinc-500" />
        <DropdownMenuItem onClick={() => router.push("/user/account")}>
          Your Account
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/user/videos")}>
          Your Videos
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
