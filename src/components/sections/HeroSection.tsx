"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import BottomBar from "@/components/ui/BottomBar";
import { StarDoodle, HeartDoodle, SparkleDoodle, CrownDoodle, SwirlDoodle, FlowerDoodle } from "@/components/ui/Doodles";

import { PROJECTS } from "@/data/projects";

export default function HeroSection() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [poppingCat, setPoppingCat] = useState<number | null>(null);

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
          key={`emoji-${i}`}
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

      {/* ===== FLOATING SVG DECORATIONS ===== */}
      
        

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
              className="absolute top-1/2 left-0 w-full -translate-y-[60%] z-40 flex items-center px-4 md:px-20 overflow-x-auto gap-6 md:gap-10 py-12 [&::-webkit-scrollbar]:hidden"
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
                    if (poppingCat !== null) return; // Prevent double click
                    setPoppingCat(project.id);
                    setTimeout(() => {
                      setPoppingCat(null);
                      setIsProjectsOpen(false);
                      setTimeout(() => {
                        document.getElementById(`project-${project.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 400);
                    }, 1200); // Wait 1.2s for cat animation
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

                    {/* Popping Cat Easter Egg */}
                    <AnimatePresence>
                      {poppingCat === project.id && (
                        <motion.div
                          initial={{ y: "120%" }}
                          animate={{ y: "10%" }}
                          exit={{ y: "120%" }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 md:w-64 md:h-64 z-50 pointer-events-none"
                        >
                          <svg width="251" height="231" viewBox="0 0 251 231" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl" style={{ filter: "drop-shadow(0 15px 15px rgba(0,0,0,0.5))" }}>
                            <path d="M160.151 76.1476C158.057 74.2565 157.01 73.3109 156.358 72.3773C153.807 68.7249 153.981 63.826 156.782 60.3627C157.499 59.4775 158.61 58.6082 160.832 56.8696L174.885 47.5998L190.946 39.6444C191.556 39.3421 191.861 39.1909 192.175 39.0612C192.454 38.9459 192.738 38.8432 193.027 38.7536C193.351 38.6527 193.682 38.5739 194.345 38.4163L204.813 35.926C206.756 35.4637 208.804 35.8318 210.465 36.9419C211.976 37.9519 213.048 39.4974 213.464 41.2666L214.322 44.9107C214.502 45.6785 214.593 46.0624 214.653 46.4508C214.706 46.796 214.741 47.1437 214.757 47.4925C214.776 47.8851 214.764 48.2793 214.74 49.0676L214.092 70.1512L210.991 97.9015C209.647 103.885 208.976 106.876 207.788 108.53C204.963 112.466 199.724 113.81 195.353 111.722C193.516 110.844 191.487 108.545 187.428 103.948L173.634 88.323L160.151 76.1476Z" fill="#B8CB8B"/>
                            <path d="M56.0714 95.5013C52.1814 97.7408 50.2363 98.8605 48.4346 99.1536C45.0317 99.7071 41.5837 98.4688 39.3106 95.8767C38.107 94.5043 37.3189 92.4029 35.7426 88.2001L30.5395 70.2167L27.2723 50.3767C27.1646 49.7229 27.1108 49.396 27.0787 49.067C27.0502 48.7747 27.0346 48.4812 27.032 48.1875C27.029 47.857 27.0479 47.5263 27.0857 46.8647L27.7806 34.6957C27.9002 32.6014 28.9041 30.6565 30.542 29.3458C32.063 28.1288 34.0029 27.5613 35.94 27.7669L40.1365 28.2122C40.9231 28.2956 41.3164 28.3374 41.7038 28.4097C42.048 28.4739 42.3887 28.5562 42.7243 28.6562C43.102 28.7687 43.471 28.9111 44.2089 29.1959L65.9147 37.5726L93.5526 50.847C101.07 55.5068 104.828 57.8367 106.087 60.5574C107.544 63.7053 107.265 67.3831 105.351 70.2755C103.696 72.7754 99.6296 74.5124 91.4962 77.9864L72.1187 86.263L56.0714 95.5013Z" fill="#B8CB8B"/>
                            <path d="M54.8152 84.1458C50.3219 86.7371 44.5788 84.6271 42.8319 79.7431L39.9514 68.9153L38.4493 57.6941C38.3571 57.0054 38.311 56.661 38.2889 56.3153C38.2693 56.008 38.2638 55.7 38.2726 55.3922C38.2825 55.0459 38.3165 54.7001 38.3843 54.0086L39.0223 47.5066C39.1579 46.1247 39.8541 44.8587 40.9484 44.0041C41.9291 43.2381 43.1572 42.8594 44.3989 42.9398L46.8576 43.0992C47.0591 43.1122 47.1599 43.1188 47.2601 43.1273C47.9937 43.1897 48.7182 43.3329 49.4204 43.5543C49.5164 43.5846 49.612 43.6169 49.8034 43.6815L63.1927 48.2022L80.4351 55.6327C86.871 59.3026 86.3798 68.7377 79.5976 71.7195L65.9839 77.7047L54.8152 84.1458Z" fill="#7C964C"/>
                            <path d="M191.073 95.8475C195.821 97.9358 201.301 95.2149 202.508 90.1702L204.196 79.0937L204.471 67.7757C204.488 67.0811 204.497 66.7338 204.481 66.3877C204.467 66.0801 204.439 65.7733 204.397 65.4683C204.35 65.1251 204.278 64.7851 204.136 64.105L202.796 57.7106C202.511 56.3516 201.682 55.1687 200.501 54.4379C199.443 53.7829 198.181 53.5396 196.955 53.7544L194.528 54.1797C194.33 54.2145 194.23 54.232 194.131 54.2513C193.409 54.393 192.704 54.614 192.03 54.9103C191.938 54.9508 191.847 54.9933 191.663 55.0783L178.844 61.0254L162.51 70.2836C156.51 74.6303 158.022 83.9563 165.088 86.1844L179.271 90.6567L191.073 95.8475Z" fill="#7C964C"/>
                            <ellipse cx="117" cy="141" rx="100" ry="90" fill="#B8CB8B"/>
                            
                            <motion.g 
                              animate={{ scaleY: [1, 0.1, 1, 1, 0.1, 1] }} 
                              transition={{ duration: 1.2, times: [0, 0.15, 0.3, 0.7, 0.85, 1] }} 
                              style={{ transformOrigin: "117px 130px" }}
                            >
                              {/* Eyes */}
                              <path d="M122.896 137.128C132.783 127.156 148.792 126.805 159.107 136.333" stroke="#1E1E1E" strokeWidth="8" strokeLinecap="round"/>
                              <path d="M39 118.631C51.6158 112.464 66.85 117.394 73.4598 129.784" stroke="#1E1E1E" strokeWidth="8" strokeLinecap="round"/>
                            </motion.g>

                            {/* Mouth */}
                            <path d="M109.733 159.174C103.7 164.267 94.5288 159.464 95.2785 151.604" stroke="#1E1E1E" strokeWidth="8" strokeLinecap="round"/>
                            <path d="M94.6565 151.883C91.5497 159.142 81.1988 158.965 78.3419 151.604" stroke="#1E1E1E" strokeWidth="8" strokeLinecap="round"/>
                            <path d="M84.9572 140.968C85.2986 137.672 88.2474 135.277 91.5435 135.618L102.894 136.794C106.103 137.126 108.435 139.997 108.102 143.206C107.908 145.083 106.818 146.751 105.177 147.683L102.051 149.459C97.619 151.976 92.0507 151.218 88.4535 147.607L86.6744 145.821C85.402 144.543 84.7714 142.761 84.9572 140.968Z" fill="#1E1E1E" stroke="#1E1E1E"/>
                            
                            {/* Cheeks */}
                            <ellipse cx="161.081" cy="156.384" rx="13.0783" ry="7.33916" transform="rotate(1.22239 161.081 156.384)" fill="#7C964C"/>
                            <ellipse cx="39.2319" cy="137.616" rx="13.0783" ry="7.33916" transform="rotate(16.2637 39.2319 137.616)" fill="#7D974D"/>
                            
                            {/* Whiskers */}
                            <line x1="4" y1="139" x2="20" y2="139" stroke="#1E1E1E" strokeWidth="8" strokeLinecap="round"/>
                            <line x1="7.32697" y1="117.096" x2="21.7879" y2="123.943" stroke="#1E1E1E" strokeWidth="8" strokeLinecap="round"/>
                          </svg>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
