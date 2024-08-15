import { dbConnect } from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json();
		if (!email || !password)
			return NextResponse.json(
				{ message: "Please enter email and password" },
				{ status: 400 }
			);

		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json(
				{ message: "User does not exist" },
				{ status: 400 }
			);
		}

		const isPasswordCorrect = await bcryptjs.compare(
			password,
			user.password
		);
		if (!isPasswordCorrect) {
			return NextResponse.json(
				{ message: "Invalid credentials" },
				{ status: 400 }
			);
		}

		const token = jwt.sign(
			{
				email: user.email,
				id: user._id,
				username: user.username,
				time: Date.now(),
			},
			process.env.ACCESS_TOKEN_SECRET!,
			{
				expiresIn: process.env.ACCESS_TOKEN_EXPIRY!,
			}
		);

		const response = NextResponse.json(
			{ message: "Login successful", success: true },
			{ status: 200 }
		);
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
