import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { mailTemplet } from "./mailTemplet";

export const sendEmail = async ({ email, emailType, userId }: any) => {
	try {
		console.log("hello100");
		const salt = await bcryptjs.genSalt(10);
		const hashedToken = await bcryptjs.hash(userId, salt);
		console.log(hashedToken);
		if (emailType === "VERIFY") {
			await User.findByIdAndUpdate(userId, {
				verificationToken: hashedToken,
				verificationTokenExpiry: Date.now() + 3600000,
			});
		} else if (emailType === "RESET") {
			await User.findByIdAndUpdate(userId, {
				forgotPasswordToken: hashedToken,
				forgotPasswordTokenExpiry: Date.now() + 3600000,
			});
		}

		const transport = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: Number(process.env.MAIL_PORT),
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		});

		console.log("hello4");

		const mailOptions = {
			from: "Next-auth <" + process.env.USER_MAIL + ">",
			to: email,
			subject:
				emailType === "VERIFY"
					? "Verify your account"
					: "Reset your password",
			html: mailTemplet({ reciever: email, emailType, link: `${process.env.DOMAIN}/verify-email?token=${hashedToken}` })
		};

		const mailResponse = await transport.sendMail(mailOptions);
		return mailResponse;
	} catch (error: any) {
		throw new Error(error.message);
	}
};