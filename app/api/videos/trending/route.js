import { NextResponse } from "next/server";

import Video from "@/models/video";

export async function GET(req, res) {
  try {
    const videos = await Video.find({})
      .populate("userId")
      .sort({ views: -1 })
      .limit(10);
    if (!videos)
      return NextResponse.json({ error: "Videos not found!", status: 404 });
    return NextResponse.json({ data: videos, status: 200 });
  } catch (err) {
    console.log("[GET_VIDEOS_ERROR]: ", err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}
