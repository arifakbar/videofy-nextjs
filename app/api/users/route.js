import { NextResponse } from "next/server";
import connect from "../../../lib/db";

import User from "@/models/user";

const defaultProfilePic = "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"

export async function POST(req, res) {
    try {
        await connect();
        const { user } = await req.json();

        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) return NextResponse.json({ msg: "User already exists", status: 200, data: existingUser });

        const newUser = new User({
            email: user.email,
            name: user.displayName !== null ? user.displayName : user.email.split("@")[0],
            profilePic: user.photoURL !== null ? user.photoURL : defaultProfilePic
        });

        await newUser.save();

        return NextResponse.json({ msg: "User created successfully", status: 200, data: newUser });
    } catch (err) {
        console.log("[USER_POST_ERROR]: ", err);
        return NextResponse.json({ error: "Internal error", status: 500 });
    }
}

