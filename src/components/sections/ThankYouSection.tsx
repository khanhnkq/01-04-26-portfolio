"use client";

import { motion } from "framer-motion";
import BottomBar from "@/components/ui/BottomBar";

export default function ThankYouSection() {
  return (
    <section className="relative w-full min-h-screen bg-brand-blue flex flex-col items-center justify-center overflow-hidden pt-20 pb-[42px]">
      
      {/* ===== DECORATIVE BACKGROUND PATTERNS ===== */}
      {/* Corner Index Watermark */}
      <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 text-[10rem] md:text-[20rem] font-black font-sans text-brand-yellow/5 leading-none pointer-events-none select-none z-0">
        FIN
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

      {/* ===== BACKGROUND TEXT — same style as Hero ===== */}
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
          {"THANKYOU".split("").map((char, index) => (
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
        
        {/* Floating Handwriting texts — same style as Hero */}
        <motion.span 
          className="absolute left-[10%] md:left-[10%] top-[60%] md:top-[72%] font-script text-brand-white text-4xl md:text-[5vw]"
          initial={{ opacity: 0, scale: 0, rotate: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.4 }}
        >
          See ya!
        </motion.span>
        
        <motion.span 
          className="absolute right-[10%] md:right-[10%] top-[60%] md:top-[72%] font-script text-brand-white text-4xl md:text-[5vw]"
          initial={{ opacity: 0, scale: 0, rotate: 15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 5 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.6 }}
        >
          {`(^ ᴗ ^)`}
        </motion.span>
      </motion.div>

      {/* ===== CENTER PAPERS GRAPHIC ===== */}
      <motion.div 
        className="relative mt-24 md:mt-32 w-[85%] max-w-[500px] aspect-[4/3] flex flex-col items-center justify-center z-20"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.3 }}
      >
        {/* Background Paper */}
        <motion.div 
          className="absolute top-[8%] left-[5%] w-[90%] h-[500px] bg-[#E5D5C5] transform -rotate-[15deg]"
          whileHover={{ rotate: -12, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        
        {/* Main Front Paper */}
        <motion.div 
          className="absolute top-[30%] left-[20%] w-[90%] h-[600px] bg-paper flex flex-col items-center justify-start pt-20 p-8 text-center"
          whileHover={{ y: -8, rotate: 3, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Dot Grid on paper */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
              backgroundImage: "radial-gradient(circle, #0A2463 0.5px, transparent 0.5px)",
              backgroundSize: "16px 16px"
            }}
          />
          <p className="relative font-sans font-black text-brand-blue text-3xl md:text-5xl mb-6 leading-relaxed uppercase tracking-tight">
            Thank you<br/>for watching
          </p>
          <span className="relative font-script text-brand-yellow text-3xl md:text-5xl mt-4">
            {`(^ ▽ ^)`}
          </span>
        </motion.div>
      </motion.div>

      {/* ===== CONTACT CORNER ===== */}
      <motion.div 
        className="absolute bottom-16 md:bottom-20 left-6 md:left-12 flex flex-col font-sans font-black text-brand-yellow text-3xl md:text-5xl leading-none z-30"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
      >
        <span>CONTACT</span>
        <span className="self-end mt-1">ME <span className="font-script text-brand-white text-2xl md:text-4xl">{`(^ ω ^)`}</span></span>
      </motion.div>

      <BottomBar />
    </section>
  );
}
