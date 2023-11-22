import userModel from "@/server/models/userModel";
import connectDB from "@/server/config/route";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export const GET = async (request: NextRequest, { params }: any) => {
  const { userId } = params;
  try {
    const res: any = await userModel.findById(userId).select("-password");
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest, { params }: any) => {
  const { userId } = params;
  const reqBody = await request.json();
  try {
    const res: any = await userModel.findById(userId);
    if (res) {
      res.username = reqBody.name || res.username;
      res.email = reqBody.email || res.email;
      if (reqBody.password) {
        res.password = reqBody.password || res.password;
      }
      const updatedUserInfo = await res.save();
      const updatedUser = {
        _id: updatedUserInfo._id,
        username: updatedUserInfo.username,
        email: updatedUserInfo.email,
        role: updatedUserInfo.role,
      };
      return NextResponse.json(updatedUser, { status: 200 });
    } else {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
