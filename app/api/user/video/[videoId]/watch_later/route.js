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
    const { type } = await req.json();
    const currentUser = await User.findOne({ email: user.email });
    let updatedUser = {};
    console.log("TYPE: ", type);
    if (type === "add") {
      if (currentUser.watchLater?.includes(videoId)) {
        return NextResponse.json({ data: currentUser, status: 201 });
      }
      updatedUser = await User.findOneAndUpdate(
        { email: user.email },
        {
          $push: {
            watchLater: videoId,
          },
        },
        { new: true }
      );
    }
    if (type === "remove") {
      if (!currentUser.watchLater?.includes(videoId)) {
        return NextResponse.json({ data: currentUser, status: 201 });
      }
      updatedUser = await User.findOneAndUpdate(
        { email: user.email },
        {
          $pull: {
            watchLater: videoId,
          },
        },
        { new: true }
      );
    }
    return NextResponse.json({ data: updatedUser, status: 201 });
  } catch (err) {
    console.log("[WATCH_ALTER_PATCH]: ", err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}
