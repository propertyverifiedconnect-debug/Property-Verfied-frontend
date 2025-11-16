"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Bot, Send, User, Home, MessageSquare, PieChart, Building2, MapPin, IndianRupee, TrendingUp, Users, Star } from "lucide-react";
import inter from "@/lib/font/Inter";
import {motion} from "framer-motion"
import Link from "next/link";

type Sender = "bot" | "user" | "component";

type Message = {
  sender: Sender;
  text?: string;
  component?: React.ReactNode;
};

type AssistantMode = "properties" | "budget" | "category" | "rent" | "discuss" | null;

const conversationFlows = {
  properties: [
    {
      question: "Hi! Which area are you searching property in?",
      options: ["Baner, Pune", "Hinjewadi, Pune", "Wakad, Pune", "Kharadi, Pune", "Other"],
      allowText: true
    },
    {
      question: "Great! What's your budget range?",
      options: ["40-60 Lakhs", "60-80 Lakhs", "80 Lakhs - 1 Cr", "1 Cr+"],
      allowText: true
    },
    {
      question: "Do you prefer apartment, villa, or plot?",
      options: ["1BHK Apartment", "2BHK Apartment", "3BHK Apartment", "Villa", "Plot"],
      allowText: false
    },
  ],
  budget: [
    {
      question: "Can I ask few financial questions to check your affordability?",
      options: ["Yes, let's proceed", "No, skip this"],
      allowText: false
    },
    {
      question: "What's your monthly income?",
      options: ["₹50,000-75,000", "₹75,000-1,00,000", "₹1,00,000-1,50,000", "₹1,50,000+"],
      allowText: true
    },
    {
      question: "Any EMIs or loans currently?",
      options: ["No EMIs", "₹10,000-20,000", "₹20,000-30,000", "₹30,000+"],
      allowText: true
    },
    {
      question: "What are your monthly household expenses?",
      options: ["₹20,000-30,000", "₹30,000-40,000", "₹40,000-50,000", "₹50,000+"],
      allowText: true
    },
    {
      question: "Do you plan co-buying with spouse/family?",
      options: ["Yes", "No, solo"],
      allowText: false
    },
  ],
  category: [
    {
      question: "Let's find your community match. What's your profession?",
      options: ["Software Engineer", "Business Owner", "Doctor", "Teacher", "Government Employee", "Other"],
      allowText: true
    },
    {
      question: "Lifestyle type — quiet, social, or active?",
      options: ["Quiet", "Social", "Active"],
      allowText: false
    },
    {
      question: "Family type?",
      options: ["Single, living alone", "Couple", "Family with kids", "Joint family"],
      allowText: false
    },
    {
      question: "Any personal interest or mindset category?",
      options: ["Entrepreneurial", "Creative", "Tech-savvy", "Traditional", "Health-focused"],
      allowText: false
    },
  ],
  rent: [
    {
      question: "Looking for rent options? Which area are you interested in?",
      options: ["Dwarka", "Baner", "Hinjewadi", "Koramangala", "Other"],
      allowText: true
    },
    {
      question: "Prefer shared rooms or full flat?",
      options: ["Shared room", "Full flat - 1BHK", "Full flat - 2BHK"],
      allowText: false
    },
    {
      question: "What's your budget range?",
      options: ["₹5,000-10,000", "₹10,000-15,000", "₹15,000-20,000", "₹20,000+"],
      allowText: true
    },
    {
      question: "What's your profession?",
      options: ["IT Professional", "Govt employee", "Student", "Business", "Other"],
      allowText: true
    },
    {
      question: "Lifestyle preference — quiet or social?",
      options: ["Quiet", "Social"],
      allowText: false
    },
  ],
  discuss: [
    {
      question: "Welcome to AI Discuss — your free talk zone! What would you like to discuss today?",
      options: ["Compare Properties", "Market Analysis", "Investment Advice", "Area Recommendations"],
      allowText: true
    },
  ],
};

const assistantOptions = [
  { id: "properties", label: "View Properties with AI ", icon: Home },
  { id: "budget", label: "Budget Analysis", icon: PieChart },
  { id: "category", label: "People's Category Choice", icon: User },
  { id: "rent", label: "Rent Solutions (Smart Matching)", icon: Building2 },
  { id: "discuss", label: "AI Discuss", icon: MessageSquare },
];

// Result Components
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

const BudgetResultComponent = ({ answers }: { answers: string[] }) => (
  <div className="bg-white rounded-2xl p-4 shadow-lg max-w-md">
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-green-100 p-2 rounded-full">
        <PieChart className="text-green-600" size={24} />
      </div>
      <h3 className="font-bold text-lg">Budget Analysis</h3>
    </div>
    
    <div className="space-y-3 text-sm">
      <div className="p-3 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Monthly Income</p>
        <p className="font-bold text-lg">{answers[1]}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 bg-orange-50 rounded-lg">
          <p className="text-gray-600 text-xs">Current EMIs</p>
          <p className="font-semibold">{answers[2]}</p>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg">
          <p className="text-gray-600 text-xs">Expenses</p>
          <p className="font-semibold">{answers[3]}</p>
        </div>
      </div>
    </div>

    <div className="mt-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="text-green-600" size={20} />
        <span className="font-bold text-green-700">Safe Purchase Limit</span>
      </div>
      <p className="text-2xl font-bold text-green-600">₹60-65 Lakhs</p>
      <p className="text-xs text-gray-600 mt-1">EMI Capacity: ₹28,000/month</p>
      <p className="text-xs text-green-700 mt-2">✅ Risk Level: Low</p>
    </div>

    <div className="mt-3 p-3 bg-yellow-50 rounded-lg text-xs">
      <p className="text-gray-700">💡 <strong>Recommendation:</strong> Prefer verified 2BHK within ₹60L for safe EMI ratio (28%)</p>
    </div>
  </div>
);

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

const DiscussResultComponent = ({ answers }: { answers: string[] }) => (
  <div className="bg-white rounded-2xl p-4 shadow-lg max-w-md">
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-orange-100 p-2 rounded-full">
        <MessageSquare className="text-orange-600" size={24} />
      </div>
      <h3 className="font-bold text-lg">AI Discussion</h3>
    </div>
    
    <div className="p-3 bg-gray-50 rounded-lg mb-4">
      <p className="text-sm text-gray-600">Topic Selected</p>
      <p className="font-semibold text-gray-800">{answers[0]}</p>
    </div>

    <div className="space-y-2">
      <div className="p-3 bg-blue-50 rounded-lg flex items-start gap-2">
        <span className="text-blue-600 font-bold">✓</span>
        <p className="text-sm text-gray-700">Property comparisons available</p>
      </div>
      <div className="p-3 bg-green-50 rounded-lg flex items-start gap-2">
        <span className="text-green-600 font-bold">✓</span>
        <p className="text-sm text-gray-700">Market analysis ready</p>
      </div>
      <div className="p-3 bg-purple-50 rounded-lg flex items-start gap-2">
        <span className="text-purple-600 font-bold">✓</span>
        <p className="text-sm text-gray-700">Investment advice prepared</p>
      </div>
    </div>

    <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg">
      <p className="text-xs text-gray-700">💡 Ask me anything about properties, investments, or area recommendations!</p>
    </div>
  </div>
);

export default function AIAssistantChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [currentMode, setCurrentMode] = useState<AssistantMode>(null);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [allowTextInput, setAllowTextInput] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showOptions]);

  const handleModeSelection = (mode: AssistantMode) => {
    setCurrentMode(mode);
    setQuestionIndex(0);
    setUserAnswers([]);
    
    const flow = conversationFlows[mode as keyof typeof conversationFlows];
    const firstQuestion = flow[0];
    
    setMessages([{ sender: "bot", text: firstQuestion.question }]);
    setCurrentOptions(firstQuestion.options);
    setAllowTextInput(firstQuestion.allowText);
    setShowOptions(true);
  };

  const getResultComponent = (mode: string, answers: string[]) => {
    switch (mode) {
      case "properties":
        return <PropertyResultComponent answers={answers} />;
      case "budget":
        return <BudgetResultComponent answers={answers} />;
      case "category":
        return <CategoryResultComponent answers={answers} />;
      case "rent":
        return <RentResultComponent answers={answers} />;
      case "discuss":
        return <DiscussResultComponent answers={answers} />;
      default:
        return null;
    }
  };

  const callAPI = async (mode: string, answers: string[]) => {
    setIsProcessing(true);
    
    try {
      // Simulated API call - replace with your actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add component message
      const resultComponent = getResultComponent(mode, answers);
      setMessages((prev) => [...prev, { sender: "component", component: resultComponent }]);
      
    } catch (error) {
      console.error("API Error:", error);
      
      // Fallback: still show component on error
      const resultComponent = getResultComponent(mode, answers);
      setMessages((prev) => [...prev, { sender: "component", component: resultComponent }]);
    } finally {
      setIsProcessing(false);
      setShowOptions(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    handleAnswer(option);
  };

  const handleTextSubmit = () => {
    if (input.trim() === "") return;
    handleAnswer(input);
    setInput("");
  };

  const handleAnswer = (answer: string) => {
    if (!currentMode) return;

    setMessages((prev) => [...prev, { sender: "user", text: answer }]);
    
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);
    
    const currentFlow = conversationFlows[currentMode as keyof typeof conversationFlows];
    const nextIndex = questionIndex + 1;

    setShowOptions(false);

    if (nextIndex < currentFlow.length) {
      setTimeout(() => {
        const nextQuestion = currentFlow[nextIndex];
        setMessages((prev) => [...prev, { sender: "bot", text: nextQuestion.question }]);
        setCurrentOptions(nextQuestion.options);
        setAllowTextInput(nextQuestion.allowText);
        setShowOptions(true);
        setQuestionIndex(nextIndex);
      }, 500);
    } else {
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "bot", text: "Perfect! Let me analyze your responses..." }]);
        callAPI(currentMode, newAnswers);
      }, 500);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setCurrentMode(null);
    setQuestionIndex(0);
    setUserAnswers([]);
    setInput("");
    setShowOptions(false);
  };

  return (
    <div className={`${inter.className} h-screen w-full flex items-center justify-center bg-gray-100`}>
      <div className="flex flex-col bg-[#CDE4F9] text-zinc-700 w-full md:w-[80%] mx-auto h-full sm:h-[600px] md:rounded-3xl overflow-hidden shadow-lg border border-[#123a57]">
        {/* Header */}
        <div className="flex items-center gap-2 bg-white px-4 w-full py-1">
          <div className="p-2">
          {
              showOptions ?
            <button 
              onClick={handleReset}
              className="p-2 bg-[#CDE4F9] border rounded-full hover:bg-[#b5d4f0] transition-colors"
            >
              <ArrowLeft color="black" size={20} />
            </button>
              
              :
            <Link href="/dashboard/user">
            
             <button 
              className="p-2 bg-[#CDE4F9] border rounded-full hover:bg-[#b5d4f0] transition-colors"
            >
              <ArrowLeft color="black" size={20} />
            </button>
            </Link>
            }
          </div>
          <div className="h-20 w-30">
            <img src="/image/assitant.png" alt="AI Assistant" />
          </div>
          <div className="flex-1">
           
          </div>
        </div>

        {/* Chat messages */}
              <p className="font-semibold text-xl text-center mt-3 mb-3">
              {currentMode ? assistantOptions.find(opt => opt.id === currentMode)?.label : ""}
            </p>
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((msg: Message, i: number) => (
            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : msg.sender === "component" ? "justify-start" : "justify-start"}`}>
              {msg.sender === "bot" && (
                
                <div className="p-2 h-10 bg-white rounded-2xl flex-shrink-0">
                  <Bot color="black" size={20} />
                </div>
              )}
              
              {msg.sender === "component" ? (
                <div className="w-full flex justify-start">
                  <div className="p-2 h-10 bg-white rounded-2xl flex-shrink-0">
                    <Bot color="black" size={20} />
                  </div>
                  <div className="ml-2">
                    {msg.component}
                  </div>
                </div>
              ) : (
                <motion.div
                    initial={{opacity:0}}
                     animate={{opacity:1}}
                  className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] whitespace-pre-line ${
                    msg.sender === "bot" ? "bg-[#2588e3] text-white ml-2" : "bg-white text-black mr-2"
                  }`}
                >
                  {msg.text}
                </motion.div>
              )}
              
              {msg.sender === "user" && (
                <div className="p-2 bg-white rounded-2xl flex-shrink-0">
                  <User color="black" size={20} />
                </div>
              )}
            </div>
          ))}
          
          {/* Options Display */}
          {showOptions && currentOptions.length > 0 && (
            <>
         
            <div className="flex justify-start animate-fadeIn">
              <div className="p-2 h-10 bg-white rounded-2xl flex-shrink-0">
                <Bot color="black" size={20} />
              </div>
              <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1,y:10}} className="ml-2 flex flex-wrap gap-2 max-w-[75%]">
                {currentOptions.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(option)}
                    className="px-4 py-2 bg-white text-[#007acc] border-2 border-[#007acc] rounded-full text-sm font-medium hover:bg-[#007acc] hover:text-white transition-all shadow-sm hover:shadow-md animate-slideUp"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    {option}
                  </button>
                ))}
              </motion.div>
            </div>
            </>
          )}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="p-2 bg-white rounded-2xl">
                <Bot color="black" size={20} />
              </div>
              <div className="px-4 py-2 rounded-2xl text-sm bg-[#003b63] text-white ml-2">
                <div className="flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>●</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>●</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Assistant Options Grid */}
        {messages.length === 0 && (
          <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <h1 className="font-bold text-3xl md:text-4xl mb-8 text-center">What can I help with?</h1>
            <div className="md:w-[26rem] w-full gap-2 flex flex-wrap items-center justify-center">
              {assistantOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <motion.button
                    initial={{opacity:0}}
                     animate={{opacity:1}}
                    key={option.id}
                    onClick={() => handleModeSelection(option.id as AssistantMode)}
                    className="p-3 rounded-full gap-1 flex items-center text-[11px] md:text-sm justify-center w-fit border-2 border-dashed border-zinc-700 hover:bg-white hover:border-solid hover:shadow-md transition-all cursor-pointer"
                  >
                    <Icon size={20} /> {option.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="p-3 bg-white flex items-center gap-2 border-t border-[#0c3d5a]">
          <input
            type="text"
            placeholder={
              !currentMode 
                ? "Select an option above to start" 
                : allowTextInput && showOptions
                ? "Type your answer or select an option..."
                : showOptions
                ? "Select an option above..."
                : "Waiting for AI response..."
            }
            className="flex-1 bg-transparent text-zinc-700 border rounded-full px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1e90ff]"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleTextSubmit()}
            disabled={!currentMode || !allowTextInput || !showOptions || isProcessing}
          />
          <button 
            onClick={handleTextSubmit} 
            disabled={!currentMode || !allowTextInput || !showOptions || isProcessing || input.trim() === ""}
            className="bg-[#007acc] hover:bg-[#0090ff] transition-all p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}