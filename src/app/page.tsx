"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [prints, setPrints] = useState<{ id: number, x: number, y: number }[]>([]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setPrints((prev) => [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }].slice(-10));
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Image
          src="/TheWolf.webp"
          alt="Wolf AI"
          width={384}
          height={384}
          className="object-contain"
        />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 text-transparent bg-clip-text"
      >
        THE WOLF AI
      </motion.h1>
      <div className="flex gap-6 mt-10">
        <button className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-pink-500">
          Sign In
        </button>
        <button className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-400">
          Dashboard
        </button>
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
