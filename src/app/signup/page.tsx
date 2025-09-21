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
  username: string;
};
const SignupPage = () => {
  const [user, setUser] = React.useState<User>({
    email: "",
    password: "",
    username: "",
  });

  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  //   const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setUser({ ...user, [e.target.name]: e.target.value });
  //   };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // tell TS that `name` is one of the keys of User
    setUser((prev) => ({
      ...prev,
      [name as keyof User]: value,
    }));
  };

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      toast.success("Signup successful!");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-black mb-6">
          Sign Up
        </h1>
        <form onSubmit={onSignup} className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-bold text-gray-900 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={user.username}
              onChange={handleOnChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-black"
            />
          </div>

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
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
