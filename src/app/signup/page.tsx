"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

interface User {
	username: string;
	email: string;
	password: string;
}

export default function Signup() {
	const [isVisible, setIsVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [user, setUser] = useState<User>({
		username: "",
		email: "",
		password: "",
	});
	const router = useRouter();

	useEffect(() => {
		setIsVisible(true);
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.post("/api/users/signup", user);
			toast.success(response.data.message);
			router.push("/login");
		} catch (error: any) {
			toast.error(error.response?.data?.message || error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setDisabled(!(user.username && user.email && user.password));
	}, [user]);

	return (
		<div className="flex justify-center items-center min-h-screen bg-white">
			<div
				className={`bg-white p-8 rounded-lg shadow-lg border w-full max-w-md transform transition-transform duration-1000 ease-out ${
					isVisible
						? "translate-y-0 opacity-100"
						: "translate-y-10 opacity-0"
				}`}
			>
				<h2 className="text-3xl font-semibold text-center text-black mb-6">
					{loading ? "Loading..." : "Sign Up"}
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="relative mb-4">
						<input
							type="text"
							name="username"
							id="username"
							className="w-full px-4 py-2 text-sm text-black bg-white border border-black rounded-md focus:outline-none"
							placeholder="Username"
							value={user.username}
							onChange={(e) =>
								setUser({ ...user, username: e.target.value })
							}
							required
						/>
					</div>
					<div className="relative mb-4">
						<input
							type="email"
							name="email"
							id="email"
							className="w-full px-4 py-2 text-sm text-black bg-white border border-black rounded-md focus:outline-none"
							placeholder="Email"
							value={user.email}
							onChange={(e) =>
								setUser({ ...user, email: e.target.value })
							}
							required
						/>
					</div>
					<div className="relative mb-6">
						<input
							type="password"
							name="password"
							id="password"
							className="w-full px-4 py-2 text-sm text-black bg-white border border-black rounded-md focus:outline-none"
							placeholder="Password"
							value={user.password}
							onChange={(e) =>
								setUser({ ...user, password: e.target.value })
							}
							required
						/>
					</div>
					<button
						type="submit"
						className={`w-full py-2 px-4 bg-black text-white rounded-md ${
							loading ? "cursor-not-allowed" : ""
						} ${disabled ? "cursor-default bg-black/90" : ""}`}
						disabled={disabled}
					>
						{loading ? "Submitting..." : "Sign Up"}
					</button>
				</form>
				<p className="mt-6 text-center text-black">
					Already have an account?{" "}
					<Link
						href="/login"
						className="text-black underline hover:text-gray-700 transition-colors"
					>
						Log in
					</Link>
				</p>
			</div>
		</div>
	);
}
