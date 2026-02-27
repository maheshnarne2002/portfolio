'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [cursorHover, setCursorHover] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Typing animation states
  const [displayFirstName, setDisplayFirstName] = useState('');
  const [displayLastName, setDisplayLastName] = useState('');
  const [firstNameComplete, setFirstNameComplete] = useState(false);
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);

  const fullFirstName = 'MAHESH BABU';
  const fullLastName = 'NARNE';

  useEffect(() => {
    // Typing animation for first name
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
        
        // Start typing last name after a short delay
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

    return () => {
      clearInterval(typeFirstName);
    };
  }, []);

  useEffect(() => {
    // Mouse move for custom cursor with trail
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create trail effect with delay
      setTimeout(() => {
        setTrailPosition({ x: e.clientX, y: e.clientY });
      }, 50);
    };
    
    // Handle scroll to show/hide back to top button
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    // Only enable custom cursor on desktop
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

  // Animation variants
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

  // Experience data from resume
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

  // Achievements from resume
  const achievements = [
    'Architected and deployed a full-stack e-commerce platform handling 200K+ daily transactions with 99.99% uptime and sub-100ms response times',
    'Optimized database queries and introduced Redis caching, improving API response times by 65% and reducing infrastructure costs by 30%',
    'Reduced incident response time by 60% through comprehensive monitoring, distributed tracing, and automated alerting',
    'Established engineering best practices for full-stack development adopted across multiple teams',
    'Mentored 5 junior engineers who advanced to mid-level roles through structured guidance',
    'Delivered 3 major greenfield projects from concept to production within 6-month timelines'
  ];

  // Skills from resume
  const skills = [
    // Programming Languages
    'Java', 'Python', 'C#', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'Go',
    // Frontend
    'React', 'Next.js', 'Redux', 'Tailwind CSS', 'HTML5', 'CSS3', 'Material-UI',
    // Backend
    'Spring Boot', '.NET Core', 'Node.js', 'Express', 'Django', 'GraphQL',
    // Cloud
    'AWS (EC2, S3, Lambda)', 'Azure', 'OCI', 'Cloud-Native Architecture',
    // Databases
    'PostgreSQL', 'MySQL', 'MongoDB', 'Cassandra', 'Redis',
    // Messaging
    'Kafka', 'RabbitMQ', 'ActiveMQ', 'Event-Driven Architecture',
    // DevOps
    'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Terraform',
    // Monitoring
    'Prometheus', 'Grafana', 'ELK Stack', 'Distributed Tracing',
    // Testing
    'JUnit', 'Mockito', 'Jest', 'React Testing Library', 'Selenium'
  ];

  // Certifications from resume
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
      
      {/* Custom Trailing Cursor */}
      {showCursor && (
        <>
          {/* Main cursor dot */}
          <motion.div 
            className={`cursor-dot ${cursorHover ? 'hover' : ''}`}
            animate={{
              x: mousePosition.x - 4,
              y: mousePosition.y - 4,
            }}
            transition={{ type: 'spring', stiffness: 1000, damping: 50 }}
          />
          
          {/* Trailing cursor effect */}
          <motion.div 
            className={`trailing-cursor ${cursorHover ? 'hover' : ''}`}
            animate={{
              x: trailPosition.x - 20,
              y: trailPosition.y - 20,
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
        {/* Arrow up icon */}
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
        
        {/* Tooltip on hover */}
        <span className="absolute -top-10 right-0 bg-zinc-800 text-white text-sm py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-zinc-700">
          Back to Top
        </span>
      </motion.button>

      {/* Simple Navbar with animation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 bg-zinc-900/90 backdrop-blur-sm border-b border-zinc-800"
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with hover animation */}
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

            {/* Desktop Navigation */}
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
              
              {/* Resume Button with pulse animation */}
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

            {/* Mobile Menu Button */}
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

      {/* Hero Section with typing animation */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
        {/* Animated background circles */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
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

          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="text-zinc-400 text-lg max-w-3xl mx-auto px-4"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Turning complex problems into elegant, scalable solutions
            </motion.span>
            <br />
            <motion.span 
              className="text-orange-500/80 inline-block"
              animate={{ 
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Full-Stack Engineer • Java • React • Cloud
            </motion.span>
          </motion.p>
        </div>
      </section>

      {/* Professional Summary */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="py-20 px-6 border-t border-zinc-800"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-8 text-orange-500"
          >
            In a Nutshell
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-zinc-300 text-lg leading-relaxed"
          >
            Software Engineer with 4+ years of experience designing and delivering scalable, high‑performance 
            full‑stack applications and distributed systems. Expert in Java, Spring Boot, Python, C#, and React with 
            deep expertise in cloud‑native architectures, microservices, and RESTful APIs. Proven track record of 
            leading technical initiatives, mentoring engineering teams, and optimizing system performance. Passionate 
            about building reliable, observable, and impactful software solutions across the entire technology stack.
          </motion.p>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section 
        id="experience" 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
        className="py-20 px-6 bg-zinc-800/30"
      >
        <div className="max-w-4xl mx-auto">
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
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
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
        className="py-20 px-6"
      >
        <div className="max-w-4xl mx-auto">
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
        className="py-20 px-6 bg-zinc-800/30"
      >
        <div className="max-w-4xl mx-auto">
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
                  transition: { duration: 0.2 }
                }}
                className="px-4 py-2 bg-zinc-800 rounded-full text-zinc-300 border border-zinc-700 cursor-default"
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
        className="py-20 px-6"
      >
        <div className="max-w-4xl mx-auto">
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
                  rotateY: 5,
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
        className="py-20 px-6 bg-zinc-800/30"
      >
        <div className="max-w-4xl mx-auto">
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