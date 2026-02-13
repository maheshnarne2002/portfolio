use client';

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

    // Experience cards animation (formerly project cards)
    gsap.utils.toArray('.experience-card').forEach((card, i) => {
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

    // Achievement cards animation
    gsap.utils.toArray('.achievement-card').forEach((card, i) => {
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

  // Experience data from resume
  const experiences = [
    {
      company: 'Apple',
      role: 'Senior Software Engineer',
      period: 'July 2024 – January 2026',
      location: 'United States',
      bullets: [
        'Served as engineering specialist responsible for designing and optimizing high‑performance distributed systems, distilling abstract architecture into concrete design and influencing implementation.',
        'Architected and implemented RESTful APIs and microservices using Java, Kotlin, and Spring Boot, handling millions of daily requests with sub‑50ms latency.',
        'Designed event‑driven streaming solutions with Kafka for real‑time data processing and integration across services.',
        'Optimized database performance (PostgreSQL, Cassandra) through schema design, indexing, and query tuning, achieving a 40% reduction in response times.',
        'Led code reviews, established coding standards, and mentored junior engineers on best practices in distributed systems and API design.',
        'Participated in on‑call rotations, performing root cause analysis and resolving production incidents to maintain 99.99% availability.',
        'Delivered high‑throughput, low‑latency solutions with a focus on scalability, repeatability, and security.'
      ]
    },
    {
      company: 'Deloitte',
      role: 'Software Engineer',
      period: 'March 2021 – November 2023',
      location: 'Hyderabad, India',
      bullets: [
        'Designed and built distributed transaction processing systems for enterprise clients using Java, Spring Boot, and event‑driven architectures.',
        'Developed REST APIs and backend services that scaled to support 100K+ concurrent users, with comprehensive documentation and versioning.',
        'Implemented real‑time data pipelines with Kafka for analytics and monitoring.',
        'Containerized applications with Docker and automated CI/CD pipelines, reducing deployment time by 70%.',
        'Collaborated with product managers and cross‑functional teams to refine requirements and deliver features on schedule.',
        'Conducted performance profiling and tuning, optimizing critical code paths to lower latency and increase throughput.'
      ]
    }
  ];

  // Achievements from resume
  const achievements = [
    'Architected and deployed a high‑throughput transaction processing platform that scaled to 200K+ transactions/sec with 99.99% availability and sub‑50ms p99 latency.',
    'Optimized PostgreSQL queries and introduced caching, improving API response times by 65%.',
    'Reduced incident response time by 60% through implementation of comprehensive monitoring, log aggregation, and automated alerting.',
    'Established engineering best practices and design patterns adopted across multiple teams, improving code quality and consistency.',
    'Mentored 3 junior engineers who advanced to mid‑level roles through structured guidance and code reviews.'
  ];

  // Skills from resume (all technical skills listed)
  const skills = [
    'Java (5+ years)', 'Kotlin', 'Python', 'C#', 'SQL',
    'REST', 'Spring Boot', 'GraphQL', 'gRPC', 'Gradle',
    'PostgreSQL', 'Cassandra', 'NoSQL', 'Database Design', 'Query Optimization',
    'Kafka', 'Event‑Driven Architecture', 'Stream Processing',
    'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'CI/CD Pipelines',
    'Grafana', 'Prometheus', 'ELK Stack', 'Distributed Tracing',
    'High‑Throughput Systems', 'Low‑Latency Design', 'Microservices', 'Fault Tolerance',
    'Agile/Scrum', 'Code Reviews', 'TDD', 'Design Patterns',
    'Root Cause Analysis', 'Performance Tuning', 'Incident Management'
  ];

  // Certifications from resume
  const certifications = [
    'Oracle Certified Professional: Java SE 11 Developer',
    'Confluent Certified Developer for Apache Kafka',
    'AWS Certified Solutions Architect – Associate',
    'Certified Kubernetes Administrator (CKA)'
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
              MAHESH BABU
            </h1>
          </motion.div>
          <motion.div className="hero-text mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter bg-gradient-to-r from-white via-zinc-400 to-white bg-clip-text text-transparent">
              NARNE
            </h1>
          </motion.div>
          <motion.p className="hero-text text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
            Software Engineer 
            • Java • Kotlin • Distributed Systems • Rest API's 
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

      {/* Professional Summary Section (replaces About) */}
      <section className="parallax-section relative min-h-screen flex items-center py-20 md:py-32 px-6" data-depth="0.3">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 md:mb-8"
          >
            Professional Summary
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-4xl"
          >
            Senior Software Engineer with 4+ years of experience designing and delivering high‑performance, scalable, and secure distributed systems. Expert in Java, Kotlin, REST APIs, and event‑driven architectures. Proven ability to translate complex requirements into robust software solutions, lead technical initiatives, and mentor engineering teams. Passionate about building reliable, observable systems that solve real‑world problems.
          </motion.p>
        </div>
      </section>

      {/* Experience Section (replaces Projects) */}
      <section className="relative py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-12 md:mb-20 text-center"
          >
            Professional Experience
          </motion.h2>

          <div className="grid grid-cols-1 gap-6 md:gap-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="experience-card group relative bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800 hover:border-white transition-all duration-500 overflow-hidden cursor-pointer"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-2">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-1">{exp.role}</h3>
                      <p className="text-xl text-zinc-300">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-zinc-400">{exp.period}</p>
                      <p className="text-zinc-500 text-sm">{exp.location}</p>
                    </div>
                  </div>

                  <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="text-sm md:text-base leading-relaxed">{bullet}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Achievements Section */}
      <section className="relative py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-12 md:mb-20 text-center"
          >
            Key Achievements
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="achievement-card group relative bg-zinc-900/50 rounded-2xl p-6 md:p-8 border border-zinc-800 hover:border-white transition-all duration-500 overflow-hidden"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="relative z-10 text-zinc-300 text-base md:text-lg leading-relaxed">✓ {achievement}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="parallax-section relative py-20 md:py-32 px-6 bg-zinc-900/50" data-depth="0.2">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-12 md:mb-16 text-center"
          >
            Technical Skills
          </motion.h2>

          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                className="px-4 py-2 bg-zinc-800 text-zinc-200 rounded-full text-sm md:text-base border border-zinc-700 hover:border-white transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="relative py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-12 md:mb-16 text-center"
          >
            Certifications
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-center hover:border-white transition-colors"
              >
                <p className="text-white font-medium">{cert}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="relative py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-12 md:mb-16 text-center"
          >
            Education
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800"
            >
              <h3 className="text-2xl font-bold mb-2">Master of Science in Computer Science</h3>
              <p className="text-xl text-zinc-300 mb-1">University of Central Missouri</p>
              <p className="text-zinc-400"> • Warrensburg, MO</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800"
            >
              <h3 className="text-2xl font-bold mb-2">Bachelor of Technology in Computer Science</h3>
              <p className="text-xl text-zinc-300 mb-1">GITAM University</p>
              <p className="text-zinc-400">• Andhra Pradesh, India</p>
            </motion.div>
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
            Let's Connect
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl mb-4"
          >
            {`narnemaheshbabu11@gmail.com`} • {`+1-913-249-9980`}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-zinc-500 text-base md:text-lg mb-8 md:mb-12"
          >
            Redmond, WA
          </motion.p>
          <motion.a
            href="mailto:narnemaheshbabu11@gmail.com"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="inline-block px-6 md:px-8 py-3 md:py-4 border-2 border-white rounded-full text-base md:text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 md:py-12 px-6 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm md:text-base">© 2026 Mahesh Babu Narne</p>
          <div className="flex gap-4 md:gap-6">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors text-sm md:text-base"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors text-sm md:text-base"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              LinkedIn
            </a>
            {/* Add more social links if desired */}
          </div>
        </div>
      </footer>
    </div>
  );
}