import connect from "@/lib/db";
import { NextResponse } from "next/server";

import Video from "@/models/video";
import User from "@/models/user";

export async function PATCH(req, { params }) {
  try {
    connect();
    const { videoId } = params;
    const { userId } = await req.json();
    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ error: "Unauthorized", status: 401 });
    const video = Video.findById(videoId);
    console.log("UID: ", userId);
    if (video.views.includes(user._id)) {
      return NextResponse.json({ msg: "Not required", status: 201 });
    }
    const updatedVideo = Video.findByIdAndUpdate(
      videoId,
      {
        $push: {
          views: userId,
        },
      },
      { new: true }
    );
    return NextResponse.json({ msg: "Updated", status: 201 });
  } catch (err) {
    console.log("[UPDATE_VIDEO_ERROR]: ", err);
    return NextResponse.json({ error: "Internal error", status: 500 });
  }
}
