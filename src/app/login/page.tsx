"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);

      const response = await axios.post("/api/users/login", credentials);
      toast.success("Login successful!");
      router.push("/profile");
    } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (credentials.email.length > 0 && credentials.password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [credentials]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div
        className={`bg-white p-8 rounded-lg shadow-lg border w-full max-w-md transform transition-transform duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-3xl font-semibold text-center text-black mb-6">
          {loading ? "Loading..." : "Log In"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 text-sm text-black bg-white border border-black rounded-md focus:outline-none"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
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
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
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
            onClick={handleSubmit}
          >
            {loading ? "Submitting..." : "Log In"}
          </button>
        </form>
        <p className="mt-6 text-center text-black">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-black underline hover:text-gray-700 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
}