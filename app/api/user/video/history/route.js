import connect from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import User from "@/models/user";

export async function GET(req, res) {
  try {
    connect();
    const session = await getServerSession();
    const { user } = session;
    if (!user) return NextResponse.json({ error: "Unauthorized", status: 401 });
    const videos = await User.findOne({ email: user.email }).populate(
      "history"
    );
    if (!videos)
      return NextResponse.json({ error: "No vidoes found", status: 404 });

    return NextResponse.json({ data: videos, status: 200 });
  } catch (err) {
    console.log("[GET_USER_VIDEO_HISTORY: ]", err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}
