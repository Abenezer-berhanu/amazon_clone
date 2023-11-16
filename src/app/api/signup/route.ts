import connectDB from "@/server/config/route";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/server/models/userModel";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    const newUser = new userModel({
      username,
      email,
      password,
    });

    const savedNewUser = await newUser.save();
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
