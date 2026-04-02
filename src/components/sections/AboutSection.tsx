"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import BottomBar from "@/components/ui/BottomBar";
import Lottie from "lottie-react";
import catPlayingAnimation from "../../../public/cat-playing-v2.json";


const TECH_STACK = [
  { label: "React", icon: "react" },
  { label: "Next.js", icon: "nextdotjs" },
  { label: "TypeScript", icon: "typescript" },
  { label: "Tailwind", icon: "tailwindcss" },
  { label: "Framer", icon: "framer" },
  { label: "Three.js", icon: "threedotjs" },
  { label: "Java", icon: "oracle" },
  { label: "Spring Boot", icon: "springboot" },
  { label: "Python", icon: "python" },
  { label: "FastAPI", icon: "fastapi" },
  { label: "Node.js", icon: "nodedotjs" },
  { label: "NestJs", icon: "nestjs" },
  { label: "Postgres", icon: "postgresql" },
  { label: "MySQL", icon: "mysql" },
  { label: "MongoDB", icon: "mongodb" },
  { label: "Supabase", icon: "supabase" },
  { label: "Docker", icon: "docker" },
  { label: "Nginx", icon: "nginx" },
  { label: "AWS", icon: "amazonwebservices" },
  { label: "Git", icon: "git" },
  { label: "Kafka", icon: "apachekafka" },
  { label: "Redux", icon: "redux" },
  { label: "Flyway", icon: "flyway" },
  { label: "Figma", icon: "figma" }
];

export default function AboutSection() {
  return (
    <section className="relative w-full bg-paper flex flex-col justify-between overflow-hidden border-t-8 border-brand-yellow">
      
      {/* ===== DECORATIVE BACKGROUND PATTERNS ===== */}
      {/* Corner Index Watermark */}
      <div className="absolute top-10 left-10 md:top-20 md:left-20 text-[10rem] md:text-[20rem] font-black font-sans text-brand-blue/5 leading-none pointer-events-none select-none z-0">
        &amp;
      </div>

      {/* Dot Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.06]"
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
      <div className="absolute top-6 left-6 md:top-12 md:left-12 w-16 h-16 md:w-24 md:h-24 border-t-2 border-l-2 border-brand-blue/10 pointer-events-none z-0" />
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 w-16 h-16 md:w-24 md:h-24 border-b-2 border-r-2 border-brand-blue/10 pointer-events-none z-0" />

      {/* 
        === ÁP DỤNG LAYOUT TỪ ẢNH DESIGN ===
        Phần Hero Header cho About 
      */}
      <div className="relative w-full h-[100vh] min-h-[800px] flex-shrink-0">
        
        {/* Top Right "ABOUT ME" & Intro Text */}
        <motion.div 
          className="absolute top-12 right-4 md:top-10 md:right-20 lg:right-8 lg:top-24 z-20 flex flex-col items-end text-right"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
          }}
        >
          {/* Staggered Title Reveal — Hero style */}
          <motion.h2 
            className="flex justify-end text-4xl md:text-5xl lg:text-[7rem] font-sans font-black text-brand-blue tracking-widest uppercase mb-4 md:mb-6 leading-none"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } }
            }}
          >
            {"ABOUT ME".split("").map((char, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <motion.span
                  className="inline-block origin-bottom"
                  variants={{
                    hidden: { y: "120%", rotate: 10, opacity: 0 },
                    visible: { 
                      y: "0%", 
                      rotate: 0, 
                      opacity: 1,
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
                    }
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              </span>
            ))}
          </motion.h2>
          
          {/* Intro paragraphs — stagger each block */}
          <motion.div 
            className="w-full max-w-[280px] md:max-w-[400px] lg:max-w-[480px] text-brand-white/90 font-medium text-sm md:text-base leading-relaxed space-y-4"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } }
            }}
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, x: 30, filter: "blur(4px)" },
                visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <strong className="text-brand-blue font-bold text-lg md:text-xl block mb-2">I&apos;m <span className="font-script text-3xl md:text-5xl  px-1 text-brand-yellow">Khánh</span>,</strong>
            </motion.p>
            <motion.p 
              className="text-brand-blue"
              variants={{
                hidden: { opacity: 0, x: 30, filter: "blur(4px)" },
                visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              a Fullstack Engineer based in Ho Chi Minh city. I specialize in building end-to-end solutions, bridging the gap between robust backends—particularly with Java Spring Boot—and highly interactive React interfaces.
            </motion.p>
            <motion.p 
              className="text-brand-blue"
              variants={{
                hidden: { opacity: 0, x: 30, filter: "blur(4px)" },
                visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              Focused on designing scalable architectures and seamless experiences, I&apos;m always Refining systems and exploring cloud infrastructure to build platforms that truly matter.
            </motion.p>
          </motion.div>

          {/* Tech Stack Carousel */}
          <motion.div 
            className="w-full max-w-[280px] md:max-w-[400px] lg:max-w-[480px] mt-6 md:mt-8 pt-6 border-t-[3px] border-brand-blue/20 flex flex-col"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <motion.h3 
              className="text-lg md:text-xl font-black text-brand-blue mb-4 uppercase tracking-widest text-right"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 20 } }
              }}
            >
              My Stack
            </motion.h3>
            
            <div 
              className="relative flex w-full overflow-hidden group py-2"
              style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
            >
              <motion.div 
                className="flex whitespace-nowrap gap-4 md:gap-6 pr-4 md:pr-6 w-fit"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                  repeat: Infinity, 
                  ease: "linear", 
                  duration: 25
                }}
              >
                {[...TECH_STACK, ...TECH_STACK].map((item, idx) => (
                  <div 
                    key={idx}
                    className="w-12 h-12 md:w-16 md:h-16 shrink-0 border-2 border-brand-blue/10 rounded-xl flex items-center justify-center bg-brand-white hover:-translate-y-2 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md p-2 md:p-3 relative"
                    title={item.label}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={`https://cdn.simpleicons.org/${item.icon}/238CFF`}
                      alt={item.label}
                      className="w-full h-full object-contain hover:scale-110 transition-transform duration-300 pointer-events-none"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Left Bottom Avatar with Papers */}
        <motion.div 
          className="absolute bottom-0 left-[-10px] md:left-[-10px] z-10 w-[380px] h-[480px] md:w-[900px] md:h-[900px] cursor-pointer"
          initial="hidden"
          whileInView="idle"
          whileHover="hover"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* LỚP 1: TỜ GIẤY SAU */}
          <motion.div 
            className="absolute inset-0 z-0 origin-bottom"
            variants={{
              hidden: { opacity: 0, y: 200, rotate: -20, scale: 0.8 },
              idle: { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1, transition: { duration: 1, type: "spring", stiffness: 120, damping: 14 } },
              hover: { 
                y: -30, x: -20, rotate: -4, 
                transition: { type: "spring", stiffness: 300, damping: 15 } 
              }
            }}
          >
            <Image 
              src="/back_paper.svg" 
              alt="Back Paper"
              fill
              className="object-contain object-bottom pointer-events-none"
              priority
            />
          </motion.div>

          {/* LỚP 2: TỜ GIẤY TRƯỚC */}
          <motion.div 
            className="absolute inset-0 z-10 origin-bottom"
            variants={{
              hidden: { opacity: 0, y: 200, rotate: 15, scale: 0.8 },
              idle: { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1, transition: { duration: 1, type: "spring", stiffness: 120, damping: 14, delay: 0.12 } },
              hover: { 
                y: -15, x: 15, rotate: 2, 
                transition: { type: "spring", stiffness: 300, damping: 15, delay: 0.05 } 
              }
            }}
          >
            <Image 
              src="/front_paper.svg" 
              alt="Front Paper"
              fill
              className="object-contain object-bottom pointer-events-none"
              priority
            />
          </motion.div>
          
          {/* LỚP 3: AVATAR */}
          <motion.div 
            className="absolute inset-0 z-20 origin-bottom"
            variants={{
              hidden: { opacity: 0, y: 250, scale: 0.7 },
              idle: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, type: "spring", stiffness: 100, damping: 12, delay: 0.25 } },
              hover: {
                y: -5, scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 15, delay: 0.1 }
              }
            }}
          >
            <Image 
              src="/avatar.svg" 
              alt="My Avatar"
              fill
              className="object-contain object-bottom pointer-events-none"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Bottom Bar attached to the header part */}
        <BottomBar />
      </div>
    </section>
  );
}
