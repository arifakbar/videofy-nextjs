import connect from "@/lib/db";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req, res, next) {
  try {
    const session = await getServerSession();
    const { type } = await req.json();
    if (!session)
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    if (type === "history") {
      await User.findOneAndUpdate(
        { email: session.user?.email },
        { history: [] },
        { new: true }
      );
    }
    if (type === "watch_later") {
      await User.findOneAndUpdate(
        { email: session.user?.email },
        { watchLater: [] },
        { new: true }
      );
    }
    if (type === "liked") {
      await User.findOneAndUpdate(
        { email: session.user?.email },
        { likedVideos: [] },
        { new: true }
      );
    }
    return NextResponse.json({ msg: "Removed All", status: 200 });
  } catch (err) {
    console.log("[REMOVE_ALL_ERROR]: ", err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}
