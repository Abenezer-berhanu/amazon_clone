import connectDB from "@/server/config/route";
import productModel from "@/server/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  connectDB();
  try {
    const searchQuery = req.nextUrl.searchParams.get("q");
    const products = await productModel.find({
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
        { brand: { $regex: searchQuery, $options: "i" } },
      ],
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.log(error);
  }
};
