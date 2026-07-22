"use client";

import { motion } from "framer-motion";
import type { SupporterMessage } from "@/types/donation";

interface SupporterWallProps {
  supporters: SupporterMessage[];
  showHeader?: boolean;
  rows?: number;
}

function getLoopTrack(items: SupporterMessage[], minCount = 8): SupporterMessage[] {
  if (items.length === 0) return [];
  let track = [...items];
  while (track.length < minCount) {
    track = [...track, ...items];
  }
  return [...track, ...track];
}

function SupporterCard({ item, index }: { item: SupporterMessage; index: number }) {
  const fileId = `SUPPORTER_${String((index % 99) + 1).padStart(2, "0")}.EXE`;
  const createdAt = new Date(item.createdAt);
  const displayedDate = Number.isNaN(createdAt.getTime())
    ? item.createdAt
    : new Intl.DateTimeFormat("vi-VN", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(createdAt);

  return (
    <div className="relative w-[280px] sm:w-[310px] flex-shrink-0 group select-none my-2">
      {/* Yellow Offset Background Card Frame (Matches Project Window Cards) */}
      <div className="absolute inset-0 bg-brand-yellow rounded-2xl translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />

      {/* Main Window App Card */}
      <div className="relative bg-white rounded-2xl border-2 border-brand-blue overflow-hidden shadow-lg flex flex-col justify-between min-h-[260px] transition-transform duration-300 group-hover:-translate-y-1">

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
                {displayedDate}
              </span>
            </div>

            {/* Supporter Name (Big Uppercase Title like QUIZKEN) */}
            <h3 className="font-sans font-black text-base sm:text-lg text-brand-blue leading-tight uppercase tracking-tight mb-2 truncate">
              {item.name}
            </h3>

            {/* Message Block */}
            <div className="bg-brand-blue/5 border border-brand-blue/10 p-2.5 rounded-xl mb-2">
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

export default function SupporterWall({ supporters, showHeader = true, rows = 2 }: SupporterWallProps) {
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

  const headerElement = showHeader && (
    <div className="w-full max-w-7xl mx-auto px-6 mb-4 flex items-center justify-between border-b border-brand-yellow/20 pb-2">
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
  );

  // Single Row Mode (Used on Main Page)
  if (rows === 1) {
    const singleTrack = getLoopTrack(supporters);
    const durationSingle = Math.max(18, singleTrack.length * 3.5);

    return (
      <div className="w-full">
        {headerElement}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] py-2">
          <div className="flex w-max group">
            <motion.div
              className="flex gap-5 sm:gap-6 pr-5 sm:pr-6 group-hover:[animation-play-state:paused]"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: durationSingle,
              }}
            >
              {singleTrack.map((item, idx) => (
                <SupporterCard key={`single-${item.id}-${idx}`} item={item} index={idx} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Multi Row Mode (2 Rows, Used on /buy-me-a-coffee Page)
  const row1Raw = supporters.filter((_, i) => i % 2 === 0);
  const row2Raw = supporters.filter((_, i) => i % 2 === 1);

  const row1Items = getLoopTrack(row1Raw.length ? row1Raw : supporters);
  const row2Items = getLoopTrack(row2Raw.length ? row2Raw : supporters);

  const durationRow1 = Math.max(22, row1Items.length * 3.5);
  const durationRow2 = Math.max(26, row2Items.length * 4);

  return (
    <div className="w-full">
      {headerElement}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] py-2 flex flex-col gap-4">
        {/* ROW 1: Moves Right -> Left */}
        <div className="flex w-max group">
          <motion.div
            className="flex gap-5 sm:gap-6 pr-5 sm:pr-6 group-hover:[animation-play-state:paused]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: durationRow1,
            }}
          >
            {row1Items.map((item, idx) => (
              <SupporterCard key={`row1-${item.id}-${idx}`} item={item} index={idx} />
            ))}
          </motion.div>
        </div>

        {/* ROW 2: Moves Left -> Right */}
        <div className="flex w-max group">
          <motion.div
            className="flex gap-5 sm:gap-6 pr-5 sm:pr-6 group-hover:[animation-play-state:paused]"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: durationRow2,
            }}
          >
            {row2Items.map((item, idx) => (
              <SupporterCard key={`row2-${item.id}-${idx}`} item={item} index={idx} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}


