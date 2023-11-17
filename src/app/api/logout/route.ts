import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
   try {
    cookies().set("ab_am_us_er", "", { httpOnly: true, expires: new Date(0) });
    return NextResponse.json({succuss: true}, {status: 200})
   } catch (error) {
    return NextResponse.json({ msg: "token deleted" }, { status: 500 });
   }
};
