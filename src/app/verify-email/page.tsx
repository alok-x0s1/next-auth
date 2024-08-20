"use client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmail() {
	const [token, setToken] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleSubmit = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await axios.post("/api/users/verifyemail", { token });
			toast.success(response.data.message);
			router.push("/profile");
		} catch (error: any) {
			const message = error.response?.data?.message || "An unexpected error occurred.";
			console.error(message);
			setError(message);
			toast.error(message);
		}
		setLoading(false);
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const urlToken = urlParams.get("token");
		setToken(urlToken || "");
	}, []);

	useEffect(() => {
		if (token) {
			handleSubmit();
		}
	}, []);

	return (
		<div className="flex justify-center items-center min-h-screen bg-white">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-3xl font-semibold text-center text-black mb-6">Email Verification</h2>
				{loading ? (
					<p className="text-center text-black">Verifying your email...</p>
				) : error ? (
					<p className="text-center text-red-500">{error}</p>
				) : (
					<p className="text-center text-black">Please wait while we verify your email.</p>
				)}
			</div>
		</div>
	);
}
