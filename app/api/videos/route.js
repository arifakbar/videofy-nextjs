import connect from "@/lib/db";
import { NextResponse } from "next/server";

import Video from "@/models/video";

export async function GET(req, res) {
  try {
    connect();
    const videos = await Video.find({}).populate("userId");
    if (!videos)
      return NextResponse.json({ error: "Videos not found!", status: 404 });
    return NextResponse.json({ data: videos, status: 200 });
  } catch (err) {
    console.log("[GET_VIDEOS_ERROR]: ", err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}
