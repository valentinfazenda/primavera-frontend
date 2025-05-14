"use client";
import axiosInstance from "@/lib/axios/axios";
import { userSignInValidation } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { message } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";

interface SignInFormProps {
  callbackUrl: string;
}

const WaitingForm = ({ callbackUrl }: SignInFormProps) => {
  const [fieldError, setFieldError] = useState<{ field: string; msg: string } | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof userSignInValidation>>({
    resolver: zodResolver(userSignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userSignInValidation>) => {
    setFieldError(null);
    const origin =
      process.env.NEXT_PUBLIC_API_URL ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000");

    const response = await fetch(`${origin}/api/waiting-list/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess(true);
      form.reset();
    } else {
      if (data.field && data.msg) {
        setFieldError({ field: data.field, msg: data.msg });
      } else {
        message.error(data.msg || "An error occurred");
      }
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        {/* Logo */}
        <img src="/logo.svg" alt="Primavera AI" className="mb-4 w-48" />
        {/* Checkmark */}
        <svg width="64" height="64" className="mb-4" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="32" fill="#E6F9ED" />
          <path d="M20 34l8 8 16-16" stroke="#22C55E" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Thank You For Joining. We'll Keep You Updated With The Next Steps.</p>
          <p className="mb-2">Stay Tuned!</p>
        </div>
        <div className="mt-4">
          <span className="text-[#98A2B3]">Already Have An Account ? </span>
          <Link href="/sign-in" className="text-[#1570EF] font-semibold">Log In</Link>
        </div>
      </div>
    );
  }

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
          {fieldError?.field === "email" && (
            <p className="text-red-500 text-sm mt-1 text-center">
              {fieldError.msg}
            </p>
          )}
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
          Already have an account?{" "}
          <Link href="/sign-in" className="text-[#1570EF]">
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default WaitingForm;