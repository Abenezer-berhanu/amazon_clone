import connectDB from "@/server/config/route";
import productModel from "@/server/models/productModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const product = await productModel.create(reqBody);
    return NextResponse.json({ msg: product, success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const products = await productModel.find({});
    return NextResponse.json({ msg: products, success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
