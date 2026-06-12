'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';

/* ── Content ─────────────────────────────────── */

// Axis runs Jan 2021 → Dec 2026 (72 months). Positions are % of that range.
const SPANS = [
  {
    id: 'deloitte',
    company: 'Deloitte',
    role: 'Software Engineer',
    period: 'Mar 2021 — Nov 2023',
    duration: '2y 9m',
    location: 'Hyderabad, India',
    left: 2.8,
    width: 44.4,
    active: false,
    bullets: [
      'Built full-stack enterprise applications with React, Java, Spring Boot, and PostgreSQL, scaling to 100K+ concurrent users.',
      'Designed RESTful APIs and microservices in Python and C# for business-critical data.',
      'Shipped real-time Kafka pipelines processing millions of events daily.',
      'Containerized services with Docker and automated CI/CD with Jenkins and GitHub Actions — deployment time down 70%.',
      'Held the line on quality: JUnit, Mockito, and Jest with 85% coverage; mentored junior developers along the way.',
    ],
  },
  {
    id: 'apple',
    company: 'Apple',
    role: 'Senior Software Engineer',
    period: 'Jul 2024 — present',
    duration: 'ongoing',
    location: 'United States',
    left: 58.3,
    width: 32.6,
    active: true,
    bullets: [
      'Design and ship full-stack systems in React, TypeScript, Java, and Spring Boot serving millions of daily requests at sub-100ms latency.',
      'Architect event-driven microservices in Python and C#, integrated with Kafka for real-time analytics.',
      'Cut response times 45% through schema design, indexing, and query tuning in PostgreSQL and MongoDB.',
      'Built monitoring and alerting on Prometheus and Grafana — mean time to detection down 60%.',
      'Lead code reviews, set coding standards, and mentor engineers; on-call for systems holding 99.99% availability.',
    ],
  },
];

const YEARS = [2021, 2022, 2023, 2024, 2025, 2026];

const LOG_LINES = [
  'p99 latency 92ms — within budget',
  'uptime 99.99% over trailing 365d',
  'mttd −60% after alerting rewrite',
  'api response −65% via redis caching',
  'deploy time −70% — ci/cd overhaul',
  '0 paged engineers tonight. good.',
];

const METRICS = [
  { value: '200K+', label: 'daily transactions on a platform architected end to end' },
  { value: '99.99%', label: 'production uptime, held through on-call rotations' },
  { value: ['−65', '%'], label: 'API response time, after Redis caching and query work' },
  { value: ['−60', '%'], label: 'mean time to detection, via tracing and alerting' },
  { value: ['−30', '%'], label: 'infrastructure cost from the same optimization pass' },
  { value: '5 → mid', label: 'junior engineers mentored into mid-level roles' },
];

const STACK = [
  { layer: 'interface', items: 'React · Next.js · TypeScript · Redux · Tailwind CSS' },
  { layer: 'services', items: 'Java · Spring Boot · Python · C# / .NET · Node.js · Go · GraphQL' },
  { layer: 'data', items: 'PostgreSQL · MongoDB · Redis · Cassandra · MySQL' },
  { layer: 'messaging', items: 'Kafka · RabbitMQ · event-driven architecture' },
  { layer: 'infrastructure', items: 'AWS · Azure · Docker · Kubernetes · Terraform · GitHub Actions' },
  { layer: 'observability', items: 'Prometheus · Grafana · ELK · distributed tracing' },
  { layer: 'quality', items: 'JUnit · Mockito · Jest · React Testing Library · Selenium' },
];

const CERTS = [
  { name: 'AWS Certified Solutions Architect', tag: 'associate' },
  { name: 'Microsoft Azure Developer', tag: 'associate' },
  { name: 'Oracle Java SE 11 Developer', tag: 'professional' },
  { name: 'Certified Kubernetes Administrator', tag: 'cka' },
  { name: 'Meta Front-End Developer', tag: 'professional cert' },
];

const EDUCATION = [
  { name: 'M.S. — University of Central Missouri', tag: 'warrensburg, mo' },
  { name: 'B.Tech — GITAM University', tag: 'andhra pradesh, in' },
];

/* ── Small helpers ───────────────────────────── */

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function Section({ id, label, children }) {
  return (
    <section id={id} className="section">
      <div className="shell section-grid">
        <p className="section-label">{label}</p>
        <div>{children}</div>
      </div>
    </section>
  );
}

/* ── Page ────────────────────────────────────── */

export default function Home() {
  const [openSpan, setOpenSpan] = useState('apple');
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setLogIndex((i) => (i + 1) % LOG_LINES.length);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const toggleSpan = (id) => setOpenSpan((cur) => (cur === id ? null : id));

  return (
    <MotionConfig reducedMotion="user">
      {/* Nav */}
      <nav className="nav">
        <div className="shell nav-inner">
          <a href="#top" className="nav-link mono" style={{ color: 'var(--ink)' }}>
            m.narne
          </a>
          <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
            <a href="#work" className="nav-link">work</a>
            <a href="#stack" className="nav-link">stack</a>
            <a href="#contact" className="nav-link">contact</a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link nav-link--cta"
            >
              resume ↗
            </a>
          </div>
        </div>
      </nav>

      <main id="top">
        {/* Hero */}
        <header className="shell" style={{ padding: '170px 24px 96px' }}>
          <Reveal>
            <p className="section-label" style={{ marginBottom: 28 }}>
              mahesh babu narne · software engineer
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              className="display"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.4rem)', maxWidth: '17ch' }}
            >
              I build distributed systems that stay <em>fast, observable,</em> and quiet at 3&nbsp;a.m.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="prose-lg muted" style={{ marginTop: 28 }}>
              Four-plus years across Java, Spring Boot, Python, and React — currently a
              Senior Software Engineer at Apple, where the systems I design handle
              millions of requests a day without raising their voice.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="logtail" style={{ marginTop: 36 }} aria-live="polite">
              <span className="prompt">tail&nbsp;-f&nbsp;prod&nbsp;›</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={logIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  {LOG_LINES[logIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="caret" aria-hidden="true" />
            </div>
          </Reveal>
        </header>

        {/* Work — career rendered as a distributed trace */}
        <Section id="work" label="trace · work">
          <Reveal>
            <div className="trace">
              <div className="trace-meta">
                <span>trace_id: career · 2 spans · 0 errors</span>
                <span>2021 → now</span>
              </div>
              <div className="trace-track">
                {SPANS.map((s, i) => (
                  <button
                    key={s.id}
                    className="trace-span"
                    style={{ left: `${s.left}%`, width: `${s.width}%`, top: 22 }}
                    onClick={() => toggleSpan(s.id)}
                    aria-expanded={openSpan === s.id}
                    aria-controls={`detail-${s.id}`}
                    title={`${s.company} — ${s.role}`}
                  >
                    <span className="span-label">
                      {s.company.toLowerCase()} · {s.duration}
                    </span>
                    {s.active && <span className="span-pulse" aria-hidden="true" />}
                  </button>
                ))}
                <div className="trace-axis">
                  {YEARS.map((y) => (
                    <span
                      key={y}
                      className="trace-tick"
                      style={{ left: `${((y - 2021) * 100) / 6}%` }}
                    >
                      {y}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div style={{ marginTop: 36 }}>
            {[...SPANS].reverse().map((s) => (
              <div key={s.id} className="span-row">
                <button
                  className="span-row-head"
                  onClick={() => toggleSpan(s.id)}
                  aria-expanded={openSpan === s.id}
                  aria-controls={`detail-${s.id}`}
                >
                  <span className="role">
                    {s.role} <span className="company">@ {s.company}</span>
                  </span>
                  <span className="period">
                    {s.period} · {s.location}
                  </span>
                  <span className="toggle">{openSpan === s.id ? '−' : '+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {openSpan === s.id && (
                    <motion.div
                      id={`detail-${s.id}`}
                      className="span-detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <ul>
                        {s.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Section>

        {/* Metrics */}
        <Section label="metrics · impact">
          <Reveal>
            <div className="metrics">
              {METRICS.map((m, i) => (
                <div key={i} className="metric">
                  <p className="value">
                    {Array.isArray(m.value) ? (
                      <>
                        {m.value[0]}
                        <span>{m.value[1]}</span>
                      </>
                    ) : (
                      m.value
                    )}
                  </p>
                  <p className="label">{m.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* Stack */}
        <Section id="stack" label="stack · by layer">
          <Reveal>
            <div className="stack">
              {STACK.map((row) => (
                <div key={row.layer} className="stack-row">
                  <span className="stack-layer">{row.layer}</span>
                  <p className="stack-items">{row.items}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* Credentials */}
        <Section label="credentials">
          <Reveal>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 40,
              }}
            >
              <div>
                <p className="mono muted" style={{ fontSize: 12, marginBottom: 14 }}>
                  certifications
                </p>
                <div className="cred-list">
                  {CERTS.map((c) => (
                    <div key={c.name} className="cred-item">
                      <span>{c.name}</span>
                      <span className="tag">{c.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mono muted" style={{ fontSize: 12, marginBottom: 14 }}>
                  education
                </p>
                <div className="cred-list">
                  {EDUCATION.map((e) => (
                    <div key={e.name} className="cred-item">
                      <span>{e.name}</span>
                      <span className="tag">{e.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* Contact */}
        <Section id="contact" label="contact · open">
          <Reveal>
            <h2
              className="display"
              style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', maxWidth: '22ch' }}
            >
              Building something that needs to <em>scale without drama?</em> Let&rsquo;s talk.
            </h2>
            <div
              style={{
                marginTop: 36,
                display: 'flex',
                gap: 28,
                flexWrap: 'wrap',
                alignItems: 'baseline',
              }}
            >
              <a href="mailto:narnemaheshbabu11@gmail.com" className="contact-link">
                narnemaheshbabu11@gmail.com
              </a>
              <a href="tel:+19132499980" className="contact-link">
                +1 913 249 9980
              </a>
            </div>
            <div style={{ marginTop: 20, display: 'flex', gap: 28 }}>
              <a href="#" className="contact-link">github ↗</a>
              <a href="#" className="contact-link">linkedin ↗</a>
            </div>
          </Reveal>
        </Section>

        {/* Footer */}
        <footer className="shell footer">
          <span>© 2026 mahesh babu narne</span>
          <span>status: all systems nominal</span>
        </footer>
      </main>
    </MotionConfig>
  );
}