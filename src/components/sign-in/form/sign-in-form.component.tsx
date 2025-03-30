"use client";
import axiosInstance from "@/lib/axios/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { faEye, faEyeSlash } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message } from 'antd';
import * as z from "zod";
import { userSignInValidation } from "@/lib/validations/auth";

interface SignInFormProps {
  callbackUrl: string;
}

const SignInForm = ({ callbackUrl }: SignInFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

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
    (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
  
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

        const response =  await axiosInstance.get('user/details');

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
        message.success('Connexion réussie!');
        
      } catch (error) {
        console.error("Error fetching user details:", error);
        message.error("Failed to retrieve user details.");
      }
    } else {
      message.error(data.msg || "Informations d'identification incorrectes");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <label
            className="block text-gray-800 text-sm font-medium mb-1"
            htmlFor="email"
          >
            Adresse Email
          </label>
          <input
            {...form.register("email")}
            id="email"
            type="email"
            className="form-input w-full text-gray-800"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <div className="flex justify-between">
            <label
              className="block text-gray-800 text-sm font-medium mb-1"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <div
              className="text-sm flex flex-row items-center gap-2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 
              <FontAwesomeIcon icon={faEyeSlash} className="icons" />
              :
              <FontAwesomeIcon icon={faEye} className="icons" />}
              {showPassword ? "Cacher" : "Montrer"}
            </div>
          </div>
          <input
            {...form.register("password")}
            id="password"
            type={showPassword ? "text" : "password"}
            className="form-input w-full text-gray-800"
            placeholder="Enter your password"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <Link
            title="Reset password"
            href="/waiting-list"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mt-6">
        <div className="w-full px-3">
          <button
            type="submit"
            className="btn text-white bg-[#7ED8EC] hover:bg-[#66b0c1] w-full"
          >
            Se connecter
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;