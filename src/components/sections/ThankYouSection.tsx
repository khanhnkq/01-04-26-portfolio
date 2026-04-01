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

      {/* ===== CONTACT CORNER (LEFT) ===== */}
      <div className="absolute bottom-16 md:bottom-20 left-6 md:left-12 flex flex-col items-start gap-4 z-30">
        <motion.a 
          href="mailto:khanhnguyenkim30825@gmail.com"
          className="flex flex-col font-sans font-black text-brand-yellow text-3xl md:text-5xl leading-none group"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
        >
          <span className="group-hover:text-brand-white transition-colors duration-300 text-left">CONTACT</span>
          <span className="mt-1 group-hover:text-brand-white transition-colors duration-300">
            ME <span className="font-script text-brand-white text-2xl md:text-4xl group-hover:text-brand-yellow transition-colors duration-300">
              {`(^ ω ^)`}
            </span>
          </span>
          <div className="mt-4 flex flex-col">
            <span className="text-xs md:text-sm font-mono text-brand-white/40 uppercase tracking-[0.3em] group-hover:text-brand-yellow transition-colors duration-300">
              Available for new opportunities →
            </span>
            <motion.div 
              className="w-full h-[2px] bg-brand-yellow/30 mt-1"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </div>
        </motion.a>
      </div>

      {/* ===== SOCIAL GROUP (RIGHT) ===== */}
      <div className="absolute bottom-16 md:bottom-20 right-6 md:right-12 flex items-center gap-4 z-30">
        <div className="flex gap-4">
          {/* GitHub Link */}
          <motion.a 
            href="https://github.com/khanhnkq"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
            whileHover={{ y: -5, scale: 1.1 }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-white border-2 border-brand-blue flex items-center justify-center shadow-[-4px_4px_0px_0px_#F2C94C] group-hover:shadow-[-2px_2px_0px_0px_#F2C94C] group-hover:translate-x-[-2px] group-hover:translate-y-[2px] transition-all duration-200">
              <svg className="w-6 h-6 md:w-7 md:h-7 fill-brand-blue" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
          </motion.a>

          {/* Facebook Link */}
          <motion.a 
            href="https://www.facebook.com/khanhnkq"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
            whileHover={{ y: -5, scale: 1.1 }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-white border-2 border-brand-blue flex items-center justify-center shadow-[-4px_4px_0px_0px_#F2C94C] group-hover:shadow-[-2px_2px_0px_0px_#F2C94C] group-hover:translate-x-[-2px] group-hover:translate-y-[2px] transition-all duration-200">
              <svg className="w-6 h-6 md:w-7 md:h-7 fill-brand-blue" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
          </motion.a>

          {/* YouTube Link */}
          <motion.a 
            href="https://www.youtube.com/@khanhnkq"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.6 }}
            whileHover={{ y: -5, scale: 1.1 }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-white border-2 border-brand-blue flex items-center justify-center shadow-[-4px_4px_0px_0px_#F2C94C] group-hover:shadow-[-2px_2px_0px_0px_#F2C94C] group-hover:translate-x-[-2px] group-hover:translate-y-[2px] transition-all duration-200">
              <svg className="w-6 h-6 md:w-7 md:h-7 fill-brand-blue" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
          </motion.a>

          {/* Mail Icon Link */}
          <motion.a 
            href="mailto:khanhnguyenkim30825@gmail.com"
            className="group"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.7 }}
            whileHover={{ y: -5, scale: 1.1 }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-white border-2 border-brand-blue flex items-center justify-center shadow-[-4px_4px_0px_0px_#F2C94C] group-hover:shadow-[-2px_2px_0px_0px_#F2C94C] group-hover:translate-x-[-2px] group-hover:translate-y-[2px] transition-all duration-200">
              <svg className="w-6 h-6 md:w-7 md:h-7 fill-brand-blue" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
          </motion.a>
        </div>
      </div>

      <BottomBar />
    </section>
  );
}
