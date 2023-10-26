import connect from "@/lib/db";
import { NextResponse } from "next/server";

import Video from "@/models/video";
import User from "@/models/user";
import { getServerSession } from "next-auth";

export async function GET(req, { params }) {
  try {
    connect();
    const { videoId } = params;
    const getVideo = await Video.findById(videoId)
      .populate("userId", "name profilePic subscribers watchLater")
      .exec();
    if (!getVideo)
      return NextResponse.json({ error: "Video Not found", status: 404 });
    return NextResponse.json({ data: getVideo, status: 200 });
  } catch (err) {
    console.log("[GET_VIDEO_ERROR]: ", err);
    return NextResponse.json({ error: "Internal error", status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    connect();
    const { videoId } = params;
    const { userId } = await req.json();
    const session = await getServerSession();
    if (!session.user)
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    const video = await Video.findById(videoId)
      .populate("userId", "name profilePic subscribers watchLater")
      .exec();
    if (video.views?.includes(userId)) {
      return NextResponse.json({ data: video, status: 201 });
    }
    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      {
        $push: {
          views: userId,
        },
      },
      { new: true }
    )
      .populate("userId", "name profilePic subscribers watchLater")
      .exec();
    return NextResponse.json({ data: updatedVideo, status: 201 });
  } catch (err) {
    console.log("[UPDATE_VIDEO_ERROR]: ", err);
    return NextResponse.json({ error: "Internal error", status: 500 });
  }
}
