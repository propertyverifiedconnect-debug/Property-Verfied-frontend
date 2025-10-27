"use client"
import React  ,{useState , useEffect}from "react";
import { Search, ChevronDown, ChevronRight,Heart, Home, ShoppingBag, ArrowBigLeft, ArrowLeft } from "lucide-react";
import Nav from "@/components/layout/nav";
import BottomNav from "@/components/shared/bottom-nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import axios from "axios";
import PropertyCards from "@/components/shared/property-cards";
import { Skeleton } from "@/components/ui/skeleton";



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // optional CSS variable
});

const page = () => {
  // const properties = [
  //   {
  //     id: 1,
  //     name: "Mahalakshmi 41",
  //     location: "Nagpur, Maharashtra",
  //     type: "Commercial",
  //     config: "3BHK, 1500 sq.ft",
  //     price: "₹25 Lakh – ₹40 Lakh",
  //     img: "/image/image-1.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Mahalakshmi 41",
  //     location: "Nagpur, Maharashtra",
  //     type: "Commercial",
  //     config: "3BHK, 1500 sq.ft",
  //     price: "₹25 Lakh – ₹40 Lakh",
  //     img: "/image/image-1.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Mahalakshmi 41",
  //     location: "Nagpur, Maharashtra",
  //     type: "Commercial",
  //     config: "3BHK, 1500 sq.ft",
  //     price: "₹25 Lakh – ₹40 Lakh",
  //     img: "/image/image-1.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Mahalakshmi 41",
  //     location: "Nagpur, Maharashtra",
  //     type: "Commercial",
  //     config: "3BHK, 1500 sq.ft",
  //     price: "₹25 Lakh – ₹40 Lakh",
  //     img: "/image/image-1.jpg",
  //   },{
  //     id: 3,
  //     name: "Mahalakshmi 41",
  //     location: "Nagpur, Maharashtra",
  //     type: "Commercial",
  //     config: "3BHK, 1500 sq.ft",
  //     price: "₹25 Lakh – ₹40 Lakh",
  //     img: "/image/image-1.jpg",
  //   },
  // ];

 const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

  const [properties, setProperties] = useState<any[]>([]);  

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/getAllApprovedProperty`);
        // Set properties from response; adapt the path to your API shape if needed
        setProperties(response.data.properties ?? response.data ?? []);
        
      } catch (err) {
        console.error('Failed to fetch properties', err);
        setProperties([]);
      }
    };
    fetchProperties();
    
  }, []);

  useEffect(()=>{
    console.log(properties)
  })



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
      {
        properties ?
        <>
        {properties.map((prop) => (
          <div key={prop.id} className=" rounded-2xl p-3 flex shadow-md items-center justify-center">
             <PropertyCards property={prop}/>
          
             {/* <Link href={"/dashboard/user/find-property/property-list/proprerty-info"}>
                 <button className="text-xs mt-1 p-2 whitespace-nowrap bg-white text-[#0080ff] font-medium px- 2 py-1 rounded-md shadow">
                Book Visit
              </button>
             </Link> */}
  
            
            
            
           
        
           
          </div>
        ))}
        </>: 
           
           <Skeleton className="w-full h-20"/>
        
          }
      </div>

      {/* Bottom Nav */}
       {/* <BottomNav/> */}
    
    </div>
    
    </>
  );
};

export default page;
