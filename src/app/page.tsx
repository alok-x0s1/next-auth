import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Link href="/profile" className="px-6 py-2 rounded bg-green-400">Profile</Link>
      <h1>Next-auth</h1>
		</main>
	);
}
