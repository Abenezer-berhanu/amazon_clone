import connectDB from "@/server/config/route";
import userModel from "@/server/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { email } = reqBody;
    const userExist = await userModel.findOne({ email }).select("_id");
    let response: any;
    if (userExist) {
      response = NextResponse.json(
        { msg: userExist, success: true },
        { status: 200 }
      );
    }
    if (!userExist) {
      response = NextResponse.json(
        { msg: null, success: false },
        { status: 404 }
      );
    }
    return response;
  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
};
