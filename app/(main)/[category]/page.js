"use client";

import { redirect, useParams } from "next/navigation";

import Banner from "@/components/banners/banner";
import VideoCard from "@/components/card/video-card";
import { useEffect, useState } from "react";
import SpinLoading from "@/components/spinLoading";
import axios from "axios";

const iconMap = {
  ["Music"]:
    "https://img.freepik.com/free-vector/musical-pentagram-sound-waves-notes-background_1017-33911.jpg?w=2000",
  ["Gaming"]:
    "https://img.freepik.com/premium-photo/gamer-playing-desktop-pc-computer-gaming-illustration_691560-5611.jpg",
  ["News"]:
    "https://gumlet.assettype.com/quintype-website%2F2018-08%2F973e3cef-6730-4e80-af93-6851ec9d7ef0%2F6277209256_198cdbea86_o.jpg?rect=0%2C0%2C1279%2C719&format=auto",
  ["Sports"]:
    "https://www.shutterstock.com/shutterstock/photos/2284630221/display_1500/stock-photo-sports-tools-arrange-at-the-grass-2284630221.jpg",
};

const avail = ["Music", "Gaming", "News", "Sports"];

export default function Categories() {
  const params = useParams();
  const { category } = params;
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  if (!avail.includes(category)) return redirect("/");

  useEffect(() => {
    loadVideo();
  }, []);

  const loadVideo = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/videos/${category}`);
      setVideos(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const src = iconMap[category];
  return loading ? (
    <SpinLoading />
  ) : (
    <div>
      <Banner name={category} src={src} />
      <div className="w-full flex justify-center flex-wrap">
        {videos?.map((v) => {
          return <VideoCard className="w-[300px] m-3" video={v} />;
        })}
      </div>
    </div>
  );
}
