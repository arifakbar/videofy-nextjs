import Video from "@/models/video";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { category } = params;
    const videos = await Video.find({
      category: category.toUpperCase(),
    }).populate("userId");
    return NextResponse.json({ data: videos, status: 201 });
  } catch (err) {
    console.log("[GET_CATEGORY_VIDEO]: ", err);
    return NextResponse.json({ error: "Internal error", status: 500 });
  }
}
