import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenInfo = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("ab_am_us_er")?.value || "";
    console.log(token)

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
