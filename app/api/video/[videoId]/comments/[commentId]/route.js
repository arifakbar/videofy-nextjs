import Comment from "@/models/comment";
import Video from "@/models/video";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession();
    if (!session)
      return NextResponse.json({ Error: "Unauthorized", status: 401 });
    const { videoId, commentId } = params;
    await Video.findByIdAndUpdate(videoId, {
      $pull: {
        comments: commentId,
      },
    });
    await Comment.findByIdAndDelete(commentId);
    return NextResponse.json({ msg: "Deleted successfully", status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}
