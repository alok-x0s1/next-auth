import { dbConnect } from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

dbConnect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");

        if(!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "User found", user }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}