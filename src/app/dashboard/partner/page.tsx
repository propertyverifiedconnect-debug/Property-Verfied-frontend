"use client";

import React from 'react'
import Image from 'next/image'
import useRedirectByRole from '@/hooks/useRedirectByRole';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Search, CheckSquare, Heart, Calendar } from "lucide-react";

import Link from "next/link";
import PartnerDashboard from '@/components/layout/profile-menu';
import Nav from '@/components/layout/nav';
import MiddlewareLoader from '@/components/shared/middleware-loader';



function page() {
  const loading = useRedirectByRole();
//  const loading = false

   if (loading) {
    return <MiddlewareLoader/>; // or a spinner
  }
  return (
    <>
     <Nav/>
    {!loading &&
    
    <>
  
   <div className="min-h-screen w-full bg-[#CDE4F9]  ">

    <PartnerDashboard/>

   </div>
    
    </>
    
    }
    
    </>  
    
  )
}

export default page