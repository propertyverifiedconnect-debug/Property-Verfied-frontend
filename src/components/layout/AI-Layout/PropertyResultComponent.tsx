import { Building2, Home, IndianRupee, MapPin, Star } from "lucide-react";

const PropertyResultComponent = ({ answers }: { answers: string[] }) => (
  <div className="bg-white rounded-2xl p-4 shadow-lg max-w-md">
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-green-100 p-2 rounded-full">
        <Home className="text-green-600" size={24} />
      </div>
      <h3 className="font-bold text-lg">Property Analysis Complete</h3>
    </div>
    
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm">
        <MapPin size={16} className="text-blue-600" />
        <span className="font-medium">Area:</span>
        <span>{answers[0]}</span>
      </div>
      
      <div className="flex items-center gap-2 text-sm">
        <IndianRupee size={16} className="text-green-600" />
        <span className="font-medium">Budget:</span>
        <span>{answers[1]}</span>
      </div>
      
      <div className="flex items-center gap-2 text-sm">
        <Building2 size={16} className="text-purple-600" />
        <span className="font-medium">Type:</span>
        <span>{answers[2]}</span>
      </div>
    </div>

    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">Top Match</span>
        <div className="flex items-center gap-1">
          <Star className="text-yellow-500 fill-yellow-500" size={16} />
          <span className="font-bold text-blue-600">87%</span>
        </div>
      </div>
      <p className="text-sm text-gray-700">{answers[2]} in {answers[0]}</p>
      <div className="mt-2 text-xs text-gray-600">
        <div className="flex justify-between"><span>Area Rating:</span><span>9/10 ✅</span></div>
        <div className="flex justify-between"><span>Price:</span><span>7/10 ⚖️</span></div>
        <div className="flex justify-between"><span>Lifestyle:</span><span>8/10 ☕</span></div>
      </div>
    </div>

    <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
      View Properties
    </button>
  </div>
);


export default PropertyResultComponent