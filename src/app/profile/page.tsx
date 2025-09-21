/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React from "react";
import Link from "next/link";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = React.useState<any>("nothing");

  const onLogout = async () => {
    try {
      const response = await fetch("/api/users/logout");
      console.log("logout success", response);
      toast.success("Logout successful!");
      router.push("/login");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        // if backend sent an error response
        const message = error.response?.data?.error || "Something went wrong";
        toast.error(message);
      } else {
        toast.error("Unexpected error. Please try again.");
      }
      console.error("logout failed", error);
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    console.log("response", response);
    setData(response.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1>Profile</h1>
      <h2>
        {data === "nothing" ? (
          "no ID click get user"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}{" "}
      </h2>
      <button
        onClick={onLogout}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className=" mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Get User
      </button>
    </div>
  );
};

export default ProfilePage;
