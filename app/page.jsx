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
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const roles = [
    'Senior Software Engineer',
    'Distributed Systems Specialist',
    'Java / Kotlin Expert',
    'Event‑Driven Architect'
  ];

  useEffect(() => {
    // Rotating roles animation
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

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

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // GSAP animations for sections
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

    gsap.utils.toArray('.fade-up').forEach((el) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

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

  // Data from your resume
  const experiences = [
    {
      role: 'Senior Software Engineer',
      company: 'Apple',
      period: 'July 2024 – January 2026',
      location: 'United States',
      bullets: [
        'Served as engineering specialist designing high‑performance distributed systems, distilling abstract architecture into concrete design.',
        'Architected RESTful APIs and microservices using Java, Kotlin, and Spring Boot, handling millions of daily requests with sub‑50ms latency.',
        'Designed event‑driven streaming solutions with Kafka for real‑time data processing.',
        'Optimized database performance (PostgreSQL, Cassandra), achieving a 40% reduction in response times.',
        'Led code reviews, established coding standards, and mentored junior engineers.',
        'Participated in on‑call rotations, resolving production incidents to maintain 99.99% availability.'
      ]
    },
    {
      role: 'Software Engineer',
      company: 'Deloitte',
      period: 'March 2021 – November 2023',
      location: 'Hyderabad, India',
      bullets: [
        'Built distributed transaction processing systems using Java, Spring Boot, and event‑driven architectures.',
        'Developed REST APIs and backend services scaling to 100K+ concurrent users.',
        'Implemented real‑time data pipelines with Kafka for analytics and monitoring.',
        'Containerized applications with Docker and automated CI/CD pipelines, reducing deployment time by 70%.',
        'Collaborated with product managers to refine requirements and deliver features on schedule.',
        'Conducted performance profiling, optimizing critical code paths for lower latency.'
      ]
    }
  ];

  const achievements = [
    'Architected a high‑throughput transaction platform scaling to 200K+ TPS with 99.99% availability and sub‑50ms p99 latency.',
    'Optimized PostgreSQL queries and introduced caching, improving API response times by 65%.',
    'Reduced incident response time by 60% through comprehensive monitoring, log aggregation, and automated alerting.',
    'Established engineering best practices and design patterns adopted across multiple teams.',
    'Mentored 3 junior engineers who advanced to mid‑level roles.'
  ];

  const skills = [
    'Java (5+ years)', 'Kotlin', 'Python', 'C#', 'SQL',
    'REST', 'Spring Boot', 'GraphQL', 'gRPC', 'Gradle',
    'PostgreSQL', 'Cassandra', 'NoSQL', 'Database Design', 'Query Optimization',
    'Kafka', 'Event‑Driven Architecture', 'Stream Processing',
    'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'CI/CD',
    'Grafana', 'Prometheus', 'ELK Stack', 'Distributed Tracing',
    'High‑Throughput Systems', 'Low‑Latency Design', 'Microservices', 'Fault Tolerance',
    'Agile/Scrum', 'Code Reviews', 'TDD', 'Design Patterns',
    'Root Cause Analysis', 'Performance Tuning', 'Incident Management'
  ];

  const certifications = [
    'Oracle Certified Professional: Java SE 11 Developer',
    'Confluent Certified Developer for Apache Kafka',
    'AWS Certified Solutions Architect – Associate',
    'Certified Kubernetes Administrator (CKA)'
  ];

  const education = [
    {
      degree: 'Master of Science in Computer Science',
      institution: 'University of Central Missouri',
      date: 'Expected May 2025',
      location: 'Warrensburg, MO'
    },
    {
      degree: 'Bachelor of Technology in Computer Science',
      institution: 'GITAM University',
      date: 'May 2020',
      location: 'Andhra Pradesh, India'
    }
  ];

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden">
      {/* Custom Cursor */}
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
          <motion.div className="hero-text mb-4">
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter bg-gradient-to-r from-white via-zinc-400 to-white bg-clip-text text-transparent">
              NARNE
            </h1>
          </motion.div>
          <motion.div className="hero-text h-16 md:h-20">
            <motion.p
              key={currentRoleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl md:text-3xl text-zinc-300"
            >
              {roles[currentRoleIndex]}
            </motion.p>
          </motion.div>
          <motion.p className="hero-text text-zinc-500 text-sm sm:text-base max-w-2xl mx-auto mt-4">
            Java • Kotlin • Distributed Systems • Cloud Architecture
          </motion.p>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </motion.section>

      {/* About Me */}
      <section className="parallax-section relative py-20 md:py-32 px-6" data-depth="0.3">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-4xl"
          >
            Senior Software Engineer with 4+ years of experience designing and delivering high‑performance, scalable, and secure distributed systems. Expert in Java, Kotlin, REST APIs, and event‑driven architectures. Proven ability to translate complex requirements into robust software solutions, lead technical initiatives, and mentor engineering teams. Passionate about building reliable, observable systems that solve real‑world problems.
          </motion.p>
        </div>
      </section>

      {/* What I Do */}
      <section className="relative py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-12 md:mb-20 text-center"
          >
            What I Do
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Backend Engineering Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-white transition-all duration-300"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <h3 className="text-2xl font-bold mb-4">Backend Engineering</h3>
              <p className="text-zinc-400 mb-6">
                Building robust, scalable backend systems using Java, Kotlin, Spring Boot, and microservices architecture.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Java', 'Kotlin', 'Spring Boot', 'REST', 'gRPC', 'Microservices'].map(skill => (
                  <span key={skill} className="px-3 py-1 text-xs border border-zinc-700 rounded-full text-zinc-300">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Data Systems & Architecture Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-white transition-all duration-300"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <h3 className="text-2xl font-bold mb-4">Data Systems & Architecture</h3>
              <p className="text-zinc-400 mb-6">
                Designing high‑throughput, low‑latency data platforms with Kafka, PostgreSQL, Cassandra, and distributed systems patterns.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Kafka', 'PostgreSQL', 'Cassandra', 'NoSQL', 'Stream Processing', 'Distributed Systems'].map(skill => (
                  <span key={skill} className="px-3 py-1 text-xs border border-zinc-700 rounded-full text-zinc-300">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="relative py-20 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-12 md:mb-20 text-center"
          >
            Career & Experience
          </motion.h2>
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col md:flex-row gap-4 md:gap-8"
              >
                <div className="md:w-1/4 text-zinc-500 font-mono text-sm">
                  {exp.period}
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl md:text-2xl font-bold">{exp.role}</h3>
                  <p className="text-zinc-400 mb-2">{exp.company} • {exp.location}</p>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-sm">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
            {education.map((edu, idx) => (
              <motion.div
                key={`edu-${idx}`}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (experiences.length + idx) * 0.2 }}
                className="flex flex-col md:flex-row gap-4 md:gap-8"
              >
                <div className="md:w-1/4 text-zinc-500 font-mono text-sm">
                  {edu.date}
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl md:text-2xl font-bold">{edu.degree}</h3>
                  <p className="text-zinc-400">{edu.institution} • {edu.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Achievements */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 hover:border-white transition-all duration-300"
              >
                <p className="text-zinc-300 text-base leading-relaxed">✓ {item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills */}
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
                className="px-4 py-2 bg-zinc-800 text-zinc-200 rounded-full text-sm border border-zinc-700 hover:border-white transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Contact */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            Let's Connect
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl mb-2"
          >
            narnemaheshbabu11@gmail.com
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-zinc-500 text-base md:text-lg mb-2"
          >
            +1-913-249-9980
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-zinc-500 text-base md:text-lg mb-8"
          >
            Redmond, WA
          </motion.p>
          <motion.a
            href="mailto:narnemaheshbabu11@gmail.com"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="inline-block px-8 py-4 border-2 border-white rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300"
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
          <p className="text-zinc-500 text-sm">© 2026 Mahesh Babu Narne</p>
          <div className="flex gap-6">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}