import connectDB from "@/server/config/route";
import orderModel from "@/server/models/orderModel";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const res = await orderModel.findById(id);
    if (res) {
      return NextResponse.json(res, { status: 200 });
    }
    if (!res) {
      return NextResponse.json(null, { status: 404 });
    }
  } catch (error) {
    console.log(error);
  }
};
