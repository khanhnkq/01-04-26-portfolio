"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ProjectType } from "@/data/projects";
import BottomBar from "../ui/BottomBar";

type ProjectSectionProps = {
  project: ProjectType;
  index: number;
};

export default function ProjectSection({ project, index }: ProjectSectionProps) {
  // Alternate background style for layout rhythm
  const bgClass = index % 2 === 0 ? "bg-paper" : "bg-brand-white";
  const textColor = "text-brand-blue";
  
  // Flag to invert flex direction
  const isEven = index % 2 === 0;

  return (
    <section id={`project-${project.id}`} className={`relative w-full min-h-[900px] flex items-center justify-center overflow-hidden border-t-8 border-brand-yellow py-20 px-4 md:px-12 lg:px-24 ${bgClass}`}>
      
      {/* Decorative Index Background */}
      <div className={`absolute top-10 ${isEven ? 'left-10 md:left-20' : 'right-10 md:right-20'} md:top-20 text-[10rem] md:text-[20rem] font-black font-sans text-brand-blue/5 leading-none pointer-events-none select-none z-0`}>
        0{index + 1}
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

      <div className={`relative z-10 w-full max-w-[1440px] flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
        
        {/* TEXT CONTENT COLUMN */}
        <motion.div 
          className="flex-1 w-full flex flex-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
          }}
        >
          {/* Top Label */}
          <motion.div 
            className="flex items-center gap-4 mb-6"
            variants={{
              hidden: { opacity: 0, x: isEven ? -30 : 30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <span className={`px-3 py-1 border-2 border-brand-blue text-brand-blue font-mono font-bold text-xs md:text-sm uppercase tracking-widest bg-brand-yellow/20`}>
              Ref: {String(project.id).padStart(3, '0')}
            </span>
            <span className="font-mono text-brand-blue/70 font-semibold text-xs md:text-sm uppercase tracking-widest">
              {project.category}
            </span>
          </motion.div>

          {/* Staggered Title Reveal — Hero style */}
          <motion.h2 
            className={`flex flex-wrap text-5xl md:text-6xl lg:text-7xl font-sans font-black ${textColor} uppercase tracking-tight leading-[0.9] mb-8`}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } }
            }}
          >
            {project.title.split("").map((char, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <motion.span
                  className="inline-block origin-bottom"
                  variants={{
                    hidden: { y: "120%", rotate: 8, opacity: 0 },
                    visible: { 
                      y: "0%", 
                      rotate: 0, 
                      opacity: 1,
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
                    }
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          {/* Description — slide up */}
          <motion.p 
            className="font-sans text-lg md:text-xl text-brand-blue/80 leading-relaxed mb-8 max-w-xl"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
          >
            {project.description}
          </motion.p>

          {/* Tags — stagger in one by one */}
          <motion.div 
            className="flex flex-wrap gap-2 mb-10"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } }
            }}
          >
            {project.tags.map((tag) => (
              <motion.span 
                key={tag} 
                className="font-mono text-xs md:text-sm text-brand-white bg-brand-blue px-3 py-1.5 uppercase font-medium"
                variants={{
                  hidden: { opacity: 0, scale: 0.7, y: 10 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 20 } }
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Button — bounce in */}
          {project.demo && (
            <motion.a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center w-fit"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 15 } }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-brand-blue translate-y-1 translate-x-1" />
              <div className="relative border-2 border-brand-blue bg-brand-yellow px-8 py-4 font-mono font-black text-brand-blue uppercase tracking-widest flex items-center gap-3">
                <span>View Project</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
            </motion.a>
          )}
        </motion.div>

        {/* IMAGE/MOCKUP COLUMN */}
        <motion.div 
          className="flex-1 w-full aspect-square md:aspect-[4/3] relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9, rotate: isEven ? 5 : -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        >
          {/* Outer Brutalist Frame */}
          <div className="absolute inset-0 bg-brand-blue translate-y-4 translate-x-4 rounded-xl" />
          <div className="relative w-full h-full border-4 border-brand-blue bg-white rounded-xl overflow-hidden shadow-xl flex flex-col group">
            
            {/* Window Bar */}
            <div className="h-10 border-b-4 border-brand-blue bg-paper flex items-center px-4 gap-2 shrink-0">
              <div className="w-3 h-3 rounded-full border-2 border-brand-blue bg-brand-white" />
              <div className="w-3 h-3 rounded-full border-2 border-brand-blue bg-brand-yellow" />
              <div className="w-3 h-3 rounded-full border-2 border-brand-blue bg-brand-blue" />
              <div className="ml-auto font-mono text-[10px] text-brand-blue/50 uppercase font-bold tracking-widest truncate max-w-[120px]">
                {project.title.toLowerCase()}.exe
              </div>
            </div>

            {/* Image Viewport */}
            <div className="flex-1 w-full h-full relative overflow-hidden">
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105" 
              />
            </div>

          </div>
        </motion.div>
      </div>
<BottomBar />
    </section>
  );
}
