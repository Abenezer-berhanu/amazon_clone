import connectDB from "@/server/config/route";
import orderModel from "@/server/models/orderModel";
import { NextResponse } from "next/server";

connectDB()
export const GET = async() => {
    try {
        const res = await orderModel.find({})
        return NextResponse.json(res, {status: 200})
    } catch (error) {
        console.log(error)
    }
}