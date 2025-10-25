import React from "react";
import { Search, ChevronDown, ChevronRight,Heart, Home, ShoppingBag, ArrowBigLeft, ArrowLeft } from "lucide-react";
import Nav from "@/components/layout/nav";
import BottomNav from "@/components/shared/bottom-nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // optional CSS variable
});

const page = () => {
  const properties = [
    {
      id: 1,
      name: "Mahalakshmi 41",
      location: "Nagpur, Maharashtra",
      type: "Commercial",
      config: "3BHK, 1500 sq.ft",
      price: "₹25 Lakh – ₹40 Lakh",
      img: "/image/image-1.jpg",
    },
    {
      id: 2,
      name: "Mahalakshmi 41",
      location: "Nagpur, Maharashtra",
      type: "Commercial",
      config: "3BHK, 1500 sq.ft",
      price: "₹25 Lakh – ₹40 Lakh",
      img: "/image/image-1.jpg",
    },
    {
      id: 3,
      name: "Mahalakshmi 41",
      location: "Nagpur, Maharashtra",
      type: "Commercial",
      config: "3BHK, 1500 sq.ft",
      price: "₹25 Lakh – ₹40 Lakh",
      img: "/image/image-1.jpg",
    },
    {
      id: 3,
      name: "Mahalakshmi 41",
      location: "Nagpur, Maharashtra",
      type: "Commercial",
      config: "3BHK, 1500 sq.ft",
      price: "₹25 Lakh – ₹40 Lakh",
      img: "/image/image-1.jpg",
    },{
      id: 3,
      name: "Mahalakshmi 41",
      location: "Nagpur, Maharashtra",
      type: "Commercial",
      config: "3BHK, 1500 sq.ft",
      price: "₹25 Lakh – ₹40 Lakh",
      img: "/image/image-1.jpg",
    },
  ];

  return (
    <>
    <Nav/>
    <div className="bg-[#C8E2F8]  min-h-screen w-full  flex flex-col items-center  pt-15 pb-20">
      {/* Search Bar */}
      <div className="flex items-center justify-center gap-1 md:gap-3">
         <Link  href={"/dashboard/user"}>
          <Button variant="outline" className="mb-2  rounded-full"><ArrowLeft/></Button>
              </Link>

      <div className="flex items-center bg-white rounded-full shadow px-3 w-11/12 max-w-md mb-3">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by property name or location..."
          className="w-67 md:w-75 px-3 py-2 text-sm outline-none bg-transparent"
        />
      </div>

      </div>

      {/* Filters */}

  <div className="  py-2 px-5 md:-ml-20 flex items-start  w-96 ">
            
       

         <h1 className={`${inter.className} font-bold text-gray-600 text-2xl     flex items-center justify-center  `}>Property List <ChevronRight/></h1>
            
              </div>

      

      <div className="flex w-11/12 max-w-md justify-between items-center mb-4">
        <button className="text-sm bg-white shadow px-3 py-1 rounded-full">Reset</button>
        <div className="flex items-center gap-2">
          <button className="flex items-center text-sm bg-white shadow px-3 py-1 rounded-full">
            Property Type <ChevronDown size={14} className="ml-1" />
          </button>
          <button className="flex items-center text-sm bg-white shadow px-3 py-1 rounded-full">
            Configuration <ChevronDown size={14} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Property Cards */}
      <div className="flex flex-col gap-3 w-11/12 overflow-auto max-w-md">
        {properties.map((prop) => (
          <div key={prop.id} className="bg-[#A5D2F2] rounded-2xl p-3 flex shadow-md items-center justify-center">
            <img
              src={prop.img}
              alt={prop.name}
              className="w-25 h-25 rounded-lg object-cover"
            />
            <div className="flex-1 px-3">
                <div className="flex items-start justify-between">
                    <div>
              <h3 className="font-semibold text-gray-800">{prop.name}</h3>
              <p className="text-xs text-gray-700">
                {prop.location} <br /> {prop.type}
              </p>
              <p className="text-xs text-gray-600 mt-1">{prop.config}</p>

                    </div>
                <Heart size={18} className="text-[#0080ff] cursor-pointer" />

                </div>
             <div className="flex justify-start items-center gap-3">
              <span className="inline-block mt-1 whitespace-nowrap bg-white text-xs font-semibold px-2 py-1 rounded-lg">
                {prop.price}
              </span>
             <Link href={"/dashboard/user/find-property/property-list/proprerty-info"}>
                 <button className="text-xs mt-1 p-2 whitespace-nowrap bg-white text-[#0080ff] font-medium px- 2 py-1 rounded-md shadow">
                Book Visit
              </button>
             </Link>

             </div>
            </div>
            
            
           
        
           
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
       {/* <BottomNav/> */}
    
    </div>
    
    </>
  );
};

export default page;
