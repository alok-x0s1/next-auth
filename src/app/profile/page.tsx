"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserProfile {
	username: string;
	email: string;
	isVerified: boolean;
	isAdmin: boolean;
	verificationToken: string;
}

export default function Profile() {
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await axios.get("/api/users/me");
				setProfile(response.data.user);
			} catch (error) {
				toast.error("Failed to fetch profile.");
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, []);

	const handleLogout = async () => {
		try {
			await axios.get("/api/users/logout");
			toast.success("Logged out successfully.");
			router.push("/login");
		} catch (error) {
			toast.error("Failed to log out.");
		}
	};

	if (loading) return <p>Loading...</p>;

	if (!profile)
		return (
			<div className="min-h-screen flex justify-center items-center flex-col">
				<p>Profile not found. Please sign in.</p>
				<Link
					className="px-6 py-2 bg-blue-400 rounded-md"
					href="/login"
				>
					Login
				</Link>
			</div>
		);

	return (
		<div className="flex justify-center items-center min-h-screen bg-white p-4">
			<div className="bg-white p-8 rounded-lg shadow-lg border w-full max-w-md">
				<h2 className="text-2xl font-semibold text-center text-black mb-6">
					Profile
				</h2>
				<div className="mb-4">
					<p className="text-lg font-medium text-black">
						Username:{" "}
						<span className="font-normal">{profile.username}</span>
					</p>
				</div>
				<div className="mb-4">
					<p className="text-lg font-medium text-black">
						Email:{" "}
						<span className="font-normal">{profile.email}</span>
					</p>
				</div>
				<div className="mb-6">
					<p className="text-lg font-medium text-black">
						Status :{" "}
						<span
							className={`font-normal ${
								profile.isVerified
									? "text-green-500"
									: "text-red-500"
							}`}
						>
							{profile.isVerified ? "Verified" : "Not Verified"}
						</span>
					</p>
				</div>
				<div className="mb-6">
					<p className="text-lg font-medium text-black">
						isAdmin :{" "}
						<span
							className={`font-normal ${
								profile.isAdmin
									? "text-green-500"
									: "text-red-500"
							}`}
						>
							{profile.isAdmin ? "Admin" : "Not Admin"}
						</span>
					</p>
				</div>
				{!profile.isVerified && (
					<a
						href={`/verify-email?token=${profile.verificationToken}`}
						target="_blank"
						className="w-full py-2 px-4 bg-black text-white rounded-md"
					>
						Verify Email
					</a>
				)}

				<button
					className="px-6 py-2 rounded bg-red-400"
					onClick={handleLogout}
				>
					Logout
				</button>
			</div>
		</div>
	);
}
