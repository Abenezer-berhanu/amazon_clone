import productModel from "@/server/models/productModel";
import connectDB from "@/server/config/route";
import { NextResponse, NextRequest } from "next/server";

connectDB()
export const GET = async (request:NextRequest, {params}:any) => {
    const {userId} = params
    try {
        const product = await productModel.find({owner: userId})
        if(product){
            return NextResponse.json(product, {status: 200})
        }
        if(!product){
            return NextResponse.json("No product has created Yet!", {status: 404})
        }
    } catch (error:any) {
        throw new Error(error)
    }

}