"use client";

import Cookies from "js-cookie";
import { QueryClient } from "@tanstack/react-query";

export function logout(queryClient?: QueryClient) {
  try {
    // Remove auth cookies
    Cookies.remove("token");
    Cookies.remove("user");

    // Clear React Query cache if provided
    if (queryClient) {
      queryClient.clear();
    }

    // Redirect to home page
    window.location.href = "/";
  } catch (err) {
    console.error("Logout failed", err);
  }
}
