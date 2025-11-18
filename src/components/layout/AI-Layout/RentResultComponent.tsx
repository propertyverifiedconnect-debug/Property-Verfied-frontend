import { Building2, MapPin, Home, IndianRupee, Star } from 'lucide-react';
import React from 'react'

const RentResultComponent = ({ answers }: { answers: string[] }) => (
  <div className="bg-white rounded-2xl p-4 shadow-lg max-w-md">
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-blue-100 p-2 rounded-full">
        <Building2 className="text-blue-600" size={24} />
      </div>
      <h3 className="font-bold text-lg">Rent Match Found</h3>
    </div>
    
    <div className="space-y-2 text-sm mb-4">
      <div className="flex items-center gap-2">
        <MapPin size={14} className="text-blue-600" />
        <span className="text-gray-600">Area:</span>
        <span className="font-medium">{answers[0]}</span>
      </div>
      <div className="flex items-center gap-2">
        <Home size={14} className="text-green-600" />
        <span className="text-gray-600">Type:</span>
        <span className="font-medium">{answers[1]}</span>
      </div>
      <div className="flex items-center gap-2">
        <IndianRupee size={14} className="text-purple-600" />
        <span className="text-gray-600">Budget:</span>
        <span className="font-medium">{answers[2]}</span>
      </div>
    </div>

    <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-green-700">Perfect Match</span>
        <div className="flex items-center gap-1">
          <Star className="text-yellow-500 fill-yellow-500" size={16} />
          <span className="font-bold text-green-600">91%</span>
        </div>
      </div>
      <p className="text-sm text-gray-700">✅ Matched with 2 verified roommates</p>
      <p className="text-xs text-gray-600 mt-2">Same profession + {answers[4]} lifestyle</p>
    </div>

    <div className="mt-3 p-3 bg-blue-50 rounded-lg text-xs">
      <p className="font-semibold mb-1">✨ Benefits:</p>
      <ul className="space-y-1 text-gray-700">
        <li>• Safe verified locality</li>
        <li>• Similar lifestyle match</li>
        <li>• Low noise environment</li>
      </ul>
    </div>

    <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
      Schedule Property Visit
    </button>
  </div>
);


export default RentResultComponent