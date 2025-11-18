import { Star, Users } from 'lucide-react';
import React from 'react'

const CategoryResultComponent = ({ answers }: { answers: string[] }) => (
  <div className="bg-white rounded-2xl p-4 shadow-lg max-w-md">
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-purple-100 p-2 rounded-full">
        <Users className="text-purple-600" size={24} />
      </div>
      <h3 className="font-bold text-lg">Community Match</h3>
    </div>
    
    <div className="space-y-2 text-sm mb-4">
      <div className="flex justify-between">
        <span className="text-gray-600">Profession:</span>
        <span className="font-medium">{answers[0]}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Lifestyle:</span>
        <span className="font-medium">{answers[1]}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Family Type:</span>
        <span className="font-medium">{answers[2]}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Mindset:</span>
        <span className="font-medium">{answers[3]}</span>
      </div>
    </div>

    <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-purple-700">Best Match</span>
        <div className="flex items-center gap-1">
          <Star className="text-yellow-500 fill-yellow-500" size={16} />
          <span className="font-bold text-purple-600">92%</span>
        </div>
      </div>
      <p className="font-semibold text-gray-800">Young IT Professionals Hub</p>
      <p className="text-xs text-gray-600 mt-2">🏘️ Popular Areas: Hinjewadi, Baner, Wakad</p>
    </div>

    <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
      <div className="p-2 bg-blue-50 rounded text-center">
        <p className="font-semibold">Safe</p>
        <p className="text-gray-600">Choices</p>
      </div>
      <div className="p-2 bg-green-50 rounded text-center">
        <p className="font-semibold">Peer</p>
        <p className="text-gray-600">Network</p>
      </div>
      <div className="p-2 bg-purple-50 rounded text-center">
        <p className="font-semibold">Smart</p>
        <p className="text-gray-600">Invest</p>
      </div>
    </div>
  </div>
);


export default CategoryResultComponent