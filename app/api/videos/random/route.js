import { NextResponse } from "next/server";
import connect from "@/lib/db";

import Video from "@/models/video";

export async function GET(req, res) {
  try {
    connect();
    const videos = await Video.aggregate([{ $sample: { size: 4 } }]);
    const populatedVideos = await Video.populate(videos, { path: "userId" });
    if (!videos)
      return NextResponse.json({ error: "Videos not found!", status: 404 });
    return NextResponse.json({ data: populatedVideos, status: 200 });
  } catch (err) {
    console.log("[GET_VIDEOS_ERROR]: ", err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}
