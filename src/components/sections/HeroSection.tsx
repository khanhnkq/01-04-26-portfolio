"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import BottomBar from "@/components/ui/BottomBar";

import { PROJECTS } from "@/data/projects";

export default function HeroSection() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  return (
    <section className="relative w-full min-h-screen bg-brand-blue flex flex-col items-center justify-end overflow-hidden pt-20 pb-[42px]">
     

      {/* ===== DECORATIVE BACKGROUND PATTERNS ===== */}
      {/* Corner Index Watermark */}
      <div className="absolute top-10 right-10 md:top-20 md:right-20 text-[10rem] md:text-[20rem] font-black font-sans text-brand-yellow/5 leading-none pointer-events-none select-none z-0">
        00
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

      {/* ===== FLOATING TEXT EMOJIS ===== */}
      {[
        { emoji: "(ﾉ◕ヮ◕)ﾉ*:・゚✧", top: "8%", left: "5%", rotate: -12, delay: 1.0, size: "text-lg md:text-2xl" },
        { emoji: "٩(◕‿◕｡)۶", top: "15%", right: "8%", rotate: 8, delay: 1.2, size: "text-base md:text-xl" },
        { emoji: "(づ｡◕‿‿◕｡)づ", top: "35%", left: "3%", rotate: -6, delay: 1.4, size: "text-sm md:text-lg" },
        { emoji: "☆*:.｡.o(≧▽≦)o.｡.:*☆", bottom: "30%", right: "4%", rotate: 5, delay: 1.6, size: "text-xs md:text-base" },
        { emoji: "(⌐■_■)", bottom: "15%", left: "15%", rotate: -3, delay: 1.8, size: "text-base md:text-xl" },
        { emoji: "ʕ•ᴥ•ʔ", top: "50%", right: "12%", rotate: 10, delay: 2.0, size: "text-lg md:text-2xl" },
      ].map((item, i) => (
        <motion.span
          key={i}
          className={`absolute ${item.size} font-mono text-brand-yellow/25 pointer-events-none select-none z-0 whitespace-nowrap`}
          style={{
            top: item.top,
            bottom: item.bottom,
            left: item.left,
            right: item.right,
          }}
          initial={{ opacity: 0, scale: 0, rotate: item.rotate * 2 }}
          animate={{ opacity: 1, scale: 1, rotate: item.rotate }}
          transition={{ type: "spring", stiffness: 150, damping: 12, delay: item.delay }}
        >
          {item.emoji}
        </motion.span>
      ))}

      {/* Background Text Overlay */}
      <motion.div 
        className="absolute top-10 md:top-0 left-0 w-full flex justify-center items-center px-4"
        style={{ pointerEvents: isProjectsOpen ? 'none' : 'auto' }}
      >
        {/* Premium Staggered Text Reveal */}
        <motion.h1 
          className="flex justify-center text-[16vw] md:text-[16vw] font-sans font-black text-brand-yellow leading-none tracking-tighter text-center uppercase"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.1 }
            }
          }}
        >
          {"PORTFOLIO".split("").map((char, index) => (
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
        
        {/* Floating Handwriting texts */}
        <motion.span 
          className="absolute left-[10%] md:left-[10%] top-[60%] md:top-[72%] font-script text-brand-white text-4xl md:text-[5vw]"
          initial={{ opacity: 0, scale: 0, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: -5 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.4 }}
        >
          2026
        </motion.span>
        
        <motion.span 
          className="absolute right-[10%] md:right-[10%] top-[60%] md:top-[72%] font-script text-brand-white text-4xl md:text-[5vw]"
          initial={{ opacity: 0, scale: 0, rotate: 15 }}
          animate={{ opacity: 1, scale: 1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.6 }}
        >
          Developer
        </motion.span>
      </motion.div>

      {/* Tilted Folder Graphic Pushed To Bottom */}
      <motion.div 
        className="relative w-[90%] max-w-[820px] aspect-[4/3] flex flex-col items-center justify-center z-10 origin-bottom"
        initial={{ opacity: 0, y: 300, rotate: -20, scale: 0.5 }}
        animate={
          isProjectsOpen 
            ? { opacity: 1, y: 100, rotate: -10, scale: 0.9 }
            : { opacity: 1, y: 0, rotate: 0, scale: 1 }
        }
        transition={{ type: "spring", stiffness: 120, damping: 15, delay: isProjectsOpen ? 0 : 0.2 }}
      >
        <motion.div
          className="relative w-full h-full cursor-pointer origin-bottom"
          initial="idle"
          whileHover={!isProjectsOpen ? "hover" : "idle"}
          whileTap={!isProjectsOpen ? "tap" : "idle"}
          animate={isProjectsOpen ? "open" : "idle"}
          onClick={() => setIsProjectsOpen(!isProjectsOpen)}
          variants={{
            idle: { scale: 1 },
            hover: { scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 25 } },
            tap: { scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 25 } },
            open: { scale: 1 } 
          }}
        >
          {/* LỚP 1: MẶT SAU FOLDER */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/folder_back_layer.svg" 
              alt="KHANHNQ Folder Back"
              fill
              className="object-contain object-bottom pointer-events-none"
              priority
            />
          </div>

          {/* LỚP 2: TỜ GIẤY SỐ 1 */}
          <motion.div 
            className="absolute inset-0 z-10 origin-bottom"
            variants={{
              idle: { y: 0, x: 0, rotate: 0, opacity: 1 },
              hover: { 
                y: -30, x: -30, rotate: -6, 
                transition: { type: "spring", stiffness: 300, damping: 15 } 
              },
              open: { y: -200, opacity: 0, rotate: -15, scale: 1.2, transition: { duration: 0.3 } }
            }}
          >
            <Image 
              src="/paper_1.svg" 
              alt="Paper 1"
              fill
              className="object-contain object-bottom pointer-events-none"
              priority
            />
          </motion.div>

          {/* LỚP 3: TỜ GIẤY SỐ 2 */}
          <motion.div 
            className="absolute inset-0 z-11 origin-bottom"
            variants={{
              idle: { y: 0, x: 0, rotate: 0, opacity: 1 },
              hover: { 
                y: -60, x: 0, rotate: 2, 
                transition: { type: "spring", stiffness: 300, damping: 15, delay: 0.05 } 
              },
              open: { y: -250, opacity: 0, rotate: 0, scale: 1.2, transition: { duration: 0.3, delay: 0.05 } }
            }}
          >
            <Image 
              src="/paper_2.svg" 
              alt="Paper 2"
              fill
              className="object-contain object-bottom pointer-events-none"
              priority
            />
          </motion.div>

          {/* LỚP 4: TỜ GIẤY SỐ 3 */}
          <motion.div 
            className="absolute inset-0 z-12 origin-bottom"
            variants={{
              idle: { y: 0, x: 0, rotate: 0, opacity: 1 },
              hover: { 
                y: -40, x: 40, rotate: 8, 
                transition: { type: "spring", stiffness: 300, damping: 15, delay: 0.1 } 
              },
              open: { y: -200, opacity: 0, rotate: 15, scale: 1.2, transition: { duration: 0.3, delay: 0.1 } }
            }}
          >
            <Image 
              src="/paper_3.svg" 
              alt="Paper 3"
              fill
              className="object-contain object-bottom pointer-events-none"
              priority
            />
          </motion.div>

          {/* LỚP 5: MẶT TRƯỚC FOLDER */}
          <div className="absolute inset-0 z-20">
            <Image 
              src="/folder_before_layer.svg" 
              alt="KHANHNQ Folder Front"
              fill
              className="object-contain object-bottom pointer-events-none"
              priority
            />
          </div>
        </motion.div>
      </motion.div>

      {/* BACKDROP BLUR */}
      <AnimatePresence>
        {isProjectsOpen && (
          <motion.div
            className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsProjectsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* CAROUSEL PROJECTS */}
      <AnimatePresence>
        {isProjectsOpen && (
          <>
            <motion.button
              className="absolute top-6 md:top-10 right-6 md:right-10 z-50 bg-brand-white text-brand-blue font-sans font-bold text-sm md:text-base px-6 py-2 rounded-full border border-brand-blue/20 hover:bg-brand-blue hover:text-brand-white transition-colors uppercase cursor-pointer"
              style={{
                boxShadow: "0 4px 6px -1px rgba(35, 140, 255, 0.1), 0 2px 4px -1px rgba(35, 140, 255, 0.06)"
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={() => setIsProjectsOpen(false)}
            >
              CLOSE (X)
            </motion.button>

            <motion.div
              className="absolute top-1/2 left-0 w-full -translate-y-[60%] z-40 flex items-center px-4 md:px-20 overflow-x-auto gap-6 md:gap-10 pb-8 [&::-webkit-scrollbar]:hidden"
              style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', overflowY: 'visible' }}
            >
              {PROJECTS.map((project, index) => (
                <motion.div 
                  key={project.id} 
                  className="relative shrink-0 w-[280px] md:w-[380px] h-[360px] md:h-[480px] cursor-pointer group"
                  initial={{ opacity: 0, y: 400, x: -50, scale: 0.5, rotate: (index % 2 === 0 ? -10 : 10) }}
                  animate={{ 
                    opacity: 1, y: 0, x: 0, scale: 1, rotate: 0,
                    transition: { type: "spring", stiffness: 200, damping: 20, delay: 0.1 + index * 0.05 }
                  }}
                  exit={{ 
                    opacity: 0, y: 400, scale: 0.5, rotate: -10,
                    transition: { duration: 0.3 }
                  }}
                  whileHover={{ y: -12, scale: 1.03, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                  onClick={() => {
                    setIsProjectsOpen(false);
                    setTimeout(() => {
                      document.getElementById(`project-${project.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 400);
                  }}
                >
                  {/* Brutalist Shadow */}
                  <div className="absolute inset-0 bg-brand-yellow translate-y-3 translate-x-3 rounded-sm" />
                  
                  {/* Card Body */}
                  <div className="relative w-full h-full border-3 border-brand-blue bg-paper rounded-sm overflow-hidden flex flex-col">
                    
                    {/* Window Bar */}
                    <div className="h-9 border-b-3 border-brand-blue bg-brand-white flex items-center px-3 gap-2 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-brand-blue bg-brand-white" />
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-brand-blue bg-brand-yellow" />
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-brand-blue bg-brand-blue" />
                      <div className="ml-auto flex items-center gap-2">
                        <span className="font-mono text-[9px] text-brand-blue/50 uppercase font-bold tracking-widest truncate max-w-[100px]">
                          {project.title.toLowerCase()}.exe
                        </span>
                      </div>
                    </div>

                    {/* Image Preview */}
                    <div className="relative flex-1 overflow-hidden">
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        fill
                        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                      
                      {/* Bottom Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-brand-blue/20 to-transparent" />
                      
                      {/* Content Over Image */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex flex-col">
                        {/* Category Badge */}
                        <span className="font-mono text-[9px] md:text-[10px] text-brand-yellow font-bold uppercase tracking-[0.2em] mb-2">
                          {project.category}
                        </span>
                        
                        {/* Title */}
                        <h2 className="font-sans font-black text-2xl md:text-3xl text-brand-white leading-tight mb-3 uppercase tracking-tight">
                          {project.title}
                        </h2>
                        
                        {/* Tags Row */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="font-mono text-[8px] md:text-[9px] text-brand-white/80 border border-brand-white/30 px-2 py-0.5 rounded-sm uppercase backdrop-blur-sm">
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 4 && (
                            <span className="font-mono text-[8px] md:text-[9px] text-brand-white/50 px-1 py-0.5">
                              +{project.tags.length - 4}
                            </span>
                          )}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs text-brand-yellow font-bold uppercase tracking-widest group-hover:gap-3 transition-all duration-300">
                          <span>Go to section</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="square" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Top Color Accent Line */}
                    <div className={`absolute top-9 left-0 w-full h-1 ${project.color}`} />
                  </div>
                </motion.div>
              ))}
              <div className="shrink-0 w-[20px] md:w-[40px]" />
              
            </motion.div>
          </>
        )}
        
      </AnimatePresence>
      <BottomBar />

      
    </section>
  );
}
