"use client";

import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { Experience } from "@/components/3d/Experience";
import { pageAtom } from "@/store/bookStore";
import { pages } from "@/components/3d/Book";
import BottomBar from "@/components/ui/BottomBar";
import { PROJECTS } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";

// Smooth Camera Controller
const SceneRig = () => {
  const [page] = useAtom(pageAtom);

  useFrame((state, delta) => {
    let targetX = 0; // Base camera centered
    if (page > 0 && page < pages.length - 1) {
      const isEven = (page - 1) % 2 === 0;
      // If even, text is left, so camera moves left (-1.5) to push the book to the right.
      // If odd, text is right, so camera moves right (1.5) to push the book to the left.
      targetX = isEven ? -1.5 : 1.5;
    }
    easing.damp3(state.camera.position, [targetX, 1, 4], 0.4, delta);
  });

  return null;
};

// UI Overlay Component
const BookUI = () => {
  const [page] = useAtom(pageAtom);
  const project = page > 0 && page <= PROJECTS.length ? PROJECTS[page - 1] : null;
  const isEven = project ? ((page - 1) % 2 === 0) : true;

  return (
    <div className={`absolute inset-0 pointer-events-none z-10 flex flex-col py-20 px-4 md:px-12 lg:px-24 justify-center ${project && !isEven ? "items-end" : "items-start"
      }`}>
      <AnimatePresence mode="wait">
        {project ? (
          <motion.div
            key={`proj-${project.id}`}
            className="pointer-events-auto max-w-sm md:max-w-[500px] w-full z-20 flex flex-col"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: !isEven ? 50 : -50 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
            }}
          >
            {/* Top Label */}
            <motion.div
              className={`flex items-center gap-4 mb-6 ${!isEven && "justify-end"}`}
              variants={{
                hidden: { opacity: 0, x: !isEven ? 30 : -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <span className="px-3 py-1 border-2 border-brand-blue text-brand-blue font-mono font-bold text-xs md:text-sm uppercase tracking-widest bg-brand-yellow">
                Ref: {String(project.id).padStart(3, '0')}
              </span>
              <span className="font-mono text-brand-blue/70 font-semibold text-xs md:text-sm uppercase tracking-widest">
                {project.category}
              </span>
            </motion.div>

            {/* Dynamic Staggered Title */}
            <motion.h2
              className={`flex flex-wrap text-5xl md:text-6xl lg:text-7xl font-sans font-black text-brand-blue uppercase tracking-tight leading-[0.9] mb-8 drop-shadow-sm ${!isEven && "justify-end text-right"}`}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.03, delayChildren: 0.02 } }
              }}
            >
              {project.title.split("").map((char, i) => (
                <span key={i} className="overflow-hidden inline-block">
                  <motion.span
                    className="inline-block origin-bottom transition-transform hover:scale-110 cursor-default"
                    variants={{
                      hidden: { y: "120%", rotate: 8, opacity: 0 },
                      visible: {
                        y: "0%",
                        rotate: 0,
                        opacity: 1,
                        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                      }
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            {/* Description */}
            <motion.p
              className={`font-sans text-lg md:text-xl text-brand-blue/80 font-medium leading-relaxed mb-8 ${!isEven && "text-right"}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
              }}
            >
              {project.description}
            </motion.p>

            {/* Tags */}
            <motion.div
              className={`flex flex-wrap gap-2 mb-10 ${!isEven && "justify-end"}`}
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

            {/* Button */}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative inline-flex items-center justify-center w-fit ${!isEven && "self-end"}`}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 20 } }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-brand-blue translate-y-1 translate-x-1" />
                <div className="relative border-2 border-brand-blue bg-brand-yellow px-8 py-4 font-mono font-black text-brand-blue uppercase tracking-widest flex items-center gap-3">
                  <span>View Project</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
              </motion.a>
            )}
          </motion.div>
        ) : (
          <motion.div
            key={page === 0 ? "cover" : "back-cover"}
            className={`absolute top-16 md:top-24 z-20 flex flex-col ${page === 0
              ? "left-6 md:left-12 lg:left-24 items-start text-left"
              : "right-6 md:right-12 lg:right-24 items-end text-right"
              }`}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
            }}
          >
            {/* Top Label */}
            <motion.div
              className={`flex items-center gap-4 mb-4 ${page !== 0 && "justify-end"}`}
              variants={{
                hidden: { opacity: 0, x: page === 0 ? -30 : 30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <span className="px-3 py-1 border-2 border-brand-blue text-brand-blue font-mono font-bold text-xs uppercase tracking-widest bg-brand-yellow">
                {page === 0 ? "START HERE" : "THAT'S ALL"}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              className={`flex flex-wrap text-5xl md:text-6xl lg:text-[7rem] font-sans font-black text-brand-blue tracking-widest uppercase mb-6 leading-none drop-shadow-sm ${page === 0 ? "justify-start" : "justify-end"
                }`}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.03, delayChildren: 0.02 } }
              }}
            >
              {(page === 0 ? "PROJECTS" : "THE END").split("").map((char, i) => (
                <span key={i} className="overflow-hidden inline-block">
                  <motion.span
                    className="inline-block origin-bottom transition-transform hover:scale-110 cursor-default"
                    variants={{
                      hidden: { y: "120%", rotate: 8, opacity: 0 },
                      visible: {
                        y: "0%",
                        rotate: 0,
                        opacity: 1,
                        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                      }
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            {/* Description & Call to Action */}
            <motion.div
              className={`w-full max-w-[280px] md:max-w-[400px] text-brand-blue/80 font-medium text-sm md:text-base leading-relaxed space-y-4 ${page !== 0 && "text-right"
                }`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", delay: 0.1 } }
              }}
            >
              {page === 0 ? (
                <>
                  <p>
                    Welcome to my interactive 3D showcase. Discover my journey through full-stack development, creative coding, and UI/UX engineering.
                  </p>
                </>
              ) : (
                <p>
                  You&apos;ve reached the end of my 3D portfolio showcase. Feel free to browse back or check out the direct links to the projects below.
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function BookSection() {
  const [mounted, setMounted] = useState(false);
  const [page] = useAtom(pageAtom);

  useEffect(() => {
    setMounted(true);
  }, []);

  const project = page > 0 && page <= PROJECTS.length ? PROJECTS[page - 1] : null;
  const isEven = project ? ((page - 1) % 2 === 1) : true;
  const bgClass = project ? (isEven ? "bg-paper" : "bg-brand-white") : "bg-paper";

  if (!mounted) {
    return <section id="book-section" className={`relative w-full min-h-[910px] ${bgClass} transition-colors duration-500 hidden md:block`} />;
  }

  return (
    <section id="book-section" className={`relative w-full min-h-[910px] ${bgClass} transition-colors duration-500 overflow-hidden flex items-center justify-center border-t-8 border-b-8 border-brand-yellow py-20 px-4 md:px-12 lg:px-24 hidden md:block`}>
      {/* Decorative Index Background */}
      {project && (
        <div className={`absolute top-10 ${isEven ? 'left-10 md:left-20' : 'right-10 md:right-20'} md:top-20 text-[10rem] md:text-[20rem] font-black font-sans text-brand-blue/5 leading-none pointer-events-none select-none z-0 transition-all duration-500`}>
          0{page}
        </div>
      )}

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
      <BookUI />
      {/* We need Loader to be outside canvas or sibling */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-auto">
        <Canvas
          shadows
          camera={{
            position: [0, 1, 4],
            fov: 45,
          }}
        >
          <SceneRig />
          <group position-y={0}>
            <Suspense fallback={null}>
              <Experience />
            </Suspense>
          </group>
        </Canvas>
      </div>
      <Loader />
      <BottomBar />
    </section>
  );
}
