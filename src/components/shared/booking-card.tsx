import { Heart } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import inter from '@/lib/font/Inter'
import {motion} from "framer-motion" 
import Link from 'next/link'

function BookingCards({property}) {

  
  return (
        <motion.div initial={{opacity:0}} animate={{y:-10,opacity:1}} key={property.id} className="bg-[#A5D2F2]  rounded-2xl p-3 w-full flex shadow-md items-center justify-center">
            <img
              src={property.approved_property_id.photos}
              alt={property.name}
              className="w-23 h-23 rounded-lg object-cover"
            />
            <div className="flex-1 px-3">
                <div className="flex items-start justify-between">
                    <div>
              <h3 className="font-semibold text-gray-800">{property.approved_property_id.property_type}</h3>
              <p className="text-xs text-gray-700 gap-2">
                  Partner : {property.approved_property_id.user_id.name} <br /> 
                <span> Booked by : {property.user_id.name}</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">{property.config}</p>

                    </div>
                <Heart size={18} className="text-[#0080ff] cursor-pointer" />

                </div>
             <div className="flex justify-start items-start gap-3">
              <span className="inline-block mt-1 whitespace-nowrap bg-white text-xs font-semibold px-2 py-1 rounded-lg">
                 ₹ {property.approved_property_id.price}
              </span>
           
         
           <Link href={`/dashboard/admin/booking-approval/${property.id}`}>
              <button  className={` ${inter.className} px-4 font-semibold   whitespace-nowrap p-1 mt-1 rounded-xl text-xs bg-white  `}>
                Visit Booking
              </button>
           
           </Link>
          

             </div>
            </div>
            
            
           
        
           
          </motion.div>
  )
}

export default BookingCards