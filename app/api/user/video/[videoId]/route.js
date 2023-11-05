import connect from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { utapi } from "@/app/api/uploadthing/route";

import Video from "@/models/video";
import User from "@/models/user";
import axios from "axios";

export async function DELETE(req, { params }) {
  try {
    connect();
    const session = await getServerSession();
    const { user } = session;
    if (!user) return NextResponse.json({ error: "Unauthorized", status: 401 });
    const { videoId } = params;
    const video = await Video.findById(videoId);
    await Video.findByIdAndDelete(videoId);
    await User.findOneAndUpdate(
      { email: user.email },
      {
        $pull: {
          userVideos: videoId,
        },
      }
    );
    await utapi.deleteFiles([video.thumbnail.slice(18), video.video.slice(18)]);
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
      await User.findByIdAndUpdate(userId, {
        $push: {
          likedVideos: videoId,
        },
      });
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
      await User.findByIdAndUpdate(userId, {
        $pull: {
          likedVideos: videoId,
        },
      });
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
      await User.findByIdAndUpdate(userId, {
        $pull: {
          likedVideos: videoId,
        },
      });
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
