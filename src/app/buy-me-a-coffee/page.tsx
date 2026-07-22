"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import CoffeeForm from "@/components/coffee/CoffeeForm";
import SupporterWall from "@/components/coffee/SupporterWall";
import BottomBar from "@/components/ui/BottomBar";
import { INITIAL_SUPPORTERS, SupporterMessage } from "@/data/coffeeConfig";

export default function BuyMeACoffeePage() {
  const [cupsCount, setCupsCount] = useState<number>(3);
  const [supporters, setSupporters] = useState<SupporterMessage[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_coffee_supporters");
    if (saved) {
      try {
        setSupporters(JSON.parse(saved));
      } catch {
        setSupporters(INITIAL_SUPPORTERS);
      }
    } else {
      setSupporters(INITIAL_SUPPORTERS);
    }
  }, []);

  const handleAddSupporter = (newSupporter: SupporterMessage) => {
    const updated = [newSupporter, ...supporters];
    setSupporters(updated);
    localStorage.setItem("portfolio_coffee_supporters", JSON.stringify(updated));
  };

  return (
    <main className="w-full min-h-screen bg-brand-blue text-brand-yellow flex flex-col justify-between relative overflow-hidden pb-[42px]">

      {/* ===== DECORATIVE BACKGROUND PATTERNS ===== */}
      {/* Corner Index Watermark */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 text-[8rem] md:text-[14rem] font-black font-sans text-brand-yellow/5 leading-none pointer-events-none select-none z-0">
        04
      </div>

      {/* Dot Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #F2E8D5 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, #F2E8D5 79px, #F2E8D5 80px)",
        }}
      />

      {/* Corner Bracket Decorations */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 w-12 h-12 md:w-20 md:h-20 border-t-2 border-l-2 border-brand-yellow/10 pointer-events-none z-0" />
      <div className="absolute bottom-14 right-4 md:bottom-16 md:right-8 w-12 h-12 md:w-20 md:h-20 border-b-2 border-r-2 border-brand-yellow/10 pointer-events-none z-0" />

      {/* ===== HEADER NAVIGATION & TITLE ===== */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-3 pb-1 z-30 relative flex flex-col items-center">
        {/* Navigation Row */}
        <div className="w-full flex items-center justify-between mb-1">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow text-brand-blue font-black text-[11px] uppercase tracking-wider hover:bg-white hover:scale-105 transition-all shadow-md cursor-pointer"
          >
            <span>←</span> BACK TO PORTFOLIO
          </Link>
        </div>


      </div>

      {/* ===== MAIN FORM CONTENT (PROMINENT & FIT IN SINGLE SCREEN) ===== */}
      <div className="w-full max-w-5xl mx-auto px-6 z-20 flex-1 flex flex-col justify-center my-10">
        <CoffeeForm
          cupsCount={cupsCount}
          setCupsCount={setCupsCount}
          onSupporterAdd={handleAddSupporter}
        />
      </div>

      {/* ===== SUPPORTER CAROUSEL WITH HEADER & SPACING ===== */}
      <div className="w-full z-20 my-10">
        <SupporterWall supporters={supporters} showHeader={true} />
      </div>

      {/* Shared Bottom Bar */}
      <BottomBar />
    </main>
  );
}
