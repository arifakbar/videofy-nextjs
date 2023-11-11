import connect from "@/lib/db";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req, res, next) {
  try {
    connect();
    const session = await getServerSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    const user = await User.findOne({ email: session.user?.email }).populate(
      "subscriptions subscribers"
    );
    return NextResponse.json({ data: user, status: 200 });
  } catch (err) {
    console.log("[GET_USER_ERROR]: ", err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}

export async function PATCH(req, res, next) {
  try {
    connect();
    const session = await getServerSession();
    const { name, profilePic } = await req.json();
    if (!session)
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    const user = await User.findOneAndUpdate(
      { email: session.user?.email },
      { name, profilePic },
      { new: true }
    );
    return NextResponse.json({ data: user, status: 200 });
  } catch (err) {
    console.log("[GET_USER_ERROR]: ", err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}
