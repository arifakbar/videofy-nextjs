import User from "@/models/user";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession();
    if (!session.user)
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    const { userId } = params;
    const { type } = await req.json();
    const currentUser = await User.findOne({ email: session.user.email });
    let updatedUser = {};
    if (type === "add") {
      if (currentUser.subscriptions.includes(userId)) {
        return NextResponse.json({
          data: currentUser,
          status: "Already added",
        });
      }
      updatedUser = await User.findByIdAndUpdate(
        currentUser._id,
        {
          $push: {
            subscriptions: userId,
          },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(userId, {
        $push: {
          subscribers: currentUser._id,
        },
      });
    }
    if (type === "remove") {
      if (!currentUser.subscriptions.includes(userId)) {
        return NextResponse.json({
          data: currentUser,
          status: "Not added",
        });
      }
      updatedUser = await User.findByIdAndUpdate(
        currentUser._id,
        {
          $pull: {
            subscriptions: userId,
          },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(userId, {
        $pull: {
          subscribers: currentUser._id,
        },
      });
    }
    return NextResponse.json({ data: updatedUser, status: 201 });
  } catch (err) {
    console.log("[SUBSCRIBE_PATCH]: ", err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}
