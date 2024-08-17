import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const getDataFromToken = (request: NextRequest) => {
	try {
        const token = request.cookies.get("token")?.value || "";
        // if (!token) {
        //     return NextResponse.json(
        //         { error: "Unauthorized" },
        //         { status: 401 }
        //     );
        // }

        const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        return decoded.id
	} catch (error: any) {
		return null
	}
};