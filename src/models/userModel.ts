import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username is required"],
		unique: true,
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	verificationToken: {
		type: String,
		default: null,
	},
	verificationTokenExpiry: {
		type: Date,
		default: null,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	forgotPasswordToken: {
		type: String,
		default: null,
	},
	forgotPasswordTokenExpiry: {
		type: Date,
		default: null,
	},
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;