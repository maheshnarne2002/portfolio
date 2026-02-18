"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// If you already have separate components (Navbar, Experience, etc.),
// just replace the inline JSX with your own imports.
// import Experience from "@/components/Experience";
// import Navbar from "@/components/Navbar";

function useTyping(text, speed = 120, pause = 1200) {
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!text) return;

    const handle = setTimeout(() => {
      if (!deleting) {
        if (index < text.length) {
          setDisplay((prev) => prev + text.charAt(index));
          setIndex((prev) => prev + 1);
        } else {
          setDeleting(true);
        }
      } else {
        if (index > 0) {
          setDisplay((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        } else {
          setDeleting(false);
        }
      }
    }, deleting ? speed / 2 : index === text.length ? pause : speed);

    return () => clearTimeout(handle);
  }, [text, speed, pause, index, deleting]);

  return display;
}

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseenter", enter);
    window.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseenter", enter);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-[60] h-6 w-6 rounded-full border border-white/60 bg-white/10 backdrop-blur-md mix-blend-screen"
      animate={{ x: position.x - 12, y: position.y - 12, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.4 }}
    />
  );
}

function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1e293b_0,_#020617_55%,_#000_100%)]" />
      <div className="absolute -top-40 -left-32 h-80 w-80 rounded-full bg-[#38bdf8]/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#a855f7]/25 blur-3xl" />
      <div className="absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#22c55e]/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.06),_transparent_60%)] mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(15,23,42,0.2),_rgba(15,23,42,0.9))]" />
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
  }),
};

export default function Page() {
  const typedName = useTyping("Mahesh Babu Narne", 110, 1400);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <AuroraBackground />
      <CustomCursor />

      {/* Optional: replace with your own Navbar component */}
      <header className="relative z-20 border-b border-white/5 bg-slate-950/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <span className="text-xs font-semibold tracking-tight text-slate-100">
                MN
              </span>
            </div>
            <span className="text-sm font-medium text-slate-200">
              Mahesh Babu Narne
            </span>
          </div>
          <nav className="hidden gap-6 text-xs font-medium text-slate-300 sm:flex">
            <a href="#about" className="hover:text-slate-50 transition-colors">
              About
            </a>
            <a href="#experience" className="hover:text-slate-50 transition-colors">
              Experience
            </a>
            <a href="#skills" className="hover:text-slate-50 transition-colors">
              Skills
            </a>
          </nav>
        </div>
      </header>

      <section
        id="hero"
        className="relative z-10 mx-auto flex min-h-[70vh] max-w-5xl flex-col justify-center px-4 pt-10 sm:px-6 lg:px-8"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.1}
          className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-[11px] font-medium text-slate-300 shadow-[0_0_0_1px_rgba(15,23,42,0.6)] backdrop-blur-xl"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.35)]" />
          <span>Backend Engineer · Distributed Systems · Java &amp; Kotlin</span>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.2}
          className="mt-6 text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl"
        >
          <span className="block text-sm font-normal uppercase tracking-[0.25em] text-slate-400">
            Portfolio of
          </span>
          <span className="mt-3 block bg-gradient-to-r from-sky-300 via-emerald-200 to-violet-300 bg-clip-text text-transparent">
            {typedName || "Mahesh Babu Narne"}
          </span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.35}
          className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base"
        >
          Backend engineer specializing in{" "}
          <span className="font-medium text-slate-100">
            distributed systems, REST APIs, and JVM ecosystems
          </span>
          , with a strong eye for{" "}
          <span className="font-medium text-slate-100">
            modern frontend polish and interaction design
          </span>
          . I build reliable systems that feel as refined as they perform.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.5}
          className="mt-7 flex flex-wrap items-center gap-4"
        >
          <a
            href="#experience"
            className="inline-flex items-center justify-center rounded-full bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-slate-900/40 transition hover:bg-white"
          >
            View experience
          </a>
          <a
            href="#skills"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-slate-900/40 px-4 py-2 text-xs font-medium text-slate-100 backdrop-blur-xl transition hover:border-white/30 hover:bg-slate-900/70"
          >
            Explore skills
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.65}
          className="mt-10 grid gap-4 text-xs text-slate-300 sm:grid-cols-3"
        >
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 backdrop-blur-xl">
            <p className="text-[11px] font-medium text-slate-400">Core stack</p>
            <p className="mt-2 font-medium text-slate-50">
              Java · Kotlin · Spring · REST
            </p>
            <p className="mt-1 text-[11px] text-slate-400">
              Production-grade APIs and distributed services.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 backdrop-blur-xl">
            <p className="text-[11px] font-medium text-slate-400">Frontend</p>
            <p className="mt-2 font-medium text-slate-50">
              Next.js · Tailwind · Animations
            </p>
            <p className="mt-1 text-[11px] text-slate-400">
              Minimal, premium interfaces with subtle motion.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 backdrop-blur-xl">
            <p className="text-[11px] font-medium text-slate-400">Mindset</p>
            <p className="mt-2 font-medium text-slate-50">
              Reliability · Clarity · Craft
            </p>
            <p className="mt-1 text-[11px] text-slate-400">
              Systems that scale, UIs that feel intentional.
            </p>
          </div>
        </motion.div>
      </section>

      <section
        id="experience"
        className="relative z-10 mx-auto max-w-5xl px-4 pb-16 pt-4 sm:px-6 lg:px-8"
      >
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0.1}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400"
        >
          Experience
        </motion.h2>

        {/* 
          Keep this section aligned with your existing content.
          If you already have an <Experience /> component, replace the block below with:
          <Experience />
        */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={0.25}
          className="mt-6 space-y-4 text-sm text-slate-200"
        >
          {/* Replace this placeholder with your real Experience entries */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 backdrop-blur-xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              Your Experience Section
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Keep your authentic descriptions here exactly as you’ve written them in your
              current portfolio. This block is just a placeholder—swap it with your real
              timeline or cards.
            </p>
          </div>
        </motion.div>
      </section>

      <section
        id="skills"
        className="relative z-10 mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8"
      >
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0.1}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400"
        >
          Skills
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={0.25}
          className="mt-6 grid gap-4 text-xs text-slate-200 sm:grid-cols-3"
        >
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 backdrop-blur-xl">
            <p className="text-[11px] font-semibold text-slate-300">Backend</p>
            <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
              <li>Java · Kotlin · Spring</li>
              <li>REST API design</li>
              <li>Distributed systems</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 backdrop-blur-xl">
            <p className="text-[11px] font-semibold text-slate-300">Frontend</p>
            <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
              <li>Next.js (App Router)</li>
              <li>Tailwind CSS · PostCSS</li>
              <li>GSAP · Framer Motion</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 backdrop-blur-xl">
            <p className="text-[11px] font-semibold text-slate-300">Workflow</p>
            <ul className="mt-2 space-y-1 text-[11px] text-slate-400">
              <li>GitHub · CI/CD</li>
              <li>Vercel deployments</li>
              <li>Lenis-ready smooth scrolling</li>
            </ul>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
