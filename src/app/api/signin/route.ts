import connectDB from "@/server/config/route";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/server/models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await userModel.findOne({ email });
    const { _id, role } = user;
    if (user) {
      const matchPassword = await bcrypt.compare(password, user.password);
      if (matchPassword) {
        const token = await jwt.sign({ _id, role }, process.env.JWT_SECRET!, {
          expiresIn: "2d",
        });
        cookies().set({
          name: "ab_am_us_er",
          value: token,
          httpOnly: true,
        });
        return NextResponse.json(
          {
            msg: {
              _id: user._id,
              email: user.email,
              username: user.username,
              role: user.role,
            },
            success: true,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json({ msg: "invalid password" }, { status: 400 });
      }
    } else {
      return NextResponse.json({ user: "invalid credential" }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
