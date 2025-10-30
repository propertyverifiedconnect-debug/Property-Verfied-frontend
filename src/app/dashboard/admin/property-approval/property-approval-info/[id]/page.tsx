"use client";
import React, { useState,useEffect } from "react";
import {
  Heart,
  ArrowLeft,
  ChevronRight,
  Phone,
  Bot,
  Download,
  Book,
  CircleCheck,
  Car,
  Shield,
  MapPin,
  Link2,
  Divide,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Inter } from "next/font/google";
import Nav from "@/components/layout/nav";
import { Badge } from "@/components/ui/badge";
import GoogleIcon from "../../../../../../../public/icons/googleicon";
import { Skeleton } from "@/components/ui/skeleton";
import {motion} from "framer-motion"
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const page = () => {


  const Param = useParams();
  const BASEURl =  process.env.NEXT_PUBLIC_API_URL
    const id = Param.id
    const router = useRouter();
  const [Propertydetails, setPropertydetails] = useState();


  const property = {
    title: "Elegant 2BHK Apartment",
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9b78825?auto=format&fit=crop&w=800&q=80",
    name: "Skyline Residency – Tower B, Flat 204",
    location: "Hinjewadi, Pune, Maharashtra",
    size: "980 sq.ft",
    type: "2BHK Apartment",
    price: "₹ 65,00,000",
    RERA: "8938973889",
    description:
      "This modern 2BHK apartment is located in the heart of Pune’s IT hub. The property offers spacious rooms, premium fittings, 24/7 security, a dedicated parking slot, and excellent connectivity to schools, hospitals, and shopping centers.",
    contact: { whatsapp: "+91 9876543210" },
  };


 // eslint-disable-next-line react-hooks/rules-of-hooks
 useEffect(() => {
  const fetchProperties = async () => {
    try {
      const response = await axios.post(
        `${BASEURl}/api/partner/getPropertiesbyID`,
        { id }, // body
        { withCredentials: true } // config (3rd param)
      );

      setPropertydetails(response.data.properties)

      console.log("Fetched property:", response.data);
    } catch (error) {
      console.error("Error fetching property:", error);
    }
  };

  fetchProperties();
}, [id]);


useEffect(()=>{
   console.log(Propertydetails)
   
},[Propertydetails])


const SetPropertyToApproval = async()=>{


   
    try {
      const response = await axios.post(
        `${BASEURl}/api/partner/setPropertytoApproval`,
        { id }, // body
        { withCredentials: true } // config (3rd param)
      );

     alert(`Approved -  ${response.data}`)
     router.push("/dashboard/admin")
      
    } catch (error) {
      console.error("Error fetching property:", error);
    }
  

}


  return (
    <>
      <Nav />
      <div
        className={`${inter.className} min-h-screen bg-gradient-to-b from-[#D7E9FB] to-[#C8E2F8] flex flex-col items-center pt-16 pb-24`}
      >
        {/* Header */}
        <div className="w-11/12 max-w-md flex items-center justify-between mb-3">
          <Link href="/dashboard/admin/property-approval">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-[#E2F1FF] p-3 bg-white"
            >
              <ArrowLeft className="text-[#007BFF]" />
            </Button>
          </Link>

       

        
        </div>

        {/* Image Section */}
        <div className="w-11/12 max-w-md mb-4">
          <div className="relative">
            { Propertydetails ?
            <motion.div initial={{opacity:0}} animate={{opacity:1}}>
              <img
                src={Propertydetails?.photos?.[0]}
                alt={property.title}
                className="w-full h-96 object-cover rounded-2xl shadow-md"
              />
            </motion.div>
              
               :
              <Skeleton className="h-96 w-full"/>

            }
            <div className="absolute bottom-2 flex items-center justify-center gap-2 left-2 bg-white/90 text-xs px-2 py-1 rounded-full shadow-sm font-medium">
              Verified Listing <CircleCheck size={16} />
            </div>
          </div>
        </div>

        {/* Property Details */}
        <Card className="bg-white w-11/12 max-w-md rounded-2xl shadow-lg border-none">
          <CardContent className="p-5 text-gray-800 text-sm">
            <h3 className="font-bold border-b border-gray-200 pb-2 mb-3 text-[#007BFF] text-base">
              Property Details
            </h3>

               <h1
            className={`${inter.className} font-bold text-gray-700 text-2xl flex items-center gap-1`}
          >
            {Propertydetails?.property_type || ""}
          </h1>
          <br />
            <p><strong>Property Name</strong><br /> {Propertydetails?.property_type}</p>
            <p><strong>Location</strong> <br /> {Propertydetails?.location}</p>
            <p><strong>RERA Number</strong> <br /> {property.RERA}</p>
            <p>
              <strong>Size / Type / Price:</strong><br />
              {property.size} | {property.type} | {property.price}
            </p>

            {/* Highlights */}
            <div className="flex gap-2 flex-wrap mt-4">
              <span className="bg-[#E9F4FF] text-[#007BFF] flex items-center gap-2 px-2 py-1 text-xs rounded-full">
                <Car size={14} /> Parking
              </span>
              <span className="bg-[#E9F4FF] text-[#007BFF] flex items-center gap-2 px-2 py-1 text-xs rounded-full">
                <Shield size={14} /> Security
              </span>
              <span className="bg-[#E9F4FF] text-[#007BFF] flex items-center gap-2 px-2 py-1 text-xs rounded-full">
                <MapPin size={14} /> Prime Location
              </span>
            </div>

            {/* Description */}
            <div className="mt-4">
              <p className="font-semibold mb-1 text-[#007BFF]">Description:</p>
              <p className="text-gray-700 leading-relaxed text-sm">
                {property.description}
              </p>
            </div>

            {/* Contact */}
            <div className="mt-4">
              <p className="font-semibold text-[#007BFF]">Contact</p> <br />
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center justify-center gap-2">
                <Phone size={18} /> Whatsapp
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Analysis */}
        <Card className="bg-white w-11/12 max-w-md rounded-2xl mt-3 shadow-lg border-none">
          <CardContent className="p-5 text-gray-800 text-sm">
            <h3 className="font-bold border-b border-gray-200 pb-2 mb-3 text-[#007BFF] text-base">
              AI Description
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui esse
              voluptas dolor corrupti impedit provident.
            </p>
            <div className="w-full flex items-center justify-center">
              <Button className="w-80 mt-3 flex items-center gap-2 rounded-2xl font-bold bg-[#2396C6] text-white p-2">
                <Bot /> AI Property Analysis
              </Button>
            </div>
          </CardContent>
        </Card>

          <Card className="bg-white w-11/12 max-w-md rounded-2xl mt-3 shadow-lg border-none">
          <CardContent className="p-5 text-gray-800 text-sm">
               <h3 className="font-bold border-b flex gap-2 border-gray-200 pb-2 mb-3 text-[#007BFF] text-base">
             <Link2/> Social Media Links 
            </h3>

            <div className="p-2 w-full flex flex-wrap gap-2  ">
                   <Badge className="px-2 py-1">Vedio Link</Badge>
                    <Badge className="px-2 py-1 ">Google</Badge>
                    <Badge className="px-2 py-1">JustDail</Badge>
                      <Badge className="px-2 py-1">Other</Badge>
            </div>
          </CardContent>
        </Card>


        {/* Action Buttons */}
        <div className="flex  items-center   fixed shadow rounded-2xl bottom-4 bg-white p-4 justify-center gap-3 w-11/12 max-w-md">
          <Button className="flex-1 bg-[#2396C6] hover:bg-[#0062cc] text-white py-5 text-base rounded-xl font-medium shadow">
            <Download /> Brochure
          </Button>

          {/* ✅ Book Visit Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-[#2396C6] hover:bg-[#0062cc] text-white py-5 text-base rounded-xl font-medium shadow">
                <Book />Approve Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white rounded-xl">
                   <div className={`${inter.className}`}>
                    <h1 className="text-xl font-bold text-center ">Lead Approval </h1>
                   <h1 className="p-2 text-center" >Do you want to approval the Lead  <strong>{Propertydetails?.location}</strong> form the partner <strong>{Propertydetails?.users.name}</strong></h1>
                      <div className="w-full flex  items-center justify-center gap-10">
                           
                             <Button onClick={SetPropertyToApproval} variant={"selectdashed"} className="w-[90%] mt-3 hover:bg-white hover:border-2 hover:text-gray-500"> Approved the Lead</Button>
                      </div>
                   </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default page;
