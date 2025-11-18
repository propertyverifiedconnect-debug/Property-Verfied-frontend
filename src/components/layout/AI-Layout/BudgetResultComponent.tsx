import { PieChart, TrendingUp } from "lucide-react";
import {motion} from "framer-motion"

const BudgetResultComponent = ({ answers ,  predictions }: { answers: string[] }) => (
  <div className="bg-white rounded-2xl p-4 shadow-lg max-w-md">
    <div
    
    className="flex items-center gap-2 mb-4">
      <div className="bg-green-100 p-2 rounded-full">
        <PieChart className="text-green-600" size={24} />
      </div>
      <h3 className="font-bold text-lg">Budget Analysis</h3>
    </div>
    
    <div className="space-y-3 text-sm">
      <motion.div
      className="p-3 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Monthly Income</p>
        <motion.p
              initial={{opacity:0}}
      animate={{opacity:1}}
    transition={{delay:0.7}}
        className="font-bold text-lg">{answers[1]} </motion.p>
      </motion.div>
      
      <motion.div
     
      className="grid grid-cols-2 gap-2">
        <div className="p-3 bg-orange-50 rounded-lg">
          <p className="text-gray-600 text-xs">Current EMIs</p>
          <motion.p 
             initial={{opacity:0}}
      animate={{opacity:1}}
    transition={{delay:1.0}}
          className="font-semibold">{answers[2]}</motion.p>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg">
          <p className="text-gray-600 text-xs">Expenses</p>
          <motion.p
             initial={{opacity:0}}
      animate={{opacity:1}}
    transition={{delay:1.2}}
          className="font-semibold">{answers[3]}</motion.p>
        </div>
      </motion.div>
    </div>

    <motion.div
  
    
    className="mt-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="text-green-600" size={20} />
        <span className="font-bold text-green-700">Safe Purchase Limit</span>
      </div>
      <motion.p
          initial={{opacity:0}}
      animate={{opacity:1}}
    transition={{delay:1.2}}
       className="text-2xl font-bold text-green-600">{predictions?.safe_purchase_limit}</motion.p>
      <p className="text-xs text-gray-600 mt-1">EMI Capacity: {predictions?.emi_capacity} /month</p>
      <p className="text-xs text-green-700 mt-2">✅ Risk Level: {predictions?.risk}</p>
    </motion.div>

    <motion.div
    className="mt-3 p-3 bg-yellow-50 rounded-lg text-xs">
      <motion.p 
          initial={{opacity:0}}
      animate={{opacity:1}}
    transition={{delay:1.5}}
      
      className="text-gray-700">💡 <strong>Recommendation:</strong> {predictions?.recommendation}</motion.p>
    </motion.div>
  </div>
);


export default BudgetResultComponent