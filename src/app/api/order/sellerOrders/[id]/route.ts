import connectDB from "@/server/config/route";
import orderModel from "@/server/models/orderModel";
import { NextResponse, NextRequest } from "next/server";

connectDB();

export const GET = async (request: NextRequest, { params }: any) => {
  const { id } = params;
  try {
    const res = await orderModel.find({ owner: id });
    if (res) {
      return NextResponse.json(res, { status: 200 });
    }
    if (!res) {
      return NextResponse.json(null, { status: 404 });
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
