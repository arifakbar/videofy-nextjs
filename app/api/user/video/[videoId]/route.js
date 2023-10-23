import connect from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import Video from "@/models/video";
import User from "@/models/user";

export async function DELETE(req, { params }) {
  try {
    connect();
    const session = await getServerSession();
    const { user } = session;
    if (!user) return NextResponse.json({ error: "Unauthorized", status: 401 });
    const { videoId } = params;
    await Video.findByIdAndDelete(videoId);
    await User.findOneAndUpdate(
      { email: user.email },
      {
        $pull: {
          userVideos: videoId,
        },
      }
    );
    return NextResponse.json({
      msg: "Video deleted successfully",
      status: 200,
    });
  } catch (err) {
    console.log("[DELETE_VIDEO_ERROR]: ", err);
    return NextResponse.json({ error: "Internal error", status: 500 });
  }
}
