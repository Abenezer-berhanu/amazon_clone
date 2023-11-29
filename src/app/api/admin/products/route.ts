import connectDB from "@/server/config/route";
import productModel from "@/server/models/productModel";
import { NextResponse } from "next/server";

connectDB()
export const GET = async() => {
    try {
        const res = await productModel.find({})
        return NextResponse.json(res, {status: 200})
    } catch (error:any) {
        console.log(error)
    }
}