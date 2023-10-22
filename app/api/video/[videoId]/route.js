import connect from "@/lib/db";
import { NextResponse } from "next/server";
import Video from "@/models/video";

export async function GET(req, { params }) {
  try {
    connect();
    const { videoId } = params;
    const getVideo = await Video.findById(videoId)
      .populate("userId", "name profilePic subscribers")
      .exec();
    if (!getVideo)
      return NextResponse.json({ error: "Video Not found", status: 404 });
    return NextResponse.json({ data: getVideo, status: 200 });
  } catch (err) {
    console.log("[GET_VIDEO_ERROR]: ", err);
    return NextResponse.json({ error: "Internal error", status: 500 });
  }
}
