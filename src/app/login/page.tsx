/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

type User = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const [user, setUser] = React.useState<User>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // tell TS that `name` is one of the keys of User
    setUser((prev) => ({
      ...prev,
      [name as keyof User]: value,
    }));
  };

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login success", response.data);
      toast.success("Login successful!");
      router.push("/profile");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        // if backend sent an error response
        const message = error.response?.data?.error || "Something went wrong";
        toast.error(message);
      } else {
        toast.error("Unexpected error. Please try again.");
      }
      console.error("login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-black mb-6">
          Login
        </h1>
        <form onSubmit={onLogin} className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm  font-bold text-gray-900 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleOnChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-black"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm  font-bold text-gray-900 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleOnChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <p className="text-sm text-gray-600 text-center">
            Doesn&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
