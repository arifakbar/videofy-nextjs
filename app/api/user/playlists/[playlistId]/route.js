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
