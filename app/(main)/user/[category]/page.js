"use client";

import { userRoutes } from "@/components/privateRoute";
import { Separator } from "@/components/ui/separator";
import { useParams, redirect } from "next/navigation";

const avail = ["History", "Watch Later", "Liked Videos"];

function UserCategories() {
  const params = useParams();
  const { category } = params;


  if (!avail.includes(decodeURI(category))) return redirect('/');

  return (
    <div className="flex flex-col gap-3 p-3">
      <h2 className="font-semibold text-2xl w-full">{decodeURI(category)}</h2>
      <Separator className="h-[2px] bg-zinc-500 dark:bg-zinc-700 rounded-md w-full" />
      <div>Video Cards here</div>
    </div>
  );
}

export default userRoutes(UserCategories);