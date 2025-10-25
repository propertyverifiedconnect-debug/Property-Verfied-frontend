"use client";
import React, { useState } from "react";
import {
  Input,
} from "@/components/ui/input";
import {
  Label,
} from "@/components/ui/label";
import {
  Textarea,
} from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Button,
} from "@/components/ui/button";
import {
  Checkbox,
} from "@/components/ui/checkbox";
import Nav from "@/components/layout/nav";
import { ChevronLeft, ChevronRight , ArrowLeft} from "lucide-react";
import { Inter } from "next/font/google";
import Link from "next/link";



  const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function PropertyDetailsForm() {
 



  return (
    <>
    <Nav/>
    <div className={`${inter.className} max-w-2xl mx-auto bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md mt-5 space-y-6`}>
        <div className="flex items-center gap-2">
        <Link href="/dashboard/partner">
            <Button
              variant="ghost"
              size="icon"
              className="group rounded-full hover:bg-[#E2F1FF] hover:border-2 mt-7  bg-sky-400"
            >
              <ArrowLeft className="text-white group-hover:text-blue-700" />
            </Button>
          </Link>
      <h2 className="text-2xl font-semibold mt-10 flex items-center   text-gray-500  mb-3">
        <h1 >Property Listing </h1> <ChevronRight className="mt-1"/>
      </h2>
        </div>




    </div>
    </>
  );
}
