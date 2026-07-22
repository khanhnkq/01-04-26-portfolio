"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BottomBar from "@/components/ui/BottomBar";
import Lottie from "lottie-react";
import catPlayingAnimation from "../../../public/cat-playing-v2.json";

export default function ThankYouSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-brand-blue pb-[42px] pt-20">
      <div className="pointer-events-none absolute bottom-10 right-10 z-0 select-none font-sans text-[10rem] font-black leading-none text-brand-yellow/5 md:bottom-20 md:right-20 md:text-[20rem]">
        FIN
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #F2E8D5 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, #F2E8D5 79px, #F2E8D5 80px)",
        }}
      />

      <div className="pointer-events-none absolute left-6 top-6 z-0 h-16 w-16 border-l-2 border-t-2 border-brand-yellow/10 md:left-12 md:top-12 md:h-24 md:w-24" />
      <div className="pointer-events-none absolute bottom-16 right-6 z-0 h-16 w-16 border-b-2 border-r-2 border-brand-yellow/10 md:bottom-20 md:right-12 md:h-24 md:w-24" />

      <div className="pointer-events-none absolute bottom-2 right-2 z-10 h-32 w-32 md:bottom-0 md:right-0 md:h-72 md:w-72">
        <Lottie animationData={catPlayingAnimation} loop={true} />
      </div>

      <motion.div
        className="pointer-events-none absolute left-0 top-10 flex w-full items-center justify-center px-4 md:top-0"
      >
        <motion.h1
          className="flex justify-center text-center font-sans text-[16vw] font-black uppercase leading-none tracking-tighter text-brand-yellow md:text-[16vw]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
        >
          {"THANKYOU".split("").map((char, index) => (
            <span key={`${char}-${index}`} className="-mx-1 inline-block overflow-hidden px-1">
              <motion.span
                className="inline-block origin-bottom"
                variants={{
                  hidden: { y: "120%", rotate: 10 },
                  visible: {
                    y: "0%",
                    rotate: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.span
          className="absolute left-[10%] top-[60%] font-script text-4xl text-brand-white md:top-[72%] md:text-[5vw]"
          initial={{ opacity: 0, scale: 0, rotate: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.4 }}
        >
          See ya!
        </motion.span>

        <motion.span
          className="absolute right-[10%] top-[60%] font-script text-4xl text-brand-white md:top-[72%] md:text-[5vw]"
          initial={{ opacity: 0, scale: 0, rotate: 15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 5 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.6 }}
        >
          {`(^ ᴗ ^)`}
        </motion.span>
      </motion.div>

      <motion.div
        className="relative z-20 mt-24 flex aspect-[4/3] w-[85%] max-w-[500px] flex-col items-center justify-center md:mt-32"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.3 }}
      >
        <motion.div
          className="absolute left-[5%] top-[8%] h-[500px] w-[90%] -rotate-[15deg] bg-[#E5D5C5]"
          whileHover={{ rotate: -12, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />

        <motion.div
          className="absolute left-[20%] top-[30%] flex h-[600px] w-[90%] flex-col items-center justify-start bg-paper p-8 pt-20 text-center"
          whileHover={{ y: -8, rotate: 3, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: "radial-gradient(circle, #0A2463 0.5px, transparent 0.5px)",
              backgroundSize: "16px 16px",
            }}
          />
          <p className="relative mb-6 font-sans text-3xl font-black uppercase leading-relaxed tracking-tight text-brand-blue md:text-5xl">
            Thank you<br />for watching
          </p>
          <span className="relative mt-4 font-script text-3xl text-brand-yellow md:text-5xl">
            {`(^ ▽ ^)`}
          </span>

          <Link
            href="/buy-me-a-coffee"
            transitionTypes={["coffee-forward"]}
            className="relative z-30 mt-6 flex cursor-pointer items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-black uppercase tracking-wider text-brand-yellow shadow-lg transition-all hover:scale-105 hover:bg-blue-600"
          >
            <span>☕</span>
            <span>Buy Me A Coffee</span>
          </Link>
        </motion.div>
      </motion.div>

      <BottomBar />
    </section>
  );
}
