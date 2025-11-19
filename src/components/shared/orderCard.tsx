import React from "react";
import StatusTimeline from "./statusline";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

function OrderCard({
  Orders,

}) {

  console.log(Orders)
  return (
    <div className="w-full max-w-2xl bg-white border rounded-lg shadow-sm p-4 flex flex-col gap-4 cursor-pointer hover:shadow-md transition">
      
      {/* Left Image */}
      <div className="relative">
        <img
          src={Orders.approved_property_id.photos[0]|| ""}
          className="w-full h-40 object-cover rounded-md border"
          alt="property"
        />

      <Badge className=" absolute bottom-2 scale-90 opacity-90"><CheckCircle/> Verified Property</Badge>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-between w-full">
        
        {/* Main Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{Orders.approved_property_id
.property_name}</h2>
          <p className="text-gray-500 text-sm">{Orders.approved_property_id
.location}</p>

          

          <p className="text-gray-600 text-sm">
            <span className="font-medium">Booking Date:</span> 
  {new Date(Orders.created_at).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })}
            
          </p>

          <p className="text-gray-700 text-sm mt-1">
            <span className="font-medium">Price:</span> ₹{Orders.approved_property_id.price}
          </p>

            <p className="text-gray-700 text-sm mt-1">
            <span className="font-medium">Partner:</span> {Orders.approved_property_id.user_id.name}
          </p>

            <p className="text-gray-700 text-sm mt-1">
            <span className="font-medium">Visting Date: {Orders.visit_date} | {Orders.visit_time}</span> 
          </p>
          
         
          {/* Extra Description */}
         
        </div>

        {/* Status */}
        <Link href={`/dashboard/user/find-property/property-list/proprerty-info/${Orders.approved_property_id.id}`}>
         <Button variant={"selectdashed"} className=" mt-2 w-full " >Visit Property</Button>
        </Link>

       
        <StatusTimeline status={Orders.status}/>

       
        
      </div>
    </div>
  );
}

export default OrderCard;
