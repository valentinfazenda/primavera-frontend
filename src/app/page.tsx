"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    const token = document.cookie
  .split("; ")
  .find(row => row.startsWith("token="))
  ?.split("=")[1];
    if (token) {
      redirect("/home");
    } else {
      redirect("/sign-in");
    }
  }, []);

  return <></>;
}