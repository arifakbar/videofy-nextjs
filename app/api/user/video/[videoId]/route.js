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

export async function PATCH(req, { params }) {
  try {
    connect();
    const session = await getServerSession();
    const { user } = session;
    if (!user) return NextResponse.json({ error: "Unauthorized", status: 401 });
    const { videoId } = params;
    const { liked, unliked, disliked, undisliked } = await req.json();
    console.log(liked, unliked, disliked, undisliked);
    const currentUser = await User.findOne({ email: user.email });
    const userId = currentUser._id;
    let updatedVideo = {};
    //Liked
    if (liked) {
      updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
          $push: {
            likes: userId,
          },
          $pull: {
            dislikes: userId,
          },
        },
        { new: true }
      );
    } else if (unliked) {
      updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
          $pull: {
            likes: userId,
          },
        },
        { new: true }
      );
    }
    //Diskliked
    if (disliked) {
      updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
          $pull: {
            likes: userId,
          },
          $push: {
            dislikes: userId,
          },
        },
        { new: true }
      );
    } else if (undisliked) {
      updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
          $pull: {
            dislikes: userId,
          },
        },
        { new: true }
      );
    }
    return NextResponse.json({ data: updatedVideo, status: 201 });
  } catch (err) {
    console.log("[UPDATE_VIDEO_ERROR]: ", err);
    return NextResponse.json({ error: "Internal error", status: 500 });
  }
}
