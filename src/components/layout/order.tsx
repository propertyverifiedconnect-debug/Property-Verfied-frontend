import React, { useEffect, useState } from "react";
import inter from "@/lib/font/Inter";
import OrderCard from "../shared/orderCard";
import { ChevronRight, Search } from "lucide-react";
import axios from "axios";

function Order() {
  const [Orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const BASEURL = process.env.NEXT_PUBLIC_API_URL;

  // 👉 Fetch Orders
  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await axios.get(`${BASEURL}/api/user/getUserOrder`, {
          withCredentials: true,
        });

        setOrders(response.data.booking);
      } catch (error) {
        console.error("something went wrong", error);
      }
    };

    getOrder();
  }, []); // ❗ fixed dependency

  // 👉 FILTER LOGIC
  const filteredOrders = Orders.filter((order) => {
    const text = searchText.toLowerCase();

    return (
      order.approved_property_id.property_name.toLowerCase().includes(text) ||
      order.approved_property_id.location.toLowerCase().includes(text) ||
      order.approved_property_id.user_id.name.toLowerCase().includes(text) ||
      order.status.toLowerCase().includes(text)
    );
  });

  return (
    <div
      className={`${inter.className} p-2 text-2xl text-gray-500 flex flex-col md:items-center md:justify-center overflow-hidden pt-24 mb-30 min-h-screen w-full -mt-20`}
    >
      <div>
        <h1 className="flex items-center font-bold">
          Orders <ChevronRight />
        </h1>

        {/* 🔍 Search Box */}
        <div className="flex items-center bg-white rounded-full shadow px-3 w-full mt-2 max-w-md mb-3">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by property name, location, partner..."
            className="w-full px-3 py-2 text-sm outline-none bg-transparent"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Order List */}
        <div className="h-full w-full mt-3 gap-4 flex flex-col items-center justify-center">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((val, index) => (
              <OrderCard
                key={index}
                Orders={val}
                image="https://images.unsplash.com/photo-1560185127-6ed189bf02f4"
              />
            ))
          ) : (
            <p className="text-gray-500 mt-4">No matching orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
