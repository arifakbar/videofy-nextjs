import { NextResponse } from "next/server";

import Video from "@/models/video";
import User from "@/models/user";

export async function GET(req, { params }) {
  try {
    const { query } = params;
    const videos = await Video.find({
      name: { $regex: `${query}`, $options: "i" }, // Contains the Query
    })
      .populate("userId")
      .limit(10);
    const users = await User.find({
      name: { $regex: `^${query}`, $options: "i" }, // Starts with Query
    }).limit(10);
    return NextResponse.json({ videos, users, status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal error", status: 500 });
  }
}
