"use client";

import { Gamepad, Mic, Newspaper, Trophy } from "lucide-react";
import { useParams } from "next/navigation";

import CategoryBanner from "@/components/banners/category-banner";

const iconMap = {
  ["Music"]: Mic,
  ["Gaming"]: Gamepad,
  ["News"]: Newspaper,
  ["Sports"]: Trophy,
};

export default function Categories() {
  const params = useParams();
  const { category } = params;
  const Icon = iconMap[category];
  return (
    <div>
      <CategoryBanner category={category} Icon={Icon} />
      Hi - {category}
    </div>
  );
}
