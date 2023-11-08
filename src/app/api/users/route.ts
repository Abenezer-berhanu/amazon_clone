import connectDB from "@/server/config/route";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/server/models/userModel";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const newUser = await userModel.create(reqBody);
    return NextResponse.json({ msg: newUser, success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
