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
    project: 'SmartHealth360 · multi-tenant healthcare platform',
    left: 2.8,
    width: 44.4,
    active: false,
    bullets: [
      'Built Java and Spring Boot services for SmartHealth360, a multi-tenant healthcare platform on AWS, where data correctness and compliance shaped architecture from day one.',
      'Designed REST APIs and data models for patient facing and clinical workflows, translating requirements with product owners and clinical stakeholders.',
      'Developed Kafka event pipelines processing millions of clinical and operational events per day, with partition and consumer group design that held ordering under variable load.',
      'Tuned PostgreSQL and MongoDB schemas plus Redis caching for multi tenant workloads, keeping query performance predictable as data and concurrency scaled.',
      'Built React components for clinical management workflows across the full stack correct for real healthcare scenarios, not just acceptance criteria.',
      'Traced on call incidents through distributed logs and metrics to root cause, cutting recurring incidents 40% over a year.',
      'Coordinated 10+ quarterly releases in Agile squads learning that aligning on interface contracts before implementation mattered more than the execution itself.',
    ],
  },
  {
    id: 'apple',
    company: 'Apple',
    role: 'Senior Software Engineer',
    period: 'Jul 2024 — present',
    duration: 'ongoing',
    location: 'United States',
    project: 'consumer communications platform · email, SMS, push',
    left: 58.3,
    width: 32.6,
    active: true,
    bullets: [
      'Build and operate high scale Java backend services for a consumer communications platform delivering email, SMS, and push to millions of daily users owned end to end through deployment, monitoring, and on-call.',
      'Design REST and GraphQL APIs consumed by multiple product teams, investing in schema stability and backward compatibility so downstream teams ship independently.',
      'Build React and TypeScript interfaces for internal tooling and consumer facing notification preferences, working closely with product and design.',
      'Develop Kafka event pipelines for real time delivery and engagement tracking, with partition strategy and consumer group isolation that keeps latency predictable under peak load.',
      'Integrate ML outputs and LLM powered features into production Java services, handling inference latency and partial failures gracefully without degrading the core experience.',
      'Built observability on Prometheus, Grafana, and OpenTelemetry structured around SLOs and real failure categories actionable signals, not metric noise.',
      'Found and fixed a message-routing bottleneck that cut p99 latency 35% and improved throughput 50%, after profiling revealed the actual slow path.',
      'Mentored two engineers through complex platform features, helping them reason through failure modes before production did.',
    ],
  },
];

const YEARS = [2021, 2022, 2023, 2024, 2025, 2026];

const LOG_LINES = [
  'p99 latency −35% after routing fix',
  'throughput +50% on message path',
  'mttd −65% — slo-driven alerting',
  'mttr −45% — runbooks that match reality',
  'on-call response −60% this quarter',
  '0 paged engineers tonight. good.',
];

const METRICS = [
  { value: ['−35', '%'], label: 'p99 latency on the message-routing path, after profiling the real slow path' },
  { value: ['+50', '%'], label: 'throughput on that same path once the bottleneck was gone' },
  { value: ['−65', '%'], label: 'mean time to detection, via SLO driven alerting on real failure categories' },
  { value: ['−45', '%'], label: 'mean time to resolution on a production distributed system' },
  { value: ['−60', '%'], label: 'on call response time, from runbooks grounded in how the system actually fails' },
  { value: '3 teams', label: 'adopted the backend platform within two quarters no structural rewrites' },
];

const STACK = [
  { layer: 'interface', items: 'React · Angular · TypeScript · component architecture' },
  { layer: 'services', items: 'Java · Spring Boot · Python · Kotlin · C# · REST · GraphQL · gRPC' },
  { layer: 'data', items: 'PostgreSQL · MySQL · MongoDB · DynamoDB · Redis · Elasticsearch' },
  { layer: 'messaging', items: 'Apache Kafka · SQS · event-driven pipelines · async processing' },
  { layer: 'infrastructure', items: 'AWS · Azure · GCP · Kubernetes · Docker · Terraform · CI/CD' },
  { layer: 'observability', items: 'Prometheus · Grafana · OpenTelemetry · distributed tracing · SLOs' },
  { layer: 'ai / automation', items: 'LLM integration · agentic workflows · ML feature integration · Claude Code' },
];

const CERTS = [
  { name: 'Microsoft Azure Solutions Architect', tag: 'expert' },
  { name: 'Microsoft DevOps Engineer', tag: 'expert' },
  { name: 'AWS Certified Solutions Architect', tag: 'associate' },
  { name: 'Certified Kubernetes Administrator', tag: 'cka' },
];

const EDUCATION = [
  { name: 'M.S. — University of Central Missouri', tag: 'warrensburg, mo' },
  { name: 'B.Tech — GITAM University', tag: 'andhra pradesh, india' },
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
              mahesh babu narne · senior software engineer · overland park, ks
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
              Four-plus years building scalable distributed backend systems in Java,
              Python, and TypeScript across communications and healthcare platforms. Currently a
              Senior Software Engineer at Apple, where the platform I work on delivers
              email, SMS, and push to millions of daily users without raising its voice.
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
                    <br />
                    <span
                      className="mono"
                      style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 400 }}
                    >
                      {s.project}
                    </span>
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
            </div>
            <div style={{ marginTop: 20, display: 'flex', gap: 28 }}>
              <a
                href="https://www.linkedin.com/in/maheshswe"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                linkedin ↗
              </a>
            </div>
            <p className="mono muted" style={{ marginTop: 24, fontSize: 13 }}>
              open to relocation · listening on :new-roles (actively interveiwing)
            </p>
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