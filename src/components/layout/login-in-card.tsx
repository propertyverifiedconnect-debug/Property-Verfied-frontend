"use client"
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import { Inter } from "next/font/google";
import GoogleIcon from "../../../public/icons/googleicon";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/navigation';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // optional CSS variable
});

// Define types for form data and errors
interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginInForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation
    const newErrors: FormErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email: formData.email, password: formData.password },
          { withCredentials: true }
        );
        alert(res.data.message);
        router.push("/middleware");
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          // AxiosError: may have response.data.error
          alert(err.response?.data?.error ?? err.message);
        } else if (err instanceof Error) {
          alert(err.message);
        } else {
          alert(String(err));
        }
      }
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md p-6 w-[95%] md:w-[30rem] bg-white rounded-lg shadow-md">
      <div className="h-20 w-60 m-auto flex items-center justify-center">
        <Image src="/image/logo.png" alt="logo" width={140} height={100} className="scale-140" />
      </div>
      <div className={`${inter.className} flex items-center justify-center flex-col`}>
        <h2 className={`${inter.className} text-[#247FBA] text-2xl font-bold mb-6 text-center`}>Log in</h2>
        <p className="-mt-6 text-xs font-bold text-center text-gray-400 mb-3">Login To an Account <br /> to Connect with your interested verified property</p>
      </div>
      <form onSubmit={handleSubmit} className={`${inter.className} space-y-4`}>
        {/* Email */}
        <div>
          <Label htmlFor="email" className="mb-2 text-[#247FBA]">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password" className="mb-2 text-[#247FBA]">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="w-full h-5 flex items-center justify-between">
          <div className="flex gap-2">
            <h1 className={`${inter.className} text-xs font-bold text-gray-400`}>
              Remember me
            </h1>
          </div>
          <h1 className={`${inter.className} text-xs font-bold text-[#247FBA]`}>
            Forgot Password?
          </h1>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full mt-4 bg-[#247FBA] hover:scale-105 hover:bg-white hover:border-2 hover:text-[#247FBA]">
          Login
        </Button>
      </form>
      <hr className="mt-3" />
      <div className="w-full flex items-center justify-center">
        <Button className="w-50 m-auto mt-4 hover:scale-105 hover:bg-white hover:border-2 bg-white border-2 text-[#247FBA]">
          <GoogleIcon />
          Google Login
        </Button>
      </div>
      <p className="mt-5 text-xs font-bold text-center text-gray-400">Don't have an Account, <Link href={"/auth/sign-in"}><span className="hover:underline"> Sign-up</span></Link></p>
    </div>
  );
}
