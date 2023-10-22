import connect from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import Video from "@/models/video";
import User from "@/models/user";

export async function GET(req, res) {
  try {
    connect();
    const session = await getServerSession();
    const { user } = session;
    if (!user) return NextResponse.json({ error: "Unauthorized", status: 401 });
    const videos = await User.findOne({ email: user.email }).populate(
      "userVideos"
    );
    if (!videos)
      return NextResponse.json({ error: "No vidoes found", status: 404 });

    return NextResponse.json({ data: videos, status: 200 });
  } catch (err) {
    console.log("[GET_USER_VIDEO_ERROR: ]", err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}

export async function POST(req, res) {
  try {
    connect();
    const session = await getServerSession();
    const { user } = session;
    if (!user) return NextResponse.json({ error: "Unauthorized", status: 401 });
    const newValues = await req.json();
    const { name, description, thumbnail, category, video, userId } = newValues;
    console.log("NV: ", newValues);
    const newVideo = new Video({
      name,
      description,
      thumbnail,
      category,
      video,
      userId,
    });
    await newVideo.save();
    console.log(newVideo);
    await User.findByIdAndUpdate(
      userId,
      {
        $push: { userVideos: newVideo._id },
      },
      { new: true }
    );
    return NextResponse.json({ data: newVideo, status: 200 });
  } catch (err) {
    console.log("[POST_USER_VIDEO_ERROR: ]", err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}
