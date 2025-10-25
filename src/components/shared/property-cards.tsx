import { Heart, Link } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import inter from '@/lib/font/Inter'


function PropertyCards() {

    const prop = 
 {
      id: 1,
      name: "Mahalakshmi 41",
      location: "Nagpur, Maharashtra",
      type: "Commercial",
      config: "3BHK, 1500 sq.ft",
      price: "₹25 Lakh – ₹40 Lakh",
      img: "/image/image-1.jpg",
    }
    
  return (
        <div key={prop.id} className="bg-[#A5D2F2]  rounded-2xl p-3 w-full flex shadow-md items-center justify-center">
            <img
              src={prop.img}
              alt={prop.name}
              className="w-23 h-23 rounded-lg object-cover"
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
             <div className="flex justify-center items-center gap-3">
              <span className="inline-block mt-1 whitespace-nowrap bg-white text-xs font-semibold px-2 py-1 rounded-lg">
                {prop.price}
              </span>
           
              <button variant={"outline"} className={` ${inter.className} px-4 font-semibold   whitespace-nowrap p-1 mt-1 rounded-xl text-xs bg-white  `}>
                Visit Lead 
              </button>

             </div>
            </div>
            
            
           
        
           
          </div>
  )
}

export default PropertyCards