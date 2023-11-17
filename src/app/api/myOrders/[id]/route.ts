import connectDB from "@/server/config/route";
import { NextResponse } from "next/server";

connectDB()

export const GET = async() => {
    try {
       
    } catch (err) {
        return NextResponse.json({error: err, success: false}, {status: 500})
    }
}