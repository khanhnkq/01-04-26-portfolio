"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import BottomBar from "@/components/ui/BottomBar";
import { Iphone } from "@/components/ui/Iphone";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/khanhnkq",
    path: "M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.798 24 17.301 24 12 24 5.373 18.627 0 12 0Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/khanhnkq",
    path: "M24 12.073C24 5.446 18.627.073 12 .073S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@khanhnkq",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814A3.016 3.016 0 0 0 2.624 17.95c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z",
  },
] as const;

export default function ContactSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [isContactExpanded, setIsContactExpanded] = useState(false);

  useEffect(() => {
    if (!isContactExpanded) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsContactExpanded(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isContactExpanded]);

  return (
    <section
      id="contact"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-paper px-5 pb-16 pt-14 md:px-12 md:pb-20 md:pt-16"
    >
      <div className="pointer-events-none absolute bottom-8 left-8 z-0 select-none font-sans text-[11rem] font-black leading-none text-brand-blue/5 md:bottom-16 md:left-16 md:text-[22rem]">
        04
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #0A2463 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, #0A2463 79px, #0A2463 80px)",
        }}
      />

      <div className="pointer-events-none absolute left-6 top-6 z-0 h-16 w-16 border-l-2 border-t-2 border-brand-blue/10 md:left-12 md:top-12 md:h-24 md:w-24" />
      <div className="pointer-events-none absolute bottom-16 right-6 z-0 h-16 w-16 border-b-2 border-r-2 border-brand-blue/10 md:bottom-20 md:right-12 md:h-24 md:w-24" />

      <motion.div
        className="pointer-events-none absolute left-4 top-12 z-20 flex flex-col items-start text-left md:left-20 md:top-10 lg:left-8 lg:top-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
        }}
      >
        <motion.h2
          className="mb-3 flex justify-start font-sans text-4xl font-black uppercase leading-none tracking-widest text-brand-blue md:mb-5 md:text-5xl lg:text-[7rem]"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
          }}
        >
          {"CONTACT".split("").map((char, index) => (
            <span key={`${char}-${index}`} className="-mx-1 inline-block overflow-hidden px-1">
              <motion.span
                className="inline-block origin-bottom"
                variants={{
                  hidden: { y: "120%", rotate: 10, opacity: 0 },
                  visible: {
                    y: "0%",
                    rotate: 0,
                    opacity: 1,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <div className="flex items-center justify-start gap-5 md:gap-8">
          <motion.span
            className="font-script text-2xl text-brand-blue md:text-4xl"
            variants={{
              hidden: { opacity: 0, scale: 0, rotate: -15 },
              visible: {
                opacity: 1,
                scale: 1,
                rotate: -6,
                transition: { type: "spring", stiffness: 200, damping: 12 },
              },
            }}
          >
            Say hello
          </motion.span>

          <motion.span
            className="font-script text-2xl text-brand-yellow drop-shadow-[2px_2px_0_#238CFF] md:text-4xl"
            variants={{
              hidden: { opacity: 0, scale: 0, rotate: 15 },
              visible: {
                opacity: 1,
                scale: 1,
                rotate: 6,
                transition: { type: "spring", stiffness: 200, damping: 12 },
              },
            }}
          >
            {`(^ ω ^)`}
          </motion.span>
        </div>
      </motion.div>

      <div className="relative z-20 mt-20 flex w-full max-w-6xl flex-col items-center md:mt-24">


        <div className="relative isolate flex flex-col items-center">
          <div className="relative z-10 mb-3 md:mb-4">
            <motion.div
              className="origin-bottom"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, rotate: -10 }}
              whileInView={
                shouldReduceMotion
                  ? { opacity: 1, y: 0, rotate: -7 }
                  : { opacity: 1, y: [0, -6, 0], rotate: [-9, -5, -9] }
              }
              viewport={{ amount: 0.2 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                    opacity: { duration: 0.35 },
                    y: { duration: 3.6, ease: "easeInOut", repeat: Infinity },
                    rotate: { duration: 4.8, ease: "easeInOut", repeat: Infinity },
                  }
              }
            >
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: 0 }}
                whileInView={
                  shouldReduceMotion ? { opacity: 0 } : { opacity: [0, 1, 1, 1, 0, 0] }
                }
                viewport={{ amount: 0.2 }}
                transition={{
                  duration: 3,
                  times: [0, 0.03, 0.08, 0.16, 0.23, 1],
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="absolute -right-2 top-[-8%] h-1 w-4 -rotate-[58deg] bg-brand-blue/80 [clip-path:polygon(0_50%,100%_0,100%_100%)] md:-right-4 md:h-1.5 md:w-6" />
                <span className="absolute -right-4 top-[2%] h-1.5 w-6 -rotate-[38deg] bg-brand-yellow [clip-path:polygon(0_50%,100%_0,100%_100%)] md:-right-7 md:h-2 md:w-9" />
                <span className="absolute -right-5 top-[11%] h-2 w-8 -rotate-[18deg] bg-brand-blue/80 [clip-path:polygon(0_50%,100%_0,100%_100%)] md:-right-9 md:h-2.5 md:w-12" />
              </motion.div>

              <motion.button
                type="button"
                aria-label="Expand contact phone"
                aria-expanded={isContactExpanded}
                aria-controls="contact-phone-dialog"
                layoutId="contact-iphone"
                className="w-36 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue md:w-48 lg:w-56"
                onClick={() => setIsContactExpanded(true)}
                whileInView={
                  shouldReduceMotion
                    ? { x: 0, rotate: 0 }
                    : {
                      x: [0, -3, 3, -2, 2, 0, 0],
                      rotate: [0, -4, 4, -3, 3, 0, 0],
                    }
                }
                viewport={{ amount: 0.2 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                      x: {
                        duration: 3,
                        times: [0, 0.04, 0.08, 0.12, 0.17, 0.22, 1],
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      rotate: {
                        duration: 3,
                        times: [0, 0.04, 0.08, 0.12, 0.17, 0.22, 1],
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
                }
              >
                <Iphone />
              </motion.button>
            </motion.div>
          </div>

        </div>

        <motion.div
          className="mt-10 flex items-center gap-4 md:mt-12 md:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
          }}
        >
          {SOCIAL_LINKS.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
              variants={{
                hidden: { opacity: 0, y: 24, rotate: -6 },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                  transition: { type: "spring", stiffness: 250, damping: 18 },
                },
              }}
              whileHover={{ y: -6, scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="flex h-11 w-11 items-center justify-center border-2 border-brand-blue bg-brand-white shadow-[-4px_4px_0_0_#FFE06B] transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 md:h-12 md:w-12">
                <svg aria-hidden="true" className="h-6 w-6 fill-brand-blue md:h-7 md:w-7" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {isContactExpanded ? (
          <motion.div
            id="contact-phone-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Contact details"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-blue/80 px-6 py-10 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            onClick={() => setIsContactExpanded(false)}
          >
            <motion.div
              className="relative"
              onClick={(event) => event.stopPropagation()}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                layoutId="contact-iphone"
                className="w-[min(72vw,40vh)] drop-shadow-[0_24px_36px_rgba(3,18,58,0.45)] md:w-[min(32vw,42vh)]"
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 210, damping: 24, mass: 0.9 }
                }
              >
                <Iphone
                  screenActionHref="mailto:khanhnguyenkim30825@gmail.com"
                  onScreenClose={() => setIsContactExpanded(false)}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <BottomBar />
    </section>
  );
}
