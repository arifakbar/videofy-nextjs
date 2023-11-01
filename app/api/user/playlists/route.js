import { NextResponse } from "next/server";

import Playlist from "@/models/playlist";
import User from "@/models/user";

import { getServerSession } from "next-auth";

export async function POST(req, res) {
  try {
    const { session } = await getServerSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    const user = await User.findOne({ email: session.user.email });
    const { name } = await res.json();
    const newPlaylist = new Playlist({ name, userId: user._id });
    await newPlaylist.save();
    return NextResponse.json({ data: newPlaylist, status: 201 });
  } catch (err) {
    console.log("[PLAYLIST_POST_ERROR]: ", err);
    return NextResponse.json({ err: "Internal error", status: 500 });
  }
}
