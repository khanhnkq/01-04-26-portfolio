"use client";

import { motion } from "framer-motion";
import { SupporterMessage } from "@/data/coffeeConfig";

interface SupporterWallProps {
  supporters: SupporterMessage[];
  showHeader?: boolean;
}

function SupporterCard({ item, index }: { item: SupporterMessage; index: number }) {
  const fileId = `SUPPORTER_${String((index % 99) + 1).padStart(2, "0")}.EXE`;

  return (
    <div className="relative w-[280px] sm:w-[310px] flex-shrink-0 group select-none my-4">
      {/* Yellow Offset Background Card Frame (Matches Project Window Cards) */}
      <div className="absolute inset-0 bg-brand-yellow rounded-2xl translate-x-2.5 translate-y-2.5 transition-transform duration-300 group-hover:translate-x-3.5 group-hover:translate-y-3.5" />

      {/* Main Window App Card */}
      <div className="relative bg-white rounded-2xl border-2 border-brand-blue overflow-hidden shadow-lg flex flex-col justify-between min-h-[290px] transition-transform duration-300 group-hover:-translate-y-1">

        {/* ===== WINDOW TOP BAR ===== */}
        <div className="bg-white border-b-2 border-brand-blue/15 px-4 py-2 flex items-center justify-between">
          {/* 3 Blue Window Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-blue" />
            <span className="w-2.5 h-2.5 rounded-full bg-brand-blue/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-brand-blue/40" />
          </div>

          {/* Monospace Filename Stamp */}
          <span className="font-mono text-[10px] font-bold text-brand-blue/60 uppercase tracking-widest">
            {fileId}
          </span>
        </div>

        {/* ===== CARD BODY ===== */}
        <div className="p-4 flex-1 flex flex-col justify-between bg-paper">
          <div>
            {/* Category Subtitle — SUPPORTER MESSAGE */}
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[9px] text-brand-blue font-bold uppercase tracking-[0.2em]">
                SUPPORTER MESSAGE
              </span>
              <span className="font-mono text-[9px] text-gray-400 font-semibold">
                {item.createdAt}
              </span>
            </div>

            {/* Supporter Name (Big Uppercase Title like QUIZKEN) */}
            <h3 className="font-sans font-black text-lg text-brand-blue leading-tight uppercase tracking-tight mb-2 truncate">
              {item.name}
            </h3>

            {/* Message Block */}
            <div className="bg-brand-blue/5 border border-brand-blue/10 p-3 rounded-xl mb-3">
              <p className="text-brand-blue text-xs font-medium leading-relaxed italic line-clamp-3">
                &ldquo;{item.message}&rdquo;
              </p>
            </div>
          </div>

          {/* Footer & Monospace Tags */}
          <div>
            {/* Tags Row */}
            <div className="flex flex-wrap gap-1.5">
              <span className="font-mono text-[9px] font-bold text-brand-blue border border-brand-blue/30 bg-brand-yellow/30 px-2 py-0.5 rounded-sm uppercase">
                (♡ ‿ ♡) x{item.cups} {item.cups === 1 ? "CUP" : "CUPS"}
              </span>
              <span className="font-mono text-[9px] font-bold text-brand-blue border border-brand-blue/30 px-2 py-0.5 rounded-sm uppercase">
                {item.amount.toLocaleString("vi-VN")} VNĐ
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function SupporterWall({ supporters, showHeader = true }: SupporterWallProps) {
  if (supporters.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 text-center bg-brand-blue/30 rounded-3xl border-2 border-dashed border-brand-yellow/30 text-brand-white my-4">
        <p className="font-script text-xl text-brand-yellow mb-1">
          No coffees received yet! (づ｡◕‿‿◕｡)づ
        </p>
        <p className="text-xs text-gray-300 font-medium">
          Be the first to buy a coffee & drop a warm note! (♡ ‿ ♡)
        </p>
      </div>
    );
  }

  // Ensure enough items for seamless single row infinite looping
  const listTrack = [...supporters, ...supporters, ...supporters, ...supporters];

  return (
    <div className="w-full">
      {/* Header section with proper spacing */}
      {showHeader && (
        <div className="w-full max-w-7xl mx-auto px-6 mb-3 flex items-center justify-between border-b border-brand-yellow/20 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow animate-pulse" />
            <h2 className="text-base sm:text-lg md:text-xl font-black text-brand-yellow uppercase tracking-wider">
              WALL OF APPRECIATION (づ｡◕‿‿◕｡)づ
            </h2>
          </div>
          <span className="font-mono text-[11px] font-bold text-brand-white/80 uppercase tracking-widest hidden sm:inline-block">
            {supporters.length} SUPPORTERS
          </span>
        </div>
      )}

      {/* Outer viewport container with side gradient mask — 100% Full Viewport Width */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] py-2">
        <div className="flex w-max group">
          <motion.div
            className="flex gap-6 sm:gap-8 pr-6 sm:pr-8 group-hover:[animation-play-state:paused]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: Math.max(18, supporters.length * 7),
            }}
          >
            {listTrack.map((item, idx) => (
              <SupporterCard key={`track-${item.id}-${idx}`} item={item} index={idx} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
