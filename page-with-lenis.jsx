'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    // Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Update GSAP ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Mouse move for custom cursor
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Hero text animation
    gsap.fromTo(
      '.hero-text',
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.2,
        delay: 0.5
      }
    );

    // Project cards animation
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Parallax sections
    gsap.utils.toArray('.parallax-section').forEach((section) => {
      const depth = parseFloat(section.dataset.depth) || 0.5;
      gsap.to(section, {
        y: () => -section.offsetHeight * depth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.ticker.remove(raf);
    };
  }, []);

  const projects = [
    {
      title: 'Neural Canvas',
      description: 'AI-powered design system merging ancient calligraphy with generative art',
      tech: ['React', 'TensorFlow.js', 'WebGL'],
      year: '2025'
    },
    {
      title: 'Quantum Archive',
      description: 'Blockchain-based digital preservation inspired by ancient libraries',
      tech: ['Next.js', 'Solidity', 'IPFS'],
      year: '2025'
    },
    {
      title: 'Temporal Interface',
      description: 'Time-based UI framework using principles from sundials and astrolabes',
      tech: ['Vue', 'Three.js', 'GSAP'],
      year: '2024'
    },
    {
      title: 'Echo Protocol',
      description: 'Communication platform inspired by ancient signal systems',
      tech: ['WebRTC', 'Node.js', 'MongoDB'],
      year: '2024'
    }
  ];

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden">
      {/* Custom Cursor - Desktop Only */}
      <motion.div
        className="custom-cursor hidden md:block fixed top-0 left-0 w-8 h-8 border-2 border-white rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: cursorVariant === 'hover' ? 2 : 1
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black" />
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-white"
              style={{ top: `${i * 5}%`, width: '100%' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: i * 0.05 }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div className="hero-text mb-4">
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">
              ANCIENT
            </h1>
          </motion.div>
          <motion.div className="hero-text mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter bg-gradient-to-r from-white via-zinc-400 to-white bg-clip-text text-transparent">
              × FUTURE
            </h1>
          </motion.div>
          <motion.p className="hero-text text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
            Bridging millennia of wisdom with tomorrow's technology
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section className="parallax-section relative min-h-screen flex items-center py-20 md:py-32 px-6" data-depth="0.3">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 md:mb-8"
          >
            Where Time Converges
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-4xl"
          >
            I craft digital experiences that honor ancient principles of design—sacred geometry, 
            balanced proportions, timeless aesthetics—while pushing the boundaries of modern web 
            technology. Each project is a meditation on how the past informs the future.
          </motion.p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-12 md:mb-20 text-center"
          >
            Selected Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="project-card group relative bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800 hover:border-white transition-all duration-500 overflow-hidden cursor-pointer"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm text-zinc-500">{project.year}</span>
                    <motion.div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-white transition-colors"
                      whileHover={{ rotate: 45 }}
                    >
                      <span className="text-xl md:text-2xl">→</span>
                    </motion.div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{project.title}</h3>
                  <p className="text-zinc-400 mb-6 leading-relaxed text-sm md:text-base">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs border border-zinc-700 rounded-full group-hover:border-zinc-500 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="parallax-section relative py-20 md:py-32 px-6 bg-zinc-900/50" data-depth="0.2">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-12 md:mb-16 text-center"
          >
            Craft & Code
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'Framer Motion', 'GSAP', 'Three.js'].map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-4 md:p-6 border border-zinc-800 rounded-xl hover:border-white transition-colors"
              >
                <h3 className="text-lg md:text-xl font-semibold">{skill}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8"
          >
            Let's Create
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl mb-8 md:mb-12"
          >
            Something timeless together
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="px-6 md:px-8 py-3 md:py-4 border-2 border-white rounded-full text-base md:text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 md:py-12 px-6 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm md:text-base">© 2026 Ancient × Future</p>
          <div className="flex gap-4 md:gap-6">
            {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-zinc-500 hover:text-white transition-colors text-sm md:text-base"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
