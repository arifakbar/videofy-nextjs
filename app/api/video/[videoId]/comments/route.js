import Comment from "@/models/comment";
import User from "@/models/user";
import Video from "@/models/video";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    const { text } = await req.json();
    const { videoId } = params;
    const currentUser = await User.findOne({ email: session.user.email });

    const newComment = new Comment({
      text,
      videoId,
      userId: currentUser._id,
    });
    await newComment.save();

    await Video.findByIdAndUpdate(videoId, {
      $push: {
        comments: newComment._id,
      },
    });

    const populatedComment = await Comment.findById(newComment._id).populate(
      "userId"
    );

    return NextResponse.json({ data: populatedComment, status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}
