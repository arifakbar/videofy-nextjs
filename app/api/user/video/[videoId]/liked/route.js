import Video from "@/models/video";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession();
    const { user } = session;
    if (!user) return NextResponse.json({ error: "Unauthorized", status: 401 });
    const { videoId } = params;
    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      {
        $pull: {
          likedVideos: videoId,
        },
      },
      { new: true }
    );
    await Video.findByIdAndUpdate(videoId, {
      $pull: {
        likes: updatedUser.id,
      },
    });
    return NextResponse.json({ data: updatedUser, status: 201 });
  } catch (err) {
    console.log("[WATCH_ALTER_PATCH]: ", err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}
