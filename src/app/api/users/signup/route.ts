import { dbConnect } from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

dbConnect();

export async function POST(request: NextRequest) {
	try {
		const { email, username, password } = await request.json();

		const existingUser = await User.findOne({
			$or: [{ email }, { username }],
		});
		if (existingUser) {
			return NextResponse.json(
				{ message: "User already exists :: Change username or Login" },
				{ status: 400 }
			);
		}

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		const user = await User.create({
			email,
			username,
			password: hashedPassword,
		});

		const saveduser = await User.findById(user._id).select(
			"-password -verificationToken -verificationTokenExpiry -forgotPasswordToken -forgotPasswordTokenExpiry"
		);
		if (!saveduser) {
			return NextResponse.json(
				{ message: "Error while saving user" },
				{ status: 500 }
			);
		}

		//send verification email
		await sendEmail({
			email: saveduser.email,
			emailType: "VERIFY",
			userId: saveduser.id,
		});

		return NextResponse.json(
			{
				message: "User created successfully",
				data: saveduser,
				success: true,
			},
			{
				status: 201,
			}
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
