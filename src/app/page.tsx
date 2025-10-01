"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("gemini");

  const handleSend = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch(`/api/${model}`, {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
  };

  return (
    <main className="bg-gray-900 text-white min-h-screen flex flex-col lg:flex-row">
      <div className="lg:w-1/2 p-8 flex flex-col justify-center items-center bg-gray-800">
        <Image
          src="/TheWolf.webp"
          alt="Wolf AI"
          width={384}
          height={384}
          className="object-contain"
          priority
        />
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 text-transparent bg-clip-text mt-4"
        >
          THE WOLF AI
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg mt-4 text-center text-gray-300"
        >
          Your intelligent companion, ready to assist you with a wide range of tasks. Explore the future of AI today.
        </motion.p>
      </div>
      <div className="lg:w-1/2 p-8 flex flex-col">
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 flex-grow flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Chat</h2>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="bg-gray-700 text-white rounded-md px-3 py-1"
            >
              <option value="gemini">Gemini</option>
              <option value="wolf">OpenAI</option>
            </select>
          </div>
          <div className="flex-grow overflow-y-auto mb-4 p-2 bg-gray-900 rounded-md">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="flex mt-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-grow bg-gray-700 text-white rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white rounded-r-md px-4 py-2 hover:bg-blue-700 transition-colors duration-300"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
