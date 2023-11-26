import { NextRequest, NextResponse } from "next/server";
import productModel from "@/server/models/productModel";
import connectDB from "@/server/config/route";

connectDB();

export const GET = async (request: NextRequest, { params }: any) => {
  const { id } = params;
  try {
    const singleProduct = await productModel.findById(id);
    return NextResponse.json(
      { msg: singleProduct, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest, { params }: any) => {
  const { id } = params;
  const reqBody = await request.json();
  const { comment, rating, user, name } = reqBody;

  const product = await productModel.findById(id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review: any) => review.user.toString() === user.toString()
    );
    if (alreadyReviewed) {
      return NextResponse.json(
        { msg: "Product already reviewed." },
        { status: 400 }
      );
    }
    const review = {
      name: name,
      rating: Number(rating),
      comment,
      user,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce(
        (acc: number, review: any) => acc + review.rating,
        0
      ) / product.reviews.length;

    await product.save();
    return NextResponse.json({ msg: "Review added." }, { status: 201 });
  } else {
    return NextResponse.json({ msg: "Not found." }, { status: 404 });
  }
};

export const DELETE = async (request: NextRequest, { params }: any) => {
  const { id } = params;
  try {
    const deletedPro = await productModel.deleteOne({ _id: id });
    return NextResponse.json("product deleted", { status: 200 });
  } catch (error: any) {
    throw new Error(error);
  }
};
