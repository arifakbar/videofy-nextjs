import { NextResponse } from "next/server";

import User from "@/models/user";

export async function GET(req, { params }) {
  try {
    const { userId } = params;
    const user = await User.findById(userId).populate("userVideos");
    if (!user)
      return NextResponse.json({ error: "User Not Found", status: 404 });
    return NextResponse.json({ data: user, status: 201 });
  } catch (err) {
    console.log("[GET_USER]: ", err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}
