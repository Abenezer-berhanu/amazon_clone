import { NextRequest, NextResponse } from "next/server";
import productModel from "@/server/models/productModel";
import connectDB from "@/server/config/route";

connectDB()

export const GET = async (request: NextRequest, {params}:any) => {
    const {id} = params
    try {
        const singleProduct = await productModel.findById(id)
        return NextResponse.json({msg: singleProduct, success: true}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500})
    }
}