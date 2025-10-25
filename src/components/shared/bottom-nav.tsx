"use client"

import { useState } from "react"
import { Battery, BarChart2, User2, Settings, Home, ClipboardList } from "lucide-react"

export default function BottomNav({active ,setActive}) {
  

  const navItems = [
      { id: "Menu", label: "order", icon: <ClipboardList className="h-5 w-5" /> },
      { id: "Home", label: "Home", icon: <Home className="h-5 w-5" /> },
    { id: "Order", label: "Profile", icon: <User2 className="h-5 w-5" /> },
  
  ]

  return (
    <div className="fixed flex md:hidden bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-zinc-700 dark:bg-neutral-900 rounded-2xl shadow-md  justify-around py-3">
      {navItems.map((item) => {
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className="relative flex flex-col items-center gap-1 text-sm font-medium"
          >
            {/* Small dot above active icon */}
         

            {/* Active background circle */}
            <div
              className={`flex items-center justify-center rounded-full transition-all duration-200 ${
                isActive
                  ? "bg-white shadow-sm p-3 -mt-3 text-[#2563eb]"
                  : "p-2 text-white"
              }`}
            >
              {item.icon}
            </div>

            {/* Label */}
            <span
              className={`text-xs capitalize transition-all
                 text-white
              `}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
