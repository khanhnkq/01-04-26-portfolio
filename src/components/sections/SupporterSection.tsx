"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SupporterWall from "@/components/coffee/SupporterWall";
import BottomBar from "@/components/ui/BottomBar";
import { INITIAL_SUPPORTERS, SupporterMessage } from "@/data/coffeeConfig";

export default function SupporterSection() {
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

  return (
    <section className="relative w-full min-h-screen bg-brand-blue flex flex-col items-center justify-center overflow-hidden pt-20 pb-[42px]">
      
      {/* ===== DECORATIVE BACKGROUND PATTERNS ===== */}
      {/* Corner Index Watermark */}
      <div className="absolute top-10 left-10 md:top-20 md:left-20 text-[10rem] md:text-[20rem] font-black font-sans text-brand-yellow/5 leading-none pointer-events-none select-none z-0">
        03
      </div>

      {/* Dot Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #F2E8D5 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />

      {/* Horizontal Ruled Lines */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, #F2E8D5 79px, #F2E8D5 80px)",
        }}
      />

      {/* Corner Bracket Decorations */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 w-16 h-16 md:w-24 md:h-24 border-t-2 border-l-2 border-brand-yellow/10 pointer-events-none z-0" />
      <div className="absolute bottom-16 right-6 md:bottom-20 md:right-12 w-16 h-16 md:w-24 md:h-24 border-b-2 border-r-2 border-brand-yellow/10 pointer-events-none z-0" />

      {/* ===== BACKGROUND TEXT OVERLAY — EXACT SAME STYLE & ALIGNMENT AS HERO & THANKYOU ===== */}
      <motion.div 
        className="absolute top-10 md:top-0 left-0 w-full flex justify-center items-center px-4"
        style={{ pointerEvents: 'none' }}
      >
        <motion.h1 
          className="flex justify-center text-[16vw] md:text-[16vw] font-sans font-black text-brand-yellow leading-none tracking-tighter text-center uppercase"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.1 }
            }
          }}
        >
          {"SUPPORTERS".split("").map((char, index) => (
            <span key={index} className="overflow-hidden inline-block px-1 -mx-1">
              <motion.span
                className="inline-block origin-bottom"
                variants={{
                  hidden: { y: "120%", rotate: 10 },
                  visible: { 
                    y: "0%", 
                    rotate: 0, 
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
                  }
                }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </motion.h1>
        
        {/* Floating Handwriting texts — same style as Hero & ThankYou */}
        <motion.span 
          className="absolute left-[8%] md:left-[10%] top-[60%] md:top-[72%] font-script text-brand-white text-3xl md:text-[4vw]"
          initial={{ opacity: 0, scale: 0, rotate: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.4 }}
        >
          Appreciation
        </motion.span>
        
        <motion.span 
          className="absolute right-[8%] md:right-[10%] top-[60%] md:top-[72%] font-script text-brand-white text-3xl md:text-[4vw]"
          initial={{ opacity: 0, scale: 0, rotate: 15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 5 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.6 }}
        >
          {`(♡ ‿ ♡)`}
        </motion.span>
      </motion.div>

      {/* ===== MAIN CONTENT — CAROUSEL & CTA BUTTON ===== */}
      <div className="w-full relative z-20 flex flex-col items-center justify-center mt-28 md:mt-36">
        
        {/* Supporter Cards Single Row Marquee — Full screen width edge to edge */}
        <div className="w-full">
          <SupporterWall supporters={supporters} showHeader={false} />
        </div>

        {/* CTA Button to Buy Me a Coffee Page */}
        <div className="w-full max-w-7xl px-6 mt-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/buy-me-a-coffee"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-brand-yellow text-brand-blue font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-white hover:scale-105 transition-all shadow-2xl cursor-pointer"
            >
              <span>☕</span>
              <span>Send A Coffee & Leave Your Message</span>
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Yellow Bottom Bar Divider — Shared across all sections */}
      <BottomBar />
    </section>
  );
}
