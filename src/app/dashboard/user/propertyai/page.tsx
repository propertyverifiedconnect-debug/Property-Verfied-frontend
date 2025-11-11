"use client";
import React, { JSX,useState } from "react";
import { ArrowLeft, Bot, Send, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import AssistantOptions from "@/components/layout/ai-grid";
import inter from "@/lib/font/Inter";




type Sender = "bot" | "user";

type Message = {
  sender: Sender;
  text: string;
};

export default function Page(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col  bg-[#CDE4F9] text-zinc-700 w-full md:w-[80%] mx-auto h-full sm:h-[600px] md:rounded-3xl overflow-hidden shadow-lg border border-[#123a57]">
        {/* Header */}
    

        <div className="flex items-center gap-2 bg-white px-4 w-full py-3  border-[#0c3d5a]">
                <Link href={"/dashboard/user"}>
          <div className="w-full p-2 px-2 z-[999]">
            <button className="p-2 bg-[#CDE4F9] border   rounded-full">
              <ArrowLeft color="black" size={20} />
            </button>
          </div>
        </Link>
          <div>
            <div className="h-10 w-30 ml-4 rounded-2xl p-2 bg-white overflow-hidden flex items-center scale-150  justify-center">
              <Image src={"/image/assitant.png"}  height={120} width={150} alt="logo" />
            </div>
            {/* <p className="text-xs text-gray-400 mt-2">Let’s get you verified</p> */}
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-[#004b77]/30">
          {messages.map((msg: Message, i: number) => (
            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              {msg.sender === "bot" && (
                <div className="ml-2 p-2 bg-white rounded-2xl">
                  <Bot color="black" />
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] ${
                  msg.sender === "bot" ? "bg-[#003b63] text-white" : "bg-white text-black"
                }`}
              >
                {msg.text}
              </div>
              {msg.sender === "user" && (
                <div className="ml-2 p-2 bg-white rounded-2xl">
                  <User color="black" />
                </div>
              )}
            </div>
          ))}
        </div>

        {messages.length === 0 && <AssistantOptions />}

        {/* Input area */}
        <div className={`${inter.className} p-3  bg-white flex items-center gap-2`}>
          <input
            type="text"
            placeholder="Enter your answer"
            className="flex-1 bg-transparent text-zinc-700 border  rounded-full px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1e90ff]"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend} className="bg-[#007acc] hover:bg-[#0090ff] transition-all p-2 rounded-full">
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
