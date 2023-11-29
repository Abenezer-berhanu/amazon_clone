import connectDB from "@/server/config/route";
import userModel from "@/server/models/userModel";
import { NextResponse } from "next/server";

connectDB()
export const GET = async () => {
   try {
    const res = await userModel.find({}).select("-password")
    return NextResponse.json(res, {status: 200})
   } catch (error:any) {
    console.log(error)
   }
   
}