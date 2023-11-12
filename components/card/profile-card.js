import Image from "next/image";
import UserAvatar from "../user-avatar";
import { useRouter } from "next/navigation";

export default function ProfileCard({ profile }) {
  const router = useRouter();
  return (
    // <div className="h-[150px] flex gap-x-3 md:flex-row items-center cursor-pointer">
    //   <UserAvatar
    //     src={profile?.profilePic}
    //     className="md:h-40 md:w-40 h-40 w-40"
    //   />
    //   <div className="h-full w-full flex flex-col px-4 justify-center gap-y-2">
    //     <h2 className="text-xl font-semibold text-zonc-500 dark:text-zinc-400">
    //       {profile?.name}
    //     </h2>
    //     <p className="text-sm text-zonc-500 dark:text-zinc-400">
    //       {profile?.subscribers?.length} Subscribers
    //     </p>
    //     <small className="text-xs text-zonc-500 dark:text-zinc-400">
    //       Joined On: {new Date(profile?.createdAt).toLocaleDateString()}
    //     </small>
    //   </div>
    // </div>
    <div className="h-[150px] flex gap-x-3 md:flex-row items-center group">
      <UserAvatar
        src={profile?.profilePic}
        className="md:h-40 md:w-40 h-40 w-40 rounded-full overflow-hidden transition-all duration-300"
      />
      <div
        onClick={() => {
          router.push(`/user/users/${profile?._id}`);
        }}
        className="cursor-pointer h-full w-full flex flex-col px-4 justify-center gap-y-2 bg-zinc-300 dark:bg-zinc-700 group-hover:backdrop-blur-md group-hover:bg-opacity-30 transition-all duration-300"
        style={{ borderRadius: "8px" }} // Adjust the border-radius as needed
      >
        <h2 className="text-xl font-semibold text-zinc-500 dark:text-zinc-400">
          {profile?.name}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {profile?.subscribers?.length} Subscribers
        </p>
        <small className="text-xs text-zinc-500 dark:text-zinc-400">
          Joined On: {new Date(profile?.createdAt).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
}
