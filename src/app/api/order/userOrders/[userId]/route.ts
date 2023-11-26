import connectDB from "@/server/config/route";
import orderModel from "@/server/models/orderModel";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export const GET = async (request: NextRequest, { params }: any) => {
  const { userId } = params;
  try {
    const res: any = await orderModel.find({ user: userId });
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
