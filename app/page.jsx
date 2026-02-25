'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export default function Home() {
  const containerRef = useRef(null);
  const nutshellRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [cursorHover, setCursorHover] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Scroll progress for nutshell animation
  const { scrollYProgress } = useScroll({
    target: nutshellRef,
    offset: ["start end", "end start"]
  });
  
  // Smooth transforms for elegant animation
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.7, 0.8, 1], [0, 0.5, 1, 1, 0.5, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const contentScale = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0.8, 1, 1, 0.8]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [30, 0, 0, -30]);
  
  // Decorative elements animation
  const circle1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.5, 0.5]);
  const circle2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.8, 0.8]);
  const circle3Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1.3, 0.3]);
  const circleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.3, 0.3, 0.1]);
  
  // Loading and glitch states
  const [isLoading, setIsLoading] = useState(true);
  const [glitchText, setGlitchText] = useState('');
  
  // Typing animation states
  const [displayFirstName, setDisplayFirstName] = useState('');
  const [displayLastName, setDisplayLastName] = useState('');
  const [firstNameComplete, setFirstNameComplete] = useState(false);
  const [showCursor1, setShowCursor1] = useState(false);
  const [showCursor2, setShowCursor2] = useState(false);

  const fullFirstName = 'MAHESH BABU';
  const fullLastName = 'NARNE';

  // Glitch effect on load
  useEffect(() => {
    const glitchSequence = async () => {
      const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
      let counter = 0;
      
      const glitchInterval = setInterval(() => {
        let randomStr = '';
        for (let i = 0; i < 20; i++) {
          randomStr += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
        setGlitchText(randomStr);
        
        counter++;
        if (counter > 15) {
          clearInterval(glitchInterval);
          
          let flashCount = 0;
          const flashInterval = setInterval(() => {
            if (flashCount % 2 === 0) {
              setGlitchText('MAHESH BABU NARNE');
            } else {
              setGlitchText('➤➤➤➤➤➤➤➤➤➤➤➤➤➤➤');
            }
            
            flashCount++;
            if (flashCount > 5) {
              clearInterval(flashInterval);
              
              setTimeout(() => {
                setIsLoading(false);
                setShowCursor1(true);
              }, 300);
            }
          }, 100);
        }
      }, 80);
    };

    glitchSequence();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      let i = 0;
      const typeFirstName = setInterval(() => {
        if (i < fullFirstName.length) {
          setDisplayFirstName(fullFirstName.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typeFirstName);
          setFirstNameComplete(true);
          setShowCursor1(false);
          setShowCursor2(true);
          
          setTimeout(() => {
            let j = 0;
            const typeLastName = setInterval(() => {
              if (j < fullLastName.length) {
                setDisplayLastName(fullLastName.substring(0, j + 1));
                j++;
              } else {
                clearInterval(typeLastName);
                setShowCursor2(false);
              }
            }, 100);
          }, 500);
        }
      }, 150);
    }
  }, [isLoading]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      setTimeout(() => {
        setTrailPosition({ x: e.clientX, y: e.clientY });
      }, 50);
    };
    
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    if (window.innerWidth > 768) {
      setShowCursor(true);
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleOnHover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  };

  const experiences = [
    {
      company: 'Apple',
      role: 'Senior Software Engineer',
      period: 'July 2024 – Present',
      location: 'United States',
      bullets: [
        'Design and implement scalable full-stack applications using React, TypeScript, Java, and Spring Boot, handling millions of daily requests with sub-100ms latency.',
        'Architect and develop microservices with Python and C# for event-driven data processing pipelines, integrating with Kafka for real-time analytics.',
        'Optimize database performance through schema design, indexing, and query tuning in PostgreSQL and MongoDB, reducing response times by 45%.',
        'Lead code reviews, establish coding standards, and mentor junior engineers on full-stack development best practices and system architecture.',
        'Implement comprehensive monitoring and alerting using Prometheus and Grafana, reducing mean time to detection (MTTD) by 60%.',
        'Collaborate with cross-functional teams to define requirements and deliver features in an Agile environment.',
        'Participate in on-call rotations, troubleshooting production issues to ensure 99.99% availability.'
      ]
    },
    {
      company: 'Deloitte',
      role: 'Software Engineer',
      period: 'March 2021 – November 2023',
      location: 'Hyderabad, India',
      bullets: [
        'Developed full-stack enterprise applications using React, Java, Spring Boot, and PostgreSQL, delivering features that scaled to 100K+ concurrent users.',
        'Designed and implemented RESTful APIs and microservices with Python and C#, ensuring high performance and security for business-critical data.',
        'Built real-time data pipelines with Kafka for analytics and monitoring, processing millions of events daily.',
        'Containerized applications with Docker and automated CI/CD pipelines using Jenkins and GitHub Actions, reducing deployment time by 70%.',
        'Implemented comprehensive unit and integration tests using JUnit, Mockito, and Jest, maintaining 85% code coverage.',
        'Mentored junior developers on frontend and backend development practices, contributing to team growth.'
      ]
    }
  ];

  const achievements = [
    'Architected and deployed a full-stack e-commerce platform handling 200K+ daily transactions with 99.99% uptime and sub-100ms response times',
    'Optimized database queries and introduced Redis caching, improving API response times by 65% and reducing infrastructure costs by 30%',
    'Reduced incident response time by 60% through comprehensive monitoring, distributed tracing, and automated alerting',
    'Established engineering best practices for full-stack development adopted across multiple teams',
    'Mentored 5 junior engineers who advanced to mid-level roles through structured guidance',
    'Delivered 3 major greenfield projects from concept to production within 6-month timelines'
  ];

  const skills = [
    'Java', 'Python', 'C#', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'Go',
    'React', 'Next.js', 'Redux', 'Tailwind CSS', 'HTML5', 'CSS3', 'Material-UI',
    'Spring Boot', '.NET Core', 'Node.js', 'Express', 'Django', 'GraphQL',
    'AWS', 'Azure', 'OCI', 'Cloud-Native Architecture',
    'PostgreSQL', 'MySQL', 'MongoDB', 'Cassandra', 'Redis',
    'Kafka', 'RabbitMQ', 'ActiveMQ', 'Event-Driven Architecture',
    'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Terraform',
    'Prometheus', 'Grafana', 'ELK Stack', 'Distributed Tracing',
    'JUnit', 'Mockito', 'Jest', 'React Testing Library', 'Selenium'
  ];

  const certifications = [
    'AWS Certified Solutions Architect – Associate',
    'Microsoft Certified: Azure Developer Associate',
    'Oracle Certified Professional: Java SE 11 Developer',
    'Certified Kubernetes Administrator (CKA)',
    'Meta Front-End Developer Professional Certificate'
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
      
      {/* Glitch Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-zinc-900 flex items-center justify-center overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0"
              animate={{
                background: [
                  'linear-gradient(90deg, transparent 0%, #f97316 0%, transparent 0%)',
                  'linear-gradient(90deg, transparent 20%, #f97316 20%, transparent 40%)',
                  'linear-gradient(90deg, transparent 40%, #f97316 40%, transparent 60%)',
                  'linear-gradient(90deg, transparent 60%, #f97316 60%, transparent 80%)',
                  'linear-gradient(90deg, transparent 80%, #f97316 80%, transparent 100%)',
                ]
              }}
              transition={{ duration: 0.2, repeat: Infinity }}
              style={{ opacity: 0.1 }}
            />
            
            <motion.div
              className="absolute inset-0"
              animate={{
                x: [-10, 10, -5, 5, 0],
                filter: [
                  'blur(2px) hue-rotate(0deg)',
                  'blur(4px) hue-rotate(90deg)',
                  'blur(2px) hue-rotate(180deg)',
                  'blur(4px) hue-rotate(270deg)',
                  'blur(0px) hue-rotate(360deg)',
                ]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{
                background: 'radial-gradient(circle at 50% 50%, #f97316, transparent)',
                opacity: 0.2
              }}
            />

            <div className="relative text-center">
              <motion.h1
                className="text-6xl md:text-8xl font-bold font-mono relative"
                animate={{
                  x: [0, -10, 10, -5, 5, 0],
                  skewX: [0, 10, -10, 5, -5, 0],
                  textShadow: [
                    '2px 2px 0 #f97316, -2px -2px 0 #3b82f6',
                    '-2px 2px 0 #f97316, 2px -2px 0 #3b82f6',
                    '2px -2px 0 #f97316, -2px 2px 0 #3b82f6',
                    '-2px -2px 0 #f97316, 2px 2px 0 #3b82f6',
                    '2px 2px 0 #f97316, -2px -2px 0 #3b82f6',
                  ]
                }}
                transition={{ duration: 0.1, repeat: Infinity }}
              >
                {glitchText}
              </motion.h1>
              
              <motion.h1
                className="text-6xl md:text-8xl font-bold font-mono absolute top-0 left-0 opacity-50"
                animate={{
                  x: [5, -5, 3, -3, 0],
                  color: ['#f97316', '#3b82f6', '#f97316', '#3b82f6', '#f97316'],
                  clipPath: [
                    'inset(0 0 0 0)',
                    'inset(10% 0 30% 0)',
                    'inset(30% 0 10% 0)',
                    'inset(20% 0 20% 0)',
                    'inset(0 0 0 0)',
                  ]
                }}
                transition={{ duration: 0.2, repeat: Infinity }}
              >
                {glitchText}
              </motion.h1>

              <motion.p
                className="text-orange-500 mt-8 text-lg font-mono"
                animate={{
                  opacity: [1, 0.5, 1],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ⚡ INITIALIZING SYSTEM ⚡
              </motion.p>

              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-orange-500/20 text-xs font-mono whitespace-nowrap"
                    style={{ left: `${i * 10}%` }}
                    animate={{
                      y: ['-100%', '1000%'],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    {[...Array(20)].map(() => Math.random() > 0.5 ? '1' : '0').join('')}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Trailing Cursor */}
      {showCursor && !isLoading && (
        <>
          <motion.div 
            className="fixed w-2 h-2 bg-orange-500 rounded-full pointer-events-none z-50 mix-blend-difference"
            animate={{
              x: mousePosition.x - 4,
              y: mousePosition.y - 4,
              scale: cursorHover ? 2 : 1
            }}
            transition={{ type: 'spring', stiffness: 1000, damping: 50 }}
          />
          
          <motion.div 
            className="fixed w-8 h-8 border-2 border-orange-500 rounded-full pointer-events-none z-40"
            animate={{
              x: trailPosition.x - 16,
              y: trailPosition.y - 16,
              scale: cursorHover ? 1.5 : 1,
              borderColor: cursorHover ? '#ffffff' : '#f97316'
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          />
        </>
      )}

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        onMouseEnter={() => setCursorHover(true)}
        onMouseLeave={() => setCursorHover(false)}
        className={`fixed bottom-8 right-8 z-50 p-4 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 group ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showBackToTop ? 1 : 0, y: showBackToTop ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        <svg 
          className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2.5} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
        
        <span className="absolute -top-10 right-0 bg-zinc-800 text-white text-sm py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-zinc-700">
          Back to Top
        </span>
      </motion.button>

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 bg-zinc-900/90 backdrop-blur-sm border-b border-zinc-800"
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToSection('home')}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
              className="text-xl font-bold text-orange-500 hover:text-orange-400 transition-colors"
            >
              MN
            </motion.button>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                  className="text-zinc-400 hover:text-orange-500 transition-colors text-sm uppercase tracking-wider"
                >
                  {item.name}
                </motion.button>
              ))}
              
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
                animate={{ 
                  boxShadow: ['0 0 0 0 rgba(249, 115, 22, 0.4)', '0 0 0 10px rgba(249, 115, 22, 0)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition-colors text-sm"
              >
                Resume
              </motion.a>
            </div>

            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
              className="md:hidden text-zinc-400 hover:text-orange-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Full Viewport Height */}
      <section id="home" className="h-screen flex items-center justify-center pt-16 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div 
            className="absolute top-20 left-10 w-64 h-64 bg-orange-500 rounded-full filter blur-3xl"
            animate={{ 
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"
            animate={{ 
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        <div className="text-center px-6 relative z-10">
          {/* First name with typing animation */}
          <div className="text-5xl sm:text-7xl md:text-8xl font-bold mb-4 flex items-center justify-center">
            <span className="relative">
              {displayFirstName}
              {showCursor1 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute -right-4 top-0 text-orange-500"
                >
                  |
                </motion.span>
              )}
            </span>
          </div>

          {/* Last name with typing animation */}
          <div className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 flex items-center justify-center">
            <span className="relative">
              <span className={firstNameComplete ? 'text-orange-500' : 'text-white'}>
                {displayLastName}
              </span>
              {showCursor2 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute -right-4 top-0 text-orange-500"
                >
                  |
                </motion.span>
              )}
            </span>
          </div>

          {/* Tagline - Only appears after ALL typing is complete */}
          <AnimatePresence>
            {!showCursor1 && !showCursor2 && displayFirstName === fullFirstName && displayLastName === fullLastName && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="text-zinc-400 text-lg max-w-3xl mx-auto px-4"
              >
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  Turning complex problems into elegant, scalable solutions
                </motion.span>
                <br />
                <motion.span 
                  className="text-orange-500/80 inline-block"
                  animate={{ 
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  Full-Stack Engineer • Java • React • Cloud
                </motion.span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Professional Summary with Elegant Reveal Animation - Full Viewport Height */}
      <section 
        ref={nutshellRef}
        className="h-screen flex items-center justify-center px-6 border-t border-zinc-800 relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto relative z-10 w-full">
          {/* Decorative animated circles */}
          <motion.div
            className="absolute -top-40 -left-40 w-80 h-80 border-2 border-orange-500/10 rounded-full"
            style={{
              scale: circle1Scale,
              opacity: circleOpacity,
            }}
          />
          <motion.div
            className="absolute -bottom-40 -right-40 w-96 h-96 border-2 border-blue-500/10 rounded-full"
            style={{
              scale: circle2Scale,
              opacity: circleOpacity,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-purple-500/5 rounded-full"
            style={{
              scale: circle3Scale,
              opacity: circleOpacity,
            }}
          />

          {/* Title with fade and slide */}
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 text-orange-500"
            style={{
              opacity: titleOpacity,
              y: titleY,
            }}
          >
            In a Nutshell
          </motion.h2>

          {/* Content with smooth reveal */}
          <motion.div
            className="relative"
            style={{
              opacity: contentOpacity,
              scale: contentScale,
              y: contentY,
            }}
          >
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl" />
            
            {/* Main content card */}
            <div className="relative bg-zinc-800/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-zinc-700 shadow-2xl">
              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              {/* Content text */}
              <motion.p className="text-zinc-300 text-lg md:text-xl leading-relaxed">
                <span className="text-orange-500 font-semibold text-xl md:text-2xl block mb-4">
                  Senior Software Engineer
                </span>
                with <span className="text-orange-500 font-semibold">4+ years</span> of experience designing and delivering scalable, high‑performance full‑stack applications and distributed systems. 
                
                <span className="block mt-4">
                  Expert in <span className="text-orange-500 font-semibold">Java</span>, <span className="text-orange-500 font-semibold">Spring Boot</span>, <span className="text-orange-500 font-semibold">Python</span>, <span className="text-orange-500 font-semibold">C#</span>, and <span className="text-orange-500 font-semibold">React</span> with deep expertise in cloud‑native architectures, microservices, and RESTful APIs.
                </span>
                
                <span className="block mt-4">
                  Proven track record of leading technical initiatives, mentoring engineering teams, and optimizing system performance. Passionate about building reliable, observable, and impactful software solutions across the entire technology stack.
                </span>
              </motion.p>

              {/* Tech stack tags */}
              <motion.div 
                className="flex flex-wrap gap-2 mt-6 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {['Java', 'Spring', 'React', 'AWS', 'Python', 'Docker'].map((tech, i) => (
                  <motion.span
                    key={i}
                    className="px-3 py-1 bg-zinc-700/50 text-orange-500 text-sm rounded-full border border-orange-500/20"
                    whileHover={{ scale: 1.1, backgroundColor: '#f97316', color: 'white' }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-orange-500/50 text-sm flex flex-col items-center"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.5, 0.5, 1]),
            }}
          >
            <span>Scroll to reveal</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-2"
            >
              ↓
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <motion.section 
        id="experience" 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
        className="py-20 px-6 bg-zinc-800/30 min-h-screen flex items-center"
      >
        <div className="max-w-4xl mx-auto w-full">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-12 text-orange-500 text-center"
          >
            Experience
          </motion.h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
                className="bg-zinc-800 rounded-lg p-6 hover:border-orange-500 border border-transparent transition-all cursor-pointer"
              >
                <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                  <div>
                    <motion.h3 
                      className="text-xl font-bold"
                      whileHover={{ x: 5 }}
                    >
                      {exp.role}
                    </motion.h3>
                    <p className="text-orange-500">{exp.company}</p>
                  </div>
                  <div className="text-zinc-400 text-sm mt-2 md:mt-0">
                    <p>{exp.period}</p>
                    <p>{exp.location}</p>
                  </div>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  {exp.bullets.map((bullet, i) => (
                    <motion.li 
                      key={i} 
                      className="text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Achievements Section */}
      <motion.section 
        id="achievements" 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
        className="py-20 px-6 min-h-screen flex items-center"
      >
        <div className="max-w-4xl mx-auto w-full">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-12 text-orange-500 text-center"
          >
            Key Achievements
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, x: 5 }}
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
                className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 hover:border-orange-500 transition-all cursor-pointer"
              >
                <motion.p 
                  className="text-zinc-300"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, delay: index * 0.2, repeat: Infinity }}
                >
                  ✓ {achievement}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        id="skills" 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 px-6 bg-zinc-800/30 min-h-screen flex items-center"
      >
        <div className="max-w-4xl mx-auto w-full">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-12 text-orange-500 text-center"
          >
            Technical Skills
          </motion.h2>

          <motion.div 
            variants={staggerChildren}
            className="flex flex-wrap gap-2 justify-center"
          >
            {skills.map((skill, i) => (
              <motion.span
                key={i}
                variants={fadeInUp}
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: '#f97316',
                  color: 'white',
                }}
                className="px-4 py-2 bg-zinc-800 rounded-full text-zinc-300 border border-zinc-700 cursor-default transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Certifications Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
        className="py-20 px-6 min-h-screen flex items-center"
      >
        <div className="max-w-4xl mx-auto w-full">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-12 text-orange-500 text-center"
          >
            Certifications
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 30px -10px rgba(249, 115, 22, 0.3)'
                }}
                className="bg-zinc-800 rounded-lg p-6 text-center border border-zinc-700 hover:border-orange-500 transition-all cursor-pointer"
              >
                <p className="text-zinc-300">{cert}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
        className="py-20 px-6 bg-zinc-800/30 min-h-screen flex items-center"
      >
        <div className="max-w-4xl mx-auto w-full">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-12 text-orange-500 text-center"
          >
            Education
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
              className="bg-zinc-800 rounded-lg p-6 hover:border-orange-500 border border-transparent transition-all cursor-pointer"
            >
              <h3 className="text-xl font-bold mb-2">Master of Science</h3>
              <p className="text-orange-500 mb-1">University of Central Missouri</p>
              <p className="text-zinc-400">Warrensburg, MO</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
              className="bg-zinc-800 rounded-lg p-6 hover:border-orange-500 border border-transparent transition-all cursor-pointer"
            >
              <h3 className="text-xl font-bold mb-2">Bachelor of Technology</h3>
              <p className="text-orange-500 mb-1">GITAM University</p>
              <p className="text-zinc-400">Andhra Pradesh, India</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="min-h-screen flex items-center justify-center px-6 py-20"
      >
        <div className="text-center max-w-2xl mx-auto">
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold mb-8 text-orange-500"
          >
            Get in Touch
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-zinc-400 text-lg mb-4"
          >
            narnemaheshbabu11@gmail.com
          </motion.p>
          <motion.p 
            variants={fadeInUp}
            className="text-zinc-500 mb-8"
          >
            +1-913-249-9980
          </motion.p>
          <motion.a
            href="mailto:narnemaheshbabu11@gmail.com"
            variants={scaleOnHover}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorHover(true)}
            onMouseLeave={() => setCursorHover(false)}
            animate={{ 
              boxShadow: ['0 0 0 0 rgba(249, 115, 22, 0.4)', '0 0 0 10px rgba(249, 115, 22, 0)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block px-8 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          >
            Send Email
          </motion.a>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-8 px-6 border-t border-zinc-800"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500">© 2026 Mahesh Babu Narne</p>
          <div className="flex gap-6">
            {['GitHub', 'LinkedIn'].map((social, i) => (
              <motion.a
                key={i}
                href="#"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
                whileHover={{ y: -2, color: '#f97316' }}
                className="text-zinc-500 hover:text-orange-500 transition-colors"
              >
                {social}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
}