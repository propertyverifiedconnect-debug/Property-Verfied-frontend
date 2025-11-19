import React from 'react';
import { MapPin, Home, Bed, Bath, Square, Heart } from 'lucide-react';

export default function RecommandationCard() {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden group">
        <img 
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTta0XsQDICRBsKhhCivnBCRkL3KDsfAc66jg&s" 
          alt="Rajshree Apartment" 
        />
        {/* Overlay Badge */}
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Featured
        </div>
        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title and Location */}
        <div className="mb-2">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Rajshree Apartment</h2>
            <div>
            <div className="text-lg font-bold text-gray-800 ">₹4,00,000</div>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span className='text-sm'>Itwari, Nagpur</span>
          </div>
        </div>

        {/* Property Features */}
        <div className="mb-0 ">
          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
            <Home className="w-3 h-3" />
            Apartment
          </span>
        </div>
     

        {/* Property Type */}

        {/* Price and Action */}
        <div className="flex items-start justify-between flex-col ">
    
          <button className="bg-[#2396C6]  hover:bg-blue-700 text-white px-1 py-1 mt-2 w-full rounded-lg font-semibold text-sm transition-colors duration-200 shadow-md hover:shadow-lg">
           Visit Property
          </button>
        </div>
      </div>
    </div>
  );
}