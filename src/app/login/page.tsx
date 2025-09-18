"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

type User = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const [user, setUser] = React.useState<User>({
    email: "",
    password: "",
  });

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

  const onLogin = async () => {
    //signup logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-black mb-6">
          Login
        </h1>
        <form onClick={onLogin} className="flex flex-col space-y-4">
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
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
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
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign Up
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
