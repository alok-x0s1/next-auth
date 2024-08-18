import { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
	title: "Next-auth | Sign Up",
	description: "Exploring backend in NextJS | Sign Up",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Toaster position="top-center" />
				{children}
			</body>
		</html>
	);
}