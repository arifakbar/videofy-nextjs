"use client";

import { Gamepad, Mic, Newspaper, Trophy } from "lucide-react";
import { redirect, useParams } from "next/navigation";

import Banner from "@/components/banners/banner";

const iconMap = {
  ["Music"]: Mic,
  ["Gaming"]: Gamepad,
  ["News"]: Newspaper,
  ["Sports"]: Trophy,
};

const avail = ["Music", "Gaming", "News", "Sports"];

export default function Categories() {
  const params = useParams();
  const { category } = params;

  if (!avail.includes(category)) return redirect('/');

  const Icon = iconMap[category];
  return (
    <div>
      <Banner name={category} src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" />
      Hi - {category}
    </div>
  );
}
