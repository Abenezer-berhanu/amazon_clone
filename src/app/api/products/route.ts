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
  const pageNumber = Number(process.env.NEXT_PUBLIC_PAGE_NUMBER);
  const totalPros = await productModel.countDocuments({});
  const page = Number(request.nextUrl.searchParams.get("page")) || 1;
  let categoryQuery: any = request.nextUrl.searchParams.get("category");
  categoryQuery = categoryQuery.split(" ").join("");

  let keyword = {
    $or: [
      { category: { $regex: categoryQuery, $options: "i" } },
      { name: { $regex: categoryQuery, $options: "i" } },
      { brand: { $regex: categoryQuery, $options: "i" } },
      { subCategory: { $regex: categoryQuery, $options: "i" } }
    ],
  };

  try {
    const products = await productModel
      .find(categoryQuery === "all" ? {} : keyword)
      .limit(pageNumber)
      .skip(pageNumber * (page - 1));
    return NextResponse.json(
      {
        msg: products,
        page,
        pages: Math.ceil(totalPros / pageNumber),
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
