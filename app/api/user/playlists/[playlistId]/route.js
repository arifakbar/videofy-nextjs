import Playlist from "@/models/playlist";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession();
    const { playlistId } = params;
    if (!session)
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    const user = await User.findOne({ email: session.user.email });
    await User.findByIdAndUpdate(
      user._id,
      {
        $pull: {
          userPlaylists: playlistId,
        },
      },
      { new: true }
    );
    await Playlist.findByIdAndDelete(playlistId);
    return NextResponse.json({
      msg: "Delete playlist successfully",
      status: 201,
    });
  } catch (err) {
    console.log("[DELETE_PLAYLIST_ERROR]: ", err);
    return NextResponse.json({ error: "Internal error", status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession();
    const { playlistId } = params;
    if (!session)
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    const { videoId, type } = await req.json();
    if (type === "add") {
      await Playlist.findByIdAndUpdate(
        playlistId,
        {
          $push: {
            videos: videoId,
          },
        },
        { new: true }
      );
    } else {
      await Playlist.findByIdAndUpdate(
        playlistId,
        {
          $pull: {
            videos: videoId,
          },
        },
        { new: true }
      );
    }
    return NextResponse.json({
      msg: "Updates successfully",
      status: 201,
    });
  } catch (err) {
    console.log("[DELETE_PLAYLIST_ERROR]: ", err);
    return NextResponse.json({ error: "Internal error", status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    const session = await getServerSession();
    const { playlistId } = params;
    if (!session)
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    const playlist = await Playlist.findById(playlistId).populate("videos");
    return NextResponse.json({
      data: playlist,
      status: 201,
    });
  } catch (err) {
    console.log("[DELETE_PLAYLIST_ERROR]: ", err);
    return NextResponse.json({ error: "Internal error", status: 500 });
  }
}
