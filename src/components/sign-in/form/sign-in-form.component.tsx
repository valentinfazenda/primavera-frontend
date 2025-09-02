"use client";
import sadFace from "@/assets/svg/face-sad-sweat.svg";
import axiosInstance from "@/lib/axios/instance";
import { userSignInValidation } from "@/lib/validations/auth";
import { faEye, faEyeSlash } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { message } from "antd";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface SignInFormProps {
  callbackUrl: string;
}

const SignInForm = ({ callbackUrl }: SignInFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [fieldError, setFieldError] = useState<{
    field: string;
    msg: string;
  } | null>(null);
  const [unexpectedError, setUnexpectedError] = useState(false);

  const form = useForm<z.infer<typeof userSignInValidation>>({
    resolver: zodResolver(userSignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userSignInValidation>) => {
    setFieldError(null); // Reset error on submit
    setUnexpectedError(false);
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

    type LoginResponse = {
      token: string;
      redirect?: string;
      field?: string;
      msg?: string;
    };

    let data: LoginResponse = { token: "" };
    try {
      data = await response.json();
    } catch (e) {
      // If response is not JSON, treat as unexpected error
      setUnexpectedError(true);
      return;
    }

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
    } else if (response.status >= 500) {
      setUnexpectedError(true);
    } else {
      // Handle field-specific errors
      if ((data as any).field && (data as any).msg) {
        setFieldError({ field: (data as any).field, msg: (data as any).msg });
      } else {
        message.error(
          (data as any).msg || "Informations d'identification incorrectes"
        );
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (unexpectedError) {
    return (
      <div className="flex flex-col items-center justify-center">
        {/* Sad face icon */}
        <Image src={sadFace} alt="Error" className="mb-4 w-24" />
        <div className="text-center">
          <p className="text-lg font-semibold text-red-600 mb-2">Oops!</p>
          <p className="text-red-600 mb-2">
            Something Went Wrong.
            <br />
            We Encountered An Unexpected Error.
            <br />
            The Website May Be Undergoing Maintenance.
          </p>
          <p className="text-red-600 mb-4">Please Try Again Later.</p>
        </div>
        <button
          className="btn text-white bg-[#1570EF] hover:bg-[#66b0c1] w-full px-4 py-2 rounded-md mb-4"
          onClick={() => setUnexpectedError(false)}
        >
          Go back to login page
        </button>
        <div>
          <span className="text-[#98A2B3]">Don't Have An Account? </span>
          <Link href="/waiting-list" className="text-[#1570EF] font-semibold">
            Join Waiting List
          </Link>
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
            name="email"
            type="email"
            defaultValue=""
            className="form-input w-full text-gray-800 px-3 py-2 border border-[#D1E9FF] rounded-md bg-transparent"
            placeholder="Enter your email"
            required
          />
          {fieldError?.field === "email" && (
            <p className="text-red-500 text-sm mt-1 text-center">
              {fieldError.msg === "Unknown Email"
                ? "Unknown Email - Join Our Waiting List"
                : fieldError.msg}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <div className="flex justify-between">
            <label
              className="block text-gray-800 text-sm font-normal mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <div>
              <Link
                title="Reset password"
                href="/waiting-list"
                className="text-sm font-normal text-blue-600 hover:underline"
              >
                Forgot?
              </Link>
            </div>
          </div>
          <div className="relative flex items-center justify-center mt-1">
            <input
              {...form.register("password")}
              id="password"
              name="password"
              defaultValue=""
              type={showPassword ? "text" : "password"}
              className="form-input w-full text-gray-800 px-3 py-2 border border-[#D1E9FF] rounded-md bg-transparent"
              placeholder="Enter your password"
              required
            />
            <div
              className="text-sm flex flex-row items-center gap-2 cursor-pointer absolute right-3"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} className="icons" />
              ) : (
                <FontAwesomeIcon icon={faEye} className="icons" />
              )}
            </div>
          </div>
          {fieldError?.field === "password" && (
            <p className="text-red-500 text-sm mt-1 text-center">
              {fieldError.msg === "Wrong Password"
                ? "Wrong Password."
                : fieldError.msg}
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
            Login now
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-[#98A2B3]">
          Don't have an account?{" "}
          <Link href="/waiting-list" className="text-[#1570EF]">
            Join waiting list
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignInForm;
