import connectDB from "@/server/config/route";
import orderModel from "@/server/models/orderModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export const POST = async (req: NextRequest) => {
  try {
    const {
      userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid,
      owner,
    } = await req.json();

    const orderDetail = {
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid,
      owner: owner ?? '655736a3863e570092ce207c'
    };
    const res = await orderModel.create(orderDetail);
    return NextResponse.json({ msg: res, success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error, success: false }, { status: 500 });
  }
};

export const GET = async () => {
  try {
  } catch (error) {
    return NextResponse.json({ error: error, success: false }, { status: 500 });
  }
};
