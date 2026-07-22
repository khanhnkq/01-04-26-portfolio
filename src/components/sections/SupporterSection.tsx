"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SupporterWall from "@/components/coffee/SupporterWall";
import BottomBar from "@/components/ui/BottomBar";
import { useSupporters } from "@/hooks/useSupporters";

export default function SupporterSection() {
  const { supporters } = useSupporters();

  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-paper pb-[42px] pt-20">

      {/* ===== DECORATIVE BACKGROUND PATTERNS ===== */}
      {/* Corner Index Watermark */}
      <div className="pointer-events-none absolute left-10 top-10 z-0 select-none font-sans text-[10rem] font-black leading-none text-brand-blue/5 md:left-20 md:top-20 md:text-[20rem]">
        03
      </div>

      {/* Dot Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #0A2463 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />

      {/* Horizontal Ruled Lines */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, #0A2463 79px, #0A2463 80px)",
        }}
      />

      {/* Corner Bracket Decorations */}
      <div className="pointer-events-none absolute left-6 top-6 z-0 h-16 w-16 border-l-2 border-t-2 border-brand-blue/10 md:left-12 md:top-12 md:h-24 md:w-24" />
      <div className="pointer-events-none absolute bottom-16 right-6 z-0 h-16 w-16 border-b-2 border-r-2 border-brand-blue/10 md:bottom-20 md:right-12 md:h-24 md:w-24" />

      {/* Section heading — aligned with the About Me heading system */}
      <motion.div
        className="pointer-events-none absolute right-4 top-12 z-20 flex flex-col items-end text-right md:right-20 md:top-10 lg:right-8 lg:top-24"
        style={{ pointerEvents: 'none' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
        }}
      >
        <motion.h1
          className="mb-3 flex justify-end font-sans text-4xl font-black uppercase leading-none tracking-widest text-brand-blue md:mb-5 md:text-5xl lg:text-[7rem]"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.06, delayChildren: 0.05 }
            }
          }}
        >
          {"SUPPORTERS".split("").map((char, index) => (
            <span key={index} className="overflow-hidden inline-block px-1 -mx-1">
              <motion.span
                className="inline-block origin-bottom"
                variants={{
                  hidden: { y: "120%", rotate: 10, opacity: 0 },
                  visible: {
                    y: "0%",
                    rotate: 0,
                    opacity: 1,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <div className="flex items-center justify-end gap-5 md:gap-8">
          <motion.span
            className="font-script text-2xl text-brand-blue md:text-4xl"
            variants={{
              hidden: { opacity: 0, scale: 0, rotate: -15 },
              visible: {
                opacity: 1,
                scale: 1,
                rotate: -5,
                transition: { type: "spring", stiffness: 200, damping: 12 },
              },
            }}
          >
            Appreciation
          </motion.span>

          <motion.span
            className="font-script text-2xl text-brand-yellow drop-shadow-[2px_2px_0_#238CFF] md:text-4xl"
            variants={{
              hidden: { opacity: 0, scale: 0, rotate: 15 },
              visible: {
                opacity: 1,
                scale: 1,
                rotate: 5,
                transition: { type: "spring", stiffness: 200, damping: 12 },
              },
            }}
          >
            {`(♡ ‿ ♡)`}
          </motion.span>
        </div>
      </motion.div>

      {/* ===== MAIN CONTENT — CAROUSEL & CTA BUTTON ===== */}
      <div className="w-full relative z-20 flex flex-col items-center justify-center mt-28 md:mt-36">

        {/* Supporter Cards Single Row Marquee — Full screen width edge to edge */}
        <div className="w-full">
          <SupporterWall supporters={supporters} showHeader={false} rows={1} tone="paper" />
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
              transitionTypes={["coffee-forward"]}
              className="inline-flex cursor-pointer items-center gap-3 rounded-full border-2 border-brand-blue bg-brand-blue px-8 py-3.5 text-xs font-black uppercase tracking-wider text-brand-yellow shadow-[4px_4px_0_0_#FFE06B] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-brand-yellow hover:text-brand-blue sm:text-sm"
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
