"use client";

import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";

export default function UserCategories() {
  const params = useParams();
  const { category } = params;
  return (
    <div className="flex flex-col gap-3 p-3">
      <h2 className="font-semibold text-2xl w-full">{decodeURI(category)}</h2>
      <Separator className="h-[2px] bg-zinc-500 dark:bg-zinc-700 rounded-md w-full" />
      <div>Video Cards here</div>
    </div>
  );
}