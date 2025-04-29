"use client";
import axiosInstance from "@/lib/axios/axios";
import { userSignInValidation } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { message } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface SignInFormProps {
  callbackUrl: string;
}

const WaitingForm = ({ callbackUrl }: SignInFormProps) => {
  const form = useForm<z.infer<typeof userSignInValidation>>({
    resolver: zodResolver(userSignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userSignInValidation>) => {
    const origin =
      process.env.NEXT_PUBLIC_API_URL ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000");

    const response = await fetch(`${origin}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store token in cookies
      Cookies.set("token", data.token, { expires: 7 });

      // Fetch user details using the token
      try {
        const response = await axiosInstance.get("user/details");

        const userData = response.data;

        const userCookie = JSON.stringify({
          _id: userData._id,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profilePicture: userData.profilePicture,
          status: userData.status,
        });
        // Store user details in cookies
        Cookies.set("user", userCookie, { expires: 7 });

        // Redirect the user to the callback URL or another page
        window.location.href = data.redirect || callbackUrl;
        message.success("Connexion réussie!");
      } catch (error) {
        console.error("Error fetching user details:", error);
        message.error("Failed to retrieve user details.");
      }
    } else {
      message.error(data.msg || "Informations d'identification incorrectes");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <label
            className="block text-gray-800 text-sm font-normal mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            {...form.register("email")}
            id="email"
            type="email"
            className="form-input w-full text-gray-800 px-3 py-2 border border-[#D1E9FF] rounded-md bg-transparent"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mt-3">
        <div className="w-full px-3">
          <button
            type="submit"
            className="btn text-white bg-[#1570EF] hover:bg-[#66b0c1] w-full px-4 py-2 rounded-md"
          >
            Join waiting list
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-[#98A2B3]">
          Already have an account ?
          <Link href="/sign-in" className="text-[#1570EF]">
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default WaitingForm;
