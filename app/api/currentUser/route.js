import { NextResponse } from "next/server";
import connect from "../../../lib/db";

import User from "@/models/user";

export async function POST(req, res) {
    try {
        await connect();
        const { email } = await req.json();
        const user = await User.findOne({ email: email });
        if (!user) return NextResponse.json({ msg: "User not found", status: 404 });
        return NextResponse.json({ msg: "User fetched successfully", status: 200, data: user });
    } catch (err) {
        console.log("[USER_GET_ERROR]: ", err);
        return NextResponse.json({ error: "Internal error", status: 500 });
    }
}