import { dbConnect } from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(request: NextRequest) {
	try {
		const { token } = await request.json();

		const user = await User.findOne({
			verificationToken: token,
			verificationTokenExpiry: {
				$gt: Date.now(),
			},
		});

		if (!user) {
			return NextResponse.json(
				{ error: "Invalid token" },
				{ status: 400 }
			);
		}

		await User.findByIdAndUpdate(user._id, {
			verificationToken: null,
			verificationTokenExpiry: null,
			isVerified: true,
		});

		return NextResponse.json(
			{ message: "Email verified successfully", success: true },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}