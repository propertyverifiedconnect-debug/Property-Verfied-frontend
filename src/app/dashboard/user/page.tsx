"use client";

import React, { JSX, useState } from "react";
import useRedirectByRole from "@/hooks/useRedirectByRole";
import Nav from "@/components/layout/nav";
import { Inter } from "next/font/google";
import MiddlewareLoader from "@/components/shared/middleware-loader";
import BottomNav from "@/components/shared/bottom-nav";
import PropertyDashboard from "@/components/layout/user-menu-1";
import UserProfile from "@/components/layout/user-profile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

type ActiveTab = "Home" | "Menu" | "Profile" | string;

export default function Page(): JSX.Element {
  // if your hook returns something other than boolean adjust the type accordingly
  const loading = useRedirectByRole() as boolean;
  const [active, setActive] = useState<ActiveTab>("Home");

  if (loading) {
    return <MiddlewareLoader />;
  }

  return (
    <>
      <Nav />
      <div
        className={`${inter.className} min-h-screen w-full flex flex-col md:px-50  bg-[#fafafa] pt-12 md:pt-20`}
      >
        {active === "Home" ? (
          <PropertyDashboard />
        ) : active === "Menu" ? (
          <div
            className={`${inter.className} text-2xl text-gray-500 font-bold  h-screen w-full flex items-center justify-center -mt-20`}
          >
            <h1>No Order</h1>
          </div>
        ) : (
          <UserProfile/>
        )}

        <BottomNav active={active} setActive={setActive} type={"user"} />
      </div>
    </>
  );
}
