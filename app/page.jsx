'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // Simple mouse move for custom cursor (optional)
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Only enable custom cursor on desktop
    if (window.innerWidth > 768) {
      setShowCursor(true);
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Experience data
  const experiences = [
    {
      company: 'Apple',
      role: 'Senior Software Engineer',
      period: 'July 2024 – Present',
      location: 'United States',
      bullets: [
        'Engineering specialist for high‑performance distributed systems, transforming abstract architecture into concrete designs.',
        'Architected RESTful APIs and microservices using Java, Kotlin, and Spring Boot handling millions of daily requests.',
        'Designed event‑driven solutions with Kafka for real‑time data processing across services.',
        'Optimized database performance achieving 40% reduction in response times.',
        'Led code reviews and mentored junior engineers on distributed systems best practices.',
        'Maintained 99.99% availability through on‑call rotations and incident resolution.'
      ]
    },
    {
      company: 'Deloitte',
      role: 'Software Engineer',
      period: 'March 2021 – November 2023',
      location: 'Hyderabad, India',
      bullets: [
        'Built distributed transaction systems using Java, Spring Boot, and event‑driven architectures.',
        'Developed REST APIs supporting 100K+ concurrent users with comprehensive documentation.',
        'Implemented real‑time data pipelines with Kafka for analytics and monitoring.',
        'Reduced deployment time by 70% through Docker and CI/CD automation.',
        'Collaborated with cross-functional teams to deliver features on schedule.',
        'Optimized code paths to lower latency and increase throughput.'
      ]
    }
  ];

  // Achievements
  const achievements = [
    'Architected platform handling 200K+ transactions/sec with 99.99% availability and sub‑50ms latency',
    'Improved API response times by 65% through query optimization and caching',
    'Reduced incident response time by 60% with comprehensive monitoring and alerting',
    'Established engineering best practices adopted across multiple teams',
    'Mentored 3 junior engineers to mid‑level roles'
  ];

  // Skills
  const skills = [
    'Java', 'Kotlin', 'Python', 'SQL',
    'Spring Boot', 'REST APIs', 'GraphQL',
    'PostgreSQL', 'Cassandra', 'Kafka',
    'Docker', 'Kubernetes', 'AWS',
    'Microservices', 'System Design', 'CI/CD'
  ];

  // Certifications
  const certifications = [
    'Oracle Certified Professional: Java SE 11',
    'AWS Certified Solutions Architect',
    'Certified Kubernetes Administrator'
  ];

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Experience', id: 'experience' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Skills', id: 'skills' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <div ref={containerRef} className="bg-zinc-900 text-zinc-100 min-h-screen">
      {/* Simple Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/90 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('home')}
              className="text-xl font-bold text-orange-500 hover:text-orange-400 transition-colors"
            >
              MN
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-zinc-400 hover:text-orange-500 transition-colors text-sm uppercase tracking-wider"
                >
                  {item.name}
                </button>
              ))}
              
              {/* Resume Button */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition-colors text-sm"
              >
                Resume
              </a>
            </div>

            {/* Mobile Menu Button - Simple */}
            <button className="md:hidden text-zinc-400 hover:text-orange-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-7xl md:text-8xl font-bold mb-4"
          >
            MAHESH BABU
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 text-orange-500"
          >
            NARNE
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto"
          >
            Software Engineer • Java • Kotlin • Distributed Systems
          </motion.p>
        </div>
      </section>

      {/* Professional Summary */}
      <section className="py-20 px-6 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-orange-500">In a Nutshell</h2>
          <p className="text-zinc-300 text-lg leading-relaxed">
            Software Engineer with 4+ years of experience designing and delivering high‑performance, 
            scalable distributed systems. Expert in Java, Kotlin, and REST APIs with a proven track 
            record of leading technical initiatives and mentoring engineering teams.
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-zinc-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-orange-500 text-center">
            Experience
          </h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-zinc-800 rounded-lg p-6 hover:border-orange-500 border border-transparent transition-all">
                <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <p className="text-orange-500">{exp.company}</p>
                  </div>
                  <div className="text-zinc-400 text-sm mt-2 md:mt-0">
                    <p>{exp.period}</p>
                    <p>{exp.location}</p>
                  </div>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="text-sm">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-orange-500 text-center">
            Key Achievements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                <p className="text-zinc-300">✓ {achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-zinc-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-orange-500 text-center">
            Technical Skills
          </h2>

          <div className="flex flex-wrap gap-2 justify-center">
            {skills.map((skill, i) => (
              <span key={i} className="px-4 py-2 bg-zinc-800 rounded-full text-zinc-300 border border-zinc-700">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-orange-500 text-center">
            Certifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <div key={i} className="bg-zinc-800 rounded-lg p-6 text-center border border-zinc-700">
                <p className="text-zinc-300">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-20 px-6 bg-zinc-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-orange-500 text-center">
            Education
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Master of Science</h3>
              <p className="text-orange-500 mb-1">University of Central Missouri</p>
              <p className="text-zinc-400">Warrensburg, MO</p>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Bachelor of Technology</h3>
              <p className="text-orange-500 mb-1">GITAM University</p>
              <p className="text-zinc-400">Andhra Pradesh, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-orange-500">
            Get in Touch
          </h2>
          <p className="text-zinc-400 text-lg mb-4">
            narnemaheshbabu11@gmail.com
          </p>
          <p className="text-zinc-500 mb-8">
            +1-913-249-9980
          </p>
          <a
            href="mailto:narnemaheshbabu11@gmail.com"
            className="inline-block px-8 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          >
            Send Email
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500">© 2026 Mahesh Babu Narne</p>
          <div className="flex gap-6">
            <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors">GitHub</a>
            <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}