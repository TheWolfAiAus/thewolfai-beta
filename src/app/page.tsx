"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [prints, setPrints] = useState<{ id: number, x: number, y: number }[]>([]);
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("gemini");

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setPrints((prev) => [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }].slice(-10));
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

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
    <div className="relative h-screen w-screen bg-black flex flex-col items-center justify-center overflow-hidden">
        <Image
          src="/TheWolf.webp"
          alt="Wolf AI"
          width={384}
          height={384}
          className="object-contain"
        />
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 text-transparent bg-clip-text"
      >
        THE WOLF AI
      </motion.h1>
      <div className="w-full max-w-2xl mx-auto mt-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-4">
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
          <div className="h-64 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`rounded-lg px-4 py-2 ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-grow bg-gray-700 text-white rounded-l-md px-4 py-2 focus:outline-none"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white rounded-r-md px-4 py-2"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div aria-hidden="true">
        {prints.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute w-6 h-6"
            style={{ left: p.x, top: p.y }}
          >
            <Image src="/pawprint.png" alt="" width={24} height={24} />
          </motion.div>
        ))}
        <div
          className="pointer-events-none fixed w-12 h-12 rounded-full bg-cyan-400/40 blur-xl"
          style={{ left: cursorPos.x - 24, top: cursorPos.y - 24 }}
        />
      </div>
    </div>
  );
}
