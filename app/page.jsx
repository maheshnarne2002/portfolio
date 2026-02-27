'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

/* ═══════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════ */
function CustomCursor() {
  const ring = useRef(null);
  const dot  = useRef(null);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth <= 768) return;
    let rx = 0, ry = 0, tx = 0, ty = 0, raf;
    const onMove = e => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener('mousemove', onMove);
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      rx = lerp(rx, tx, 0.13); ry = lerp(ry, ty, 0.13);
      if (ring.current) { ring.current.style.left = rx + 'px'; ring.current.style.top = ry + 'px'; }
      if (dot.current)  { dot.current.style.left  = tx + 'px'; dot.current.style.top  = ty + 'px'; }
      raf = requestAnimationFrame(tick);
    };
    tick();
    const els = () => document.querySelectorAll('a,button,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => setHov(true));
      el.addEventListener('mouseleave', () => setHov(false));
    });
    els(); const obs = new MutationObserver(els);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); obs.disconnect(); };
  }, []);

  return (
    <>
      <div ref={ring} className={`cursor-ring ${hov ? 'hovering' : ''}`} />
      <div ref={dot}  className="cursor-dot" />
    </>
  );
}

/* ═══════════════════════════════════════
   LOADING SCREEN
═══════════════════════════════════════ */
function LoadingScreen({ onDone }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 5 + 1;
      if (v >= 100) {
        v = 100; clearInterval(id);
        setTimeout(() => { setDone(true); setTimeout(onDone, 600); }, 600);
      }
      setPct(Math.min(Math.round(v), 100));
    }, 40);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: 0.55, ease: [0.76,0,0.24,1] }}
          style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#050914', overflow: 'hidden' }}>
          {/* Grid bg */}
          <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.25 }} />
          {/* Ambient glow */}
          <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(56,189,248,0.05),transparent 70%)', pointerEvents: 'none' }} />
          {/* Corner accents */}
          {['top:20px;left:20px;border-top:1px solid;border-left:1px solid','top:20px;right:20px;border-top:1px solid;border-right:1px solid','bottom:20px;left:20px;border-bottom:1px solid;border-left:1px solid','bottom:20px;right:20px;border-bottom:1px solid;border-right:1px solid'].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}
              style={{ position: 'absolute', width: 28, height: 28, borderColor: 'rgba(56,189,248,0.3)', ...Object.fromEntries(s.split(';').map(x => x.split(':'))) }} />
          ))}

          <div style={{ textAlign: 'center', position: 'relative' }}>
            {/* Logo mark */}
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, type: 'spring' }}
              style={{ width: 72, height: 72, borderRadius: 16, background: 'linear-gradient(135deg,#38bdf8,#818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 26, color: '#050914', boxShadow: '0 0 40px rgba(56,189,248,0.25), 0 0 80px rgba(56,189,248,0.1)', position: 'relative' }}>
              MN
              <motion.div style={{ position: 'absolute', inset: -4, borderRadius: 20, border: '1px solid rgba(56,189,248,0.2)' }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }} />
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(22px,4vw,32px)', color: '#e2e8f0', letterSpacing: '-0.01em', marginBottom: 6 }}>
              MAHESH BABU NARNE
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(56,189,248,0.6)', marginBottom: 40 }}>
              Senior Software Engineer
            </motion.p>

            {/* Progress */}
            <div style={{ width: 260, margin: '0 auto' }}>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 1, overflow: 'hidden', marginBottom: 10 }}>
                <motion.div style={{ height: '100%', borderRadius: 1, background: 'linear-gradient(90deg,#38bdf8,#818cf8)', width: `${pct}%`, boxShadow: '0 0 16px rgba(56,189,248,0.7)', transition: 'width 0.05s linear' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(56,189,248,0.4)' }}>
                  {pct === 100 ? 'Ready' : 'Loading'}
                </span>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(56,189,248,0.6)' }}>{pct}%</span>
              </div>
            </div>

            <AnimatePresence>
              {pct === 100 && (
                <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                  style={{ marginTop: 20, fontSize: 11, letterSpacing: '0.2em', color: 'rgba(129,140,248,0.6)', textTransform: 'uppercase' }}>
                  ✦ Welcome ✦
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          {/* bottom line */}
          <motion.div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(56,189,248,0.4),transparent)' }}
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════
   CONSTELLATION BG
═══════════════════════════════════════ */
function StarsBg() {
  const pts = Array.from({ length: 22 }, () => ({ x: Math.random()*100, y: Math.random()*100, r: 0.8+Math.random()*1.5, d: 2+Math.random()*3, dly: Math.random()*2 }));
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
        {pts.map((p, i) => {
          const p2 = pts[(i+1) % pts.length];
          const dist = Math.hypot(p.x-p2.x, p.y-p2.y);
          return (
            <g key={i}>
              {dist < 38 && (
                <motion.line x1={`${p.x}%`} y1={`${p.y}%`} x2={`${p2.x}%`} y2={`${p2.y}%`}
                  stroke="#38bdf8" strokeWidth="0.4"
                  animate={{ opacity: [0.15, 0.5, 0.15] }} transition={{ duration: p.d+1, delay: p.dly, repeat: Infinity }} />
              )}
              <motion.circle cx={`${p.x}%`} cy={`${p.y}%`} r={p.r} fill={i%3===0?'#818cf8':'#38bdf8'}
                animate={{ opacity: [0.2, 1, 0.2], r:[p.r, p.r*1.6, p.r] }} transition={{ duration: p.d, delay: p.dly, repeat: Infinity }} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════
   STICKER: ASTRONAUT
═══════════════════════════════════════ */
function StickerAstronaut({ show }) {
  return (
    <motion.div className="pointer-events-none select-none"
      initial={{ opacity: 0, scale: 0, rotate: -20 }}
      animate={show ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ delay: 0.5, duration: 0.7, type: 'spring', bounce: 0.4 }}
      style={{ position: 'absolute', top: 90, right: '5%', width: 130, height: 130, zIndex: 10 }}>
      <motion.div animate={{ y: [0,-14,0], rotate:[0,3,-3,0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'relative', width: '100%', height: '100%', filter: 'drop-shadow(0 0 12px rgba(56,189,248,0.3))' }}>
        {/* Body */}
        <div style={{ position:'absolute', bottom:14, left:'50%', transform:'translateX(-50%)', width:48, height:62, background:'linear-gradient(160deg,#e2e8f0,#94a3b8)', border:'2px solid #cbd5e1', borderRadius:12 }} />
        {/* Helmet */}
        <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:54, height:54, borderRadius:'50%', background:'linear-gradient(145deg,#e2e8f0,#cbd5e1)', border:'2px solid #94a3b8', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:7, borderRadius:'50%', background:'linear-gradient(135deg,#0c4a6e,#1e1b4b)', overflow:'hidden' }}>
            <div style={{ position:'absolute', bottom:3, right:3, width:12, height:12, borderRadius:'50%', background:'linear-gradient(135deg,#38bdf8,#0284c7)', opacity:0.8 }} />
            {[...Array(4)].map((_,i)=>(
              <motion.div key={i} style={{ position:'absolute', width:2, height:2, borderRadius:'50%', background:'#fff', left:`${14+i*18}%`, top:`${25+(i%2)*25}%` }}
                animate={{ opacity:[0.2,1,0.2] }} transition={{ duration:1.5, delay:i*0.3, repeat:Infinity }} />
            ))}
            <div style={{ position:'absolute', top:4, left:4, width:12, height:8, borderRadius:6, background:'rgba(255,255,255,0.15)', transform:'rotate(12deg)' }} />
          </div>
        </div>
        {/* Arms */}
        {[-1,1].map((d,i)=>(
          <motion.div key={i} style={{ position:'absolute', top:56, [d<0?'left':'right']:-8, width:12, height:30, borderRadius:8, background:'linear-gradient(#cbd5e1,#94a3b8)' }}
            animate={{ rotate:[0,d*14,0] }} transition={{ duration:3, repeat:Infinity, delay:i*0.5 }} />
        ))}
        {/* Flames */}
        {[-5,5].map((x,i)=>(
          <motion.div key={i} style={{ position:'absolute', bottom:-8, left:`calc(50% + ${x}px)`, width:7, borderRadius:4, background:'linear-gradient(0deg,transparent,#38bdf8,#818cf8)' }}
            animate={{ height:[8,20,8], opacity:[0.5,1,0.5] }} transition={{ duration:0.5, repeat:Infinity, delay:i*0.2 }} />
        ))}
        {/* Tether */}
        <motion.div style={{ position:'absolute', top:16, right:-2, width:1, height:36, background:'rgba(56,189,248,0.35)', transformOrigin:'top' }}
          animate={{ rotate:[0,12,-6,0] }} transition={{ duration:5, repeat:Infinity }} />
        {/* Orbit dots */}
        {[...Array(3)].map((_,i)=>(
          <motion.div key={i} style={{ position:'absolute', top:'50%', left:'50%', marginTop:-2, marginLeft:-2, width:4, height:4, borderRadius:'50%', background:i%2===0?'#38bdf8':'#818cf8' }}
            animate={{ rotate:360 }} transition={{ duration:4+i*1.5, repeat:Infinity, ease:'linear' }}>
            <div style={{ position:'absolute', left:28+i*10, top:0, width:4, height:4, borderRadius:'50%', background:'inherit', opacity:0.5 }} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   STICKER: ROCKET
═══════════════════════════════════════ */
function StickerRocket() {
  return (
    <motion.div className="pointer-events-none select-none"
      initial={{ opacity:0, scale:0, y:30 }} whileInView={{ opacity:1, scale:1, y:0 }}
      transition={{ duration:0.7, type:'spring' }} viewport={{ once:true }}
      style={{ position:'absolute', top: -10, right: -10, width:110, height:110, zIndex:10 }}>
      <motion.div animate={{ y:[0,-16,0] }} transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
        style={{ filter:'drop-shadow(0 0 10px rgba(56,189,248,0.4))', position:'relative' }}>
        {[...Array(5)].map((_,i)=>(
          <motion.div key={i} style={{ position:'absolute', width:2, height:2, borderRadius:'50%', background:'#fff', left:`${8+i*18}%`, top:`${5+i*12}%` }}
            animate={{ opacity:[0.1,0.8,0.1] }} transition={{ duration:2, delay:i*0.4, repeat:Infinity }} />
        ))}
        <div style={{ position:'relative' }}>
          <div style={{ width:28, height:40, background:'linear-gradient(180deg,#38bdf8,#0284c7)', borderRadius:'50% 50% 0 0', margin:'0 auto' }} />
          <div style={{ width:28, height:36, background:'linear-gradient(180deg,#e2e8f0,#94a3b8)', position:'relative', margin:'0 auto' }}>
            <div style={{ position:'absolute', top:6, left:4, width:20, height:24, borderRadius:3, background:'linear-gradient(135deg,rgba(56,189,248,0.25),rgba(129,140,248,0.25))', border:'1px solid rgba(56,189,248,0.3)' }} />
          </div>
          <div style={{ display:'flex', justifyContent:'center' }}>
            <div style={{ width:0, height:0, borderRight:'8px solid #0ea5e9', borderTop:'14px solid transparent' }} />
            <div style={{ width:28, height:14, background:'#0284c7' }} />
            <div style={{ width:0, height:0, borderLeft:'8px solid #0ea5e9', borderTop:'14px solid transparent' }} />
          </div>
          {[-5,0,5].map((x,i)=>(
            <motion.div key={i} style={{ position:'absolute', bottom:-12, left:`calc(50% + ${x}px)`, width:7, borderRadius:4, background:`linear-gradient(0deg,transparent,${i===1?'#38bdf8':'#818cf8'})`, transform:'translateX(-50%)' }}
              animate={{ height:[10,22,10], opacity:[0.6,1,0.6] }} transition={{ duration:0.45, repeat:Infinity, delay:i*0.12 }} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   STICKER: LAPTOP
═══════════════════════════════════════ */
function StickerLaptop() {
  const [li, setLi] = useState(0);
  const lines = [
    { t:'const scale = () => {', c:'#38bdf8' },
    { t:'  ship(feature);', c:'#818cf8' },
    { t:'  return 99.99%;', c:'#4ade80' },
    { t:'// ∞ uptime ✓', c:'#64748b' },
  ];
  useEffect(() => { const id = setInterval(() => setLi(v => (v+1)%4), 1100); return () => clearInterval(id); }, []);
  return (
    <motion.div className="pointer-events-none select-none"
      initial={{ x:-70, opacity:0 }} whileInView={{ x:0, opacity:1 }} transition={{ duration:0.8, type:'spring' }} viewport={{ once:true }}
      style={{ position:'absolute', left:'-5%', top:'50%', transform:'translateY(-50%)', width:150, height:150, zIndex:10 }}>
      <motion.div animate={{ y:[0,-10,0] }} transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
        style={{ filter:'drop-shadow(0 0 10px rgba(56,189,248,0.25))' }}>
        <div style={{ width:148, height:92, background:'#0d1526', border:'2px solid rgba(56,189,248,0.3)', borderRadius:'6px 6px 0 0', overflow:'hidden', position:'relative' }}>
          <motion.div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 0%,rgba(56,189,248,0.07),transparent 70%)' }}
            animate={{ opacity:[0.5,1,0.5] }} transition={{ duration:3, repeat:Infinity }} />
          <div style={{ padding:'10px 12px', fontFamily:'monospace', fontSize:8.5 }}>
            {lines.map((l,i) => (
              <motion.div key={i} style={{ color:l.c, marginBottom:5, whiteSpace:'nowrap' }}
                animate={{ opacity: i <= li ? 1 : 0.2 }} transition={{ duration:0.3 }}>
                {l.t}
              </motion.div>
            ))}
            <motion.span style={{ display:'inline-block', width:5, height:9, background:'#38bdf8', borderRadius:1 }}
              animate={{ opacity:[1,0,1] }} transition={{ duration:1, repeat:Infinity }} />
          </div>
          <div style={{ position:'absolute', top:6, right:8, display:'flex', gap:3 }}>
            {['#ff5f57','#febc2e','#28c840'].map((c,i) => (
              <div key={i} style={{ width:5, height:5, borderRadius:'50%', background:c }} />
            ))}
          </div>
        </div>
        <div style={{ width:148, height:3, background:'linear-gradient(90deg,#1e293b,#475569,#1e293b)' }} />
        <div style={{ width:148, height:14, background:'linear-gradient(180deg,#1e293b,#0f172a)', borderRadius:'0 0 6px 6px', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ width:40, height:5, background:'#0f172a', borderRadius:4, border:'1px solid #1e293b' }} />
        </div>
        {[{ l:'🍎 Apple', ac:'#38bdf8', x:-18, y:-20 },{ l:'Deloitte', ac:'#818cf8', x:90, y:-20 }].map((t,i)=>(
          <motion.div key={i} style={{ position:'absolute', top:t.y, left:t.x, background:`${t.ac}18`, border:`1px solid ${t.ac}50`, borderRadius:20, padding:'2px 8px', fontSize:8, fontWeight:700, color:'#e2e8f0', whiteSpace:'nowrap', backdropFilter:'blur(4px)' }}
            animate={{ y:[0,-6,0] }} transition={{ duration:3, repeat:Infinity, delay:i*0.5 }}>
            {t.l}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   STICKER: TROPHY
═══════════════════════════════════════ */
function StickerTrophy() {
  const conf = Array.from({length:14},(_,i) => ({ c:['#38bdf8','#818cf8','#4ade80','#fb923c','#f472b6'][i%5], x:6+(i/14)*88, d:i*0.18, s:4+Math.random()*4 }));
  return (
    <motion.div className="pointer-events-none select-none"
      initial={{ x:70, opacity:0 }} whileInView={{ x:0, opacity:1 }} transition={{ duration:0.8, type:'spring' }} viewport={{ once:true }}
      style={{ position:'absolute', right:'-5%', top:'50%', transform:'translateY(-50%)', width:150, height:150, zIndex:10 }}>
      <div style={{ position:'relative', width:'100%', height:'100%' }}>
        <motion.div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'radial-gradient(circle,rgba(56,189,248,0.07),transparent 70%)' }}
          animate={{ scale:[1,1.5,1] }} transition={{ duration:3, repeat:Infinity }} />
        <motion.div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }}
          animate={{ y:[0,-10,0], rotate:[0,2,-2,0] }} transition={{ duration:4, repeat:Infinity }}>
          <div style={{ width:60, height:60, background:'linear-gradient(160deg,#38bdf8,#0284c7)', borderRadius:'50% 50% 18% 18%', position:'relative', overflow:'hidden', boxShadow:'0 6px 24px rgba(56,189,248,0.3)' }}>
            <motion.div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)' }}
              animate={{ x:['-100%','100%'] }} transition={{ duration:2, repeat:Infinity, repeatDelay:1.5 }} />
            <div style={{ position:'absolute', top:6, left:6, width:16, height:20, borderRadius:'50%', background:'rgba(255,255,255,0.15)' }} />
          </div>
          <div style={{ position:'absolute', top:12, left:-14, width:14, height:24, border:'4px solid rgba(56,189,248,0.5)', borderRight:'none', borderRadius:'10px 0 0 10px' }} />
          <div style={{ position:'absolute', top:12, right:-14, width:14, height:24, border:'4px solid rgba(56,189,248,0.5)', borderLeft:'none', borderRadius:'0 10px 10px 0' }} />
          <div style={{ width:12, height:18, background:'linear-gradient(180deg,#0284c7,#0369a1)', margin:'0 auto' }} />
          <div style={{ width:50, height:8, background:'linear-gradient(90deg,#0369a1,#38bdf8,#0369a1)', borderRadius:4, boxShadow:'0 4px 12px rgba(56,189,248,0.2)' }} />
          <motion.div style={{ position:'absolute', top:-24, left:'50%', transform:'translateX(-50%)', fontSize:20 }}
            animate={{ rotate:360, scale:[1,1.3,1] }} transition={{ duration:4, repeat:Infinity }}>⭐</motion.div>
        </motion.div>
        {conf.map((c,i)=>(
          <motion.div key={i} style={{ position:'absolute', width:c.s, height:c.s, background:c.c, borderRadius:2, left:`${c.x}%`, top:'5%' }}
            animate={{ y:['0%','108%'], opacity:[1,1,0], rotate:[0,360] }} transition={{ duration:2.5, repeat:Infinity, delay:c.d, ease:'easeIn' }} />
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   STICKER: TECH ORB
═══════════════════════════════════════ */
function StickerOrb() {
  const icons = ['⚛️','☕','🐍','☁️','🐳','⚙️'];
  return (
    <motion.div className="pointer-events-none select-none"
      initial={{ x:-70, opacity:0 }} whileInView={{ x:0, opacity:1 }} transition={{ duration:0.8, type:'spring' }} viewport={{ once:true }}
      style={{ position:'absolute', left:'-5%', top:'50%', transform:'translateY(-50%)', width:150, height:150, zIndex:10 }}>
      <div style={{ position:'relative', width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <motion.div style={{ width:56, height:56, borderRadius:'50%', background:'radial-gradient(circle at 35% 35%,#818cf8,#4338ca)', zIndex:2, position:'relative', boxShadow:'0 0 0 2px rgba(129,140,248,0.2), 0 0 28px rgba(129,140,248,0.35)' }}
          animate={{ scale:[1,1.08,1], boxShadow:['0 0 20px rgba(129,140,248,0.2)','0 0 36px rgba(129,140,248,0.5)','0 0 20px rgba(129,140,248,0.2)'] }} transition={{ duration:3, repeat:Infinity }}>
          <div style={{ position:'absolute', top:9, left:9, width:14, height:10, borderRadius:7, background:'rgba(255,255,255,0.2)', transform:'rotate(12deg)' }} />
        </motion.div>
        {[80,116].map((s,i)=>(
          <motion.div key={i} style={{ position:'absolute', width:s, height:s*0.38, border:`1px solid rgba(56,189,248,${0.15+i*0.06})`, borderRadius:'50%' }}
            animate={{ rotateY:360 }} transition={{ duration:6+i*3, repeat:Infinity, ease:'linear' }} />
        ))}
        {icons.map((ic,i)=>{
          const a = (i/icons.length)*360, r=65;
          return (
            <motion.div key={i} style={{ position:'absolute', top:'50%', left:'50%', fontSize:16, marginTop:-10, marginLeft:-10 }}
              animate={{ rotate:360 }} transition={{ duration:8+i*2, repeat:Infinity, ease:'linear' }}>
              <span style={{ display:'block', transform:`translate(${Math.cos(a*Math.PI/180)*r/2}px,${Math.sin(a*Math.PI/180)*r/4}px)` }}>{ic}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   STICKER: CERT
═══════════════════════════════════════ */
function StickerCert() {
  return (
    <motion.div className="pointer-events-none select-none"
      initial={{ x:70, opacity:0 }} whileInView={{ x:0, opacity:1 }} transition={{ duration:0.8, type:'spring' }} viewport={{ once:true }}
      style={{ position:'absolute', right:'-5%', top:'50%', transform:'translateY(-50%)', width:150, height:150, zIndex:10 }}>
      <div style={{ position:'relative', width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <motion.div animate={{ y:[0,-10,0], rotate:[0,2,-2,0] }} transition={{ duration:4, repeat:Infinity }}
          style={{ filter:'drop-shadow(0 0 10px rgba(56,189,248,0.25))' }}>
          <div style={{ width:120, height:82, background:'linear-gradient(135deg,#0d1526,#111d35)', border:'1px solid rgba(56,189,248,0.22)', borderRadius:9, position:'relative', overflow:'hidden', boxShadow:'0 8px 28px rgba(0,0,0,0.4)' }}>
            <div style={{ height:7, background:'linear-gradient(90deg,#38bdf8,#818cf8)' }} />
            <div style={{ position:'absolute', inset:10, border:'1px dashed rgba(56,189,248,0.18)', borderRadius:5 }} />
            <div style={{ position:'absolute', top:'50%', left:16, transform:'translateY(-50%)', fontSize:26 }}>📜</div>
            <div style={{ position:'absolute', right:12, top:20 }}>
              {['CERTIFIED','VERIFIED','EXPERT'].map((t,i)=>(
                <motion.div key={i} style={{ height:2, borderRadius:2, marginBottom:5, width:44-i*7, background:i===0?'linear-gradient(90deg,#38bdf8,#818cf8)':'rgba(56,189,248,0.18)' }}
                  animate={{ width:[44-i*7,52-i*7,44-i*7] }} transition={{ duration:3, repeat:Infinity, delay:i*0.4 }} />
              ))}
              <div style={{ fontSize:6, color:'rgba(56,189,248,0.55)', letterSpacing:'0.1em', marginTop:2 }}>CERTIFIED</div>
            </div>
          </div>
          <motion.div style={{ position:'absolute', bottom:-9, right:-9, width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,#38bdf8,#818cf8)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, boxShadow:'0 4px 14px rgba(56,189,248,0.4)', border:'2px solid rgba(255,255,255,0.1)', color:'#050914', fontWeight:800 }}
            animate={{ rotate:360 }} transition={{ duration:8, repeat:Infinity, ease:'linear' }}>✓</motion.div>
          <div style={{ position:'absolute', top:-12, left:'50%', transform:'translateX(-50%)', width:20, height:20, background:'linear-gradient(180deg,#f472b6,#db2777)', borderRadius:'3px 3px 0 0' }} />
        </motion.div>
        {[...Array(5)].map((_,i)=>(
          <motion.div key={i} style={{ position:'absolute', fontSize:11, left:`${6+i*18}%`, top:i%2===0?'8%':'72%', color:'#38bdf8' }}
            animate={{ opacity:[0,1,0], scale:[0,1.5,0], rotate:[0,180] }} transition={{ duration:2, repeat:Infinity, delay:i*0.4 }}>✦</motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   STICKER: GRAD
═══════════════════════════════════════ */
function StickerGrad() {
  return (
    <motion.div className="pointer-events-none select-none"
      initial={{ x:-70, opacity:0 }} whileInView={{ x:0, opacity:1 }} transition={{ duration:0.8, type:'spring' }} viewport={{ once:true }}
      style={{ position:'absolute', left:'-5%', top:'50%', transform:'translateY(-50%)', width:150, height:150, zIndex:10 }}>
      <div style={{ position:'relative', width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <motion.div animate={{ y:[0,-10,0] }} transition={{ duration:4, repeat:Infinity }}
          style={{ position:'relative', filter:'drop-shadow(0 0 10px rgba(56,189,248,0.2))' }}>
          <div style={{ width:42, height:56, background:'linear-gradient(180deg,#1e3a5f,#0c2340)', borderRadius:'7px 7px 0 0', margin:'0 auto', position:'relative' }}>
            <div style={{ position:'absolute', top:0, left:5, right:5, height:12, background:'rgba(56,189,248,0.15)', borderRadius:'0 0 7px 7px' }} />
          </div>
          <div style={{ width:54, height:14, background:'linear-gradient(180deg,#0c2340,#06172b)', borderRadius:'0 0 10px 10px', margin:'0 auto' }} />
          <div style={{ position:'absolute', top:-36, left:'50%', transform:'translateX(-50%)', width:34, height:34, borderRadius:'50%', background:'#f3d5b5', border:'2px solid #e8bc8a' }}>
            <div style={{ position:'absolute', bottom:6, left:5, width:24, height:7, borderBottom:'2px solid #6b3a1f', borderRadius:'0 0 50% 50%' }} />
            <div style={{ position:'absolute', top:9, left:7, width:5, height:5, borderRadius:'50%', background:'#2d1b0e' }} />
            <div style={{ position:'absolute', top:9, right:7, width:5, height:5, borderRadius:'50%', background:'#2d1b0e' }} />
          </div>
          <div style={{ position:'absolute', top:-58, left:'50%', transform:'translateX(-50%)', width:46, height:4, background:'#0f172a', borderRadius:2 }} />
          <div style={{ position:'absolute', top:-68, left:'50%', transform:'translateX(-50%)', width:34, height:10, background:'#0f172a', borderRadius:'3px 3px 0 0' }} />
          <motion.div style={{ position:'absolute', top:-56, right:8, width:1, height:22, background:'#38bdf8', transformOrigin:'top', opacity:0.8 }}
            animate={{ rotate:[0,22,-10,0] }} transition={{ duration:3, repeat:Infinity }}>
            <div style={{ position:'absolute', bottom:0, left:-3, width:7, height:7, borderRadius:'50%', background:'#38bdf8', boxShadow:'0 0 6px rgba(56,189,248,0.6)' }} />
          </motion.div>
          <motion.div style={{ position:'absolute', top:8, right:-38, width:38, height:28, background:'linear-gradient(135deg,#0d1526,#111d35)', border:'1px solid rgba(56,189,248,0.28)', borderRadius:5, boxShadow:'0 4px 10px rgba(0,0,0,0.3)' }}
            animate={{ rotate:[0,4,0], y:[0,-4,0] }} transition={{ duration:3, repeat:Infinity, delay:0.5 }}>
            {[6,12,18].map((t,i)=><div key={i} style={{ position:'absolute', top:t, left:4, right:i===2?10:4, height:1, background:'rgba(56,189,248,0.25)' }} />)}
          </motion.div>
        </motion.div>
        {[...Array(3)].map((_,i)=>(
          <motion.div key={i} style={{ position:'absolute', fontSize:15, left:`${16+i*28}%`, top:'12%' }}
            animate={{ y:[0,-28,55], opacity:[0,1,0], rotate:[0,360] }} transition={{ duration:3, repeat:Infinity, delay:i*0.9 }}>🎓</motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   STICKER: ENVELOPE
═══════════════════════════════════════ */
function StickerEnvelope() {
  return (
    <motion.div className="pointer-events-none select-none"
      initial={{ opacity:0, scale:0, rotate:15 }} whileInView={{ opacity:1, scale:1, rotate:0 }}
      transition={{ duration:0.7, type:'spring' }} viewport={{ once:true }}
      style={{ position:'absolute', bottom:80, right:'8%', width:120, height:120, zIndex:10 }}>
      <motion.div animate={{ y:[0,-12,0], rotate:[-2,2,-2] }} transition={{ duration:5, repeat:Infinity }}
        style={{ position:'relative', filter:'drop-shadow(0 0 12px rgba(56,189,248,0.3))' }}>
        <div style={{ width:100, height:70, background:'linear-gradient(135deg,#0d1526,#111d35)', border:'1px solid rgba(56,189,248,0.3)', borderRadius:9, position:'relative', overflow:'hidden', boxShadow:'0 8px 28px rgba(0,0,0,0.4)' }}>
          <motion.div style={{ position:'absolute', top:0, left:0, right:0, height:0, borderTop:'35px solid rgba(56,189,248,0.07)', borderLeft:'50px solid transparent', borderRight:'50px solid transparent' }}
            animate={{ borderTopColor:['rgba(56,189,248,0.07)','rgba(129,140,248,0.14)','rgba(56,189,248,0.07)'] }} transition={{ duration:3, repeat:Infinity }} />
          <div style={{ position:'absolute', bottom:0, left:0, height:0, borderBottom:'35px solid transparent', borderLeft:'50px solid rgba(56,189,248,0.05)' }} />
          <div style={{ position:'absolute', bottom:0, right:0, height:0, borderBottom:'35px solid transparent', borderRight:'50px solid rgba(56,189,248,0.05)' }} />
          <motion.div style={{ position:'absolute', top:2, left:'50%', transform:'translateX(-50%)', fontSize:20 }}
            animate={{ y:[-3,-18,-3], opacity:[0,1,0], scale:[0.5,1,0.5] }} transition={{ duration:2.5, repeat:Infinity, repeatDelay:0.5 }}>💌</motion.div>
        </div>
        {[1,2].map((s,i)=>(
          <motion.div key={i} style={{ position:'absolute', inset:-(s*10), border:'1px solid rgba(56,189,248,0.12)', borderRadius:12+s*2 }}
            animate={{ opacity:[0.5,0,0.5] }} transition={{ duration:2, repeat:Infinity, delay:i*0.6 }} />
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   MAIN
═══════════════════════════════════════ */
export default function Home() {
  const [loaded, setLoaded]       = useState(false);
  const [heroOn, setHeroOn]       = useState(false);
  const [df, setDf]               = useState('');
  const [dl, setDl]               = useState('');
  const [typed, setTyped]         = useState(false);
  const [backTop, setBackTop]     = useState(false);

  const nutRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: nutRef, offset: ['start end','end start'] });
  const nOpacity = useTransform(scrollYProgress, [0.1,0.3,0.7,0.9], [0,1,1,0]);
  const nY       = useTransform(scrollYProgress, [0.1,0.3,0.7,0.9], [40,0,0,-40]);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });

  useEffect(() => {
    if (!loaded) return;
    setTimeout(() => setHeroOn(true), 150);
    const F = 'MAHESH BABU', L = 'NARNE';
    let i = 0;
    const t1 = setInterval(() => {
      setDf(F.substring(0,++i));
      if (i >= F.length) { clearInterval(t1); let j=0; setTimeout(() => {
        const t2 = setInterval(() => {
          setDl(L.substring(0,++j));
          if (j >= L.length) { clearInterval(t2); setTimeout(() => setTyped(true), 350); }
        }, 110);
      }, 380); }
    }, 140);
    const onScroll = () => setBackTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [loaded]);

  const fadeUp = { initial:{opacity:0,y:24}, animate:{opacity:1,y:0}, transition:{duration:0.5} };
  const stagger = { animate:{ transition:{ staggerChildren:0.08 } } };

  const experiences = [
    {
      company:'Apple', role:'Senior Software Engineer', period:'July 2024 – Present', loc:'United States', current:true, ac:'#38bdf8',
      bullets:[
        'Design and implement scalable full-stack applications using React, TypeScript, Java, and Spring Boot — millions of daily requests with sub-100ms latency.',
        'Architect microservices with Python and C# for event-driven Kafka data pipelines powering real-time analytics.',
        'Optimize PostgreSQL and MongoDB — query tuning and indexing reduced response times by 45%.',
        'Lead code reviews, mentor junior engineers, and establish coding standards across the org.',
        'Prometheus and Grafana monitoring reduced MTTD by 60% — 99.99% uptime maintained.',
        'Participate in on-call rotations ensuring high-availability SLAs.',
      ],
    },
    {
      company:'Deloitte', role:'Software Engineer', period:'March 2021 – November 2023', loc:'Hyderabad, India', current:false, ac:'#818cf8',
      bullets:[
        'Built full-stack enterprise apps in React, Java, Spring Boot, PostgreSQL scaling to 100K+ concurrent users.',
        'Designed RESTful APIs and microservices with Python and C# for business-critical data pipelines.',
        'Kafka real-time pipelines processing millions of events daily.',
        'Docker containerization and CI/CD with Jenkins + GitHub Actions — deployment time cut 70%.',
        'Maintained 85% code coverage via JUnit, Mockito, and Jest.',
        'Mentored junior developers on frontend and backend best practices.',
      ],
    },
  ];

  const achievements = [
    { icon:'🚀', text:'Architected e-commerce platform: 200K+ daily transactions, 99.99% uptime, sub-100ms response.' },
    { icon:'⚡', text:'Redis caching reduced API response times 65% and infrastructure costs 30%.' },
    { icon:'🎯', text:'Incident response time cut 60% via distributed tracing and automated alerting.' },
    { icon:'🏗️', text:'Engineering best practices for full-stack development adopted across multiple teams.' },
    { icon:'🌱', text:'Mentored 5 junior engineers who all advanced to mid-level roles.' },
    { icon:'🏆', text:'Delivered 3 greenfield projects concept-to-production within 6-month timelines.' },
  ];

  const skillGroups = [
    { label:'Languages',   ac:'#38bdf8', skills:['Java','Python','C#','TypeScript','JavaScript','SQL','Go','C++'] },
    { label:'Frontend',    ac:'#818cf8', skills:['React','Next.js','Redux','Tailwind CSS','HTML5','CSS3','Material-UI'] },
    { label:'Backend',     ac:'#4ade80', skills:['Spring Boot','.NET Core','Node.js','Express','Django','GraphQL'] },
    { label:'Cloud',       ac:'#fb923c', skills:['AWS','Azure','OCI','Cloud-Native Arch.'] },
    { label:'Databases',   ac:'#f472b6', skills:['PostgreSQL','MySQL','MongoDB','Cassandra','Redis'] },
    { label:'DevOps',      ac:'#34d399', skills:['Docker','Kubernetes','Jenkins','GitHub Actions','Terraform'] },
    { label:'Observability',ac:'#a78bfa',skills:['Prometheus','Grafana','ELK Stack','Distributed Tracing'] },
    { label:'Testing',     ac:'#60a5fa', skills:['JUnit','Mockito','Jest','RTL','Selenium'] },
  ];

  const certs = [
    { name:'AWS Certified Solutions Architect – Associate',    icon:'☁️', c:'#fb923c' },
    { name:'Microsoft Certified: Azure Developer Associate',   icon:'🔷', c:'#38bdf8' },
    { name:'Oracle Certified Professional: Java SE 11',        icon:'☕', c:'#f59e0b' },
    { name:'Certified Kubernetes Administrator (CKA)',         icon:'⎈', c:'#4ade80' },
    { name:'Meta Front-End Developer Professional Certificate',icon:'⚛️', c:'#818cf8' },
  ];

  const stats = [{ v:'4+', l:'Years' },{ v:'99.99%', l:'Uptime' },{ v:'200K+', l:'Daily Txns' },{ v:'2', l:'FAANG+' }];

  const BORDER = '1px solid rgba(99,179,237,0.1)';
  const SURFACE = '#0d1526';
  const sectionBase = { padding:'96px 24px', position:'relative', overflow:'hidden', borderTop:BORDER };

  return (
    <>
      <CustomCursor />
      {/* Scan line */}
      <div className="scan-line" />

      <LoadingScreen onDone={() => setLoaded(true)} />

      <div style={{ background:'#050914', minHeight:'100vh', color:'#e2e8f0' }}>

        {/* ─── NAV ─── */}
        <motion.nav initial={{ y:-70, opacity:0 }} animate={loaded?{y:0,opacity:1}:{}} transition={{ delay:0.1, duration:0.55, ease:[0.22,1,0.36,1] }}
          style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, background:'rgba(5,9,20,0.82)', backdropFilter:'blur(20px)', borderBottom:BORDER }}>
          <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 24px', height:62, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <motion.button data-hover onClick={() => go('home')} whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              style={{ display:'flex', alignItems:'center', gap:10, background:'none', border:'none', cursor:'none' }}>
              <div style={{ width:32, height:32, borderRadius:8, background:'linear-gradient(135deg,#38bdf8,#818cf8)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:13, color:'#050914', boxShadow:'0 4px 14px rgba(56,189,248,0.25)' }}>MN</div>
              <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:14, color:'#e2e8f0' }}>Mahesh Narne</span>
            </motion.button>
            <div style={{ display:'flex', alignItems:'center', gap:28 }}>
              <div className="hidden md:flex" style={{ gap:26 }}>
                {[['Experience','experience'],['Achievements','achievements'],['Skills','skills'],['Contact','contact']].map(([n,id])=>(
                  <motion.button key={id} data-hover onClick={() => go(id)} whileHover={{ color:'#38bdf8' }}
                    style={{ background:'none', border:'none', cursor:'none', fontSize:12, fontWeight:500, letterSpacing:'0.07em', color:'#64748b', textTransform:'uppercase' }}>{n}</motion.button>
                ))}
              </div>
              <motion.a href="/resume.pdf" target="_blank" data-hover
                whileHover={{ scale:1.04, boxShadow:'0 0 18px rgba(56,189,248,0.3)' }} whileTap={{ scale:0.96 }}
                style={{ padding:'7px 18px', borderRadius:7, border:'1px solid rgba(56,189,248,0.38)', color:'#38bdf8', fontSize:12, fontWeight:600, textDecoration:'none', letterSpacing:'0.04em' }}>
                Resume ↗
              </motion.a>
            </div>
          </div>
        </motion.nav>

        {/* ─── HERO ─── */}
        <section id="home" style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', paddingTop:72, position:'relative', overflow:'hidden' }}>
          <StarsBg />
          <div className="dot-grid" style={{ position:'absolute', inset:0, opacity:0.18 }} />
          {/* Orbs */}
          {[[{top:'15%',left:'8%',w:380,c:'rgba(56,189,248,0.06)'},{x:[0,60,0],y:[0,30,0],d:20}],[{bottom:'15%',right:'8%',w:480,c:'rgba(129,140,248,0.05)'},{x:[0,-60,0],y:[0,-30,0],d:25}]].map(([pos,anim],i)=>(
            <motion.div key={i} style={{ position:'absolute', ...{top:pos.top,left:pos.left,bottom:pos.bottom,right:pos.right}, width:pos.w, height:pos.w, borderRadius:'50%', background:`radial-gradient(circle,${pos.c},transparent 70%)`, pointerEvents:'none' }}
              animate={{ x:anim.x, y:anim.y }} transition={{ duration:anim.d, repeat:Infinity, ease:'linear' }} />
          ))}

          <StickerAstronaut show={heroOn} />

          <div style={{ textAlign:'center', padding:'0 24px', position:'relative', zIndex:5, maxWidth:880 }}>
            {/* Badge */}
            <motion.div initial={{ opacity:0, y:-14 }} animate={heroOn?{opacity:1,y:0}:{}} transition={{ delay:0.2, duration:0.5 }}
              style={{ marginBottom:28, display:'inline-flex', alignItems:'center', gap:8 }}>
              <span className="badge">
                <motion.span style={{ width:6, height:6, background:'#4ade80', borderRadius:'50%', display:'inline-block' }}
                  animate={{ opacity:[1,0.3,1], scale:[1,1.3,1] }} transition={{ duration:1.5, repeat:Infinity }} />
                Open to opportunities
              </span>
            </motion.div>

            {/* Name */}
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(48px,9.5vw,96px)', lineHeight:1.02, letterSpacing:'-0.02em', color:'#e2e8f0' }}>
              {df}
              {!typed && df.length < 11 && <span className="blink" style={{ color:'#38bdf8', fontWeight:300 }}>|</span>}
            </div>
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(48px,9.5vw,96px)', lineHeight:1.05, letterSpacing:'-0.02em', background:'linear-gradient(135deg,#38bdf8,#818cf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', marginBottom:32 }}>
              {dl}
              {df.length === 11 && !typed && <span className="blink" style={{ WebkitTextFillColor:'#818cf8', fontWeight:300 }}>|</span>}
            </div>

            <AnimatePresence>
              {typed && (
                <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
                  <p style={{ color:'#64748b', fontSize:17, lineHeight:1.75, maxWidth:520, margin:'0 auto 28px' }}>
                    Senior Software Engineer at <span style={{ color:'#38bdf8', fontWeight:600 }}>Apple</span>, crafting scalable distributed systems and high-performance full-stack applications.
                  </p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center', marginBottom:36 }}>
                    {['Java · Spring Boot','React · TypeScript','Cloud Native','Distributed Systems'].map((t,i)=>(
                      <motion.span key={i} initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:i*0.08 }}
                        style={{ padding:'5px 14px', background:SURFACE, border:BORDER, borderRadius:99, fontSize:12, color:'#64748b', fontWeight:500 }}>{t}</motion.span>
                    ))}
                  </div>
                  <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
                    <motion.button data-hover onClick={() => go('experience')} whileHover={{ scale:1.04, boxShadow:'0 8px 28px rgba(56,189,248,0.28)' }} whileTap={{ scale:0.96 }}
                      style={{ padding:'13px 30px', background:'linear-gradient(135deg,#38bdf8,#818cf8)', border:'none', borderRadius:10, color:'#050914', fontWeight:700, fontSize:15, cursor:'none', letterSpacing:'0.02em' }}>
                      View Work ↓
                    </motion.button>
                    <motion.button data-hover onClick={() => go('contact')} whileHover={{ scale:1.04, borderColor:'rgba(56,189,248,0.5)' }} whileTap={{ scale:0.96 }}
                      style={{ padding:'13px 30px', background:'transparent', border:'1px solid rgba(99,179,237,0.18)', borderRadius:10, color:'#e2e8f0', fontWeight:600, fontSize:15, cursor:'none' }}>
                      Contact Me
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Scroll hint */}
          <motion.div style={{ position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}
            animate={{ y:[0,8,0], opacity:[0.3,0.7,0.3] }} transition={{ duration:2.5, repeat:Infinity }}>
            <span className="section-label">Scroll</span>
            <div style={{ width:1, height:36, background:'linear-gradient(180deg,rgba(56,189,248,0.5),transparent)' }} />
          </motion.div>
        </section>

        {/* ─── NUTSHELL ─── */}
        <section ref={nutRef} style={{ ...sectionBase, minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'80px 24px', background:'#080e1d' }}>
          <motion.div style={{ maxWidth:740, width:'100%', opacity:nOpacity, y:nY }}>
            <div style={{ textAlign:'center', marginBottom:36 }}>
              <span className="section-label">About</span>
              <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(34px,6vw,54px)', fontWeight:800, marginTop:8 }}>
                In a <span style={{ background:'linear-gradient(135deg,#38bdf8,#818cf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Nutshell</span>
              </h2>
            </div>
            <div className="gradient-border shimmer" style={{ background:SURFACE, borderRadius:20, padding:'36px 40px', position:'relative', overflow:'hidden' }}>
              <StickerRocket />
              <div style={{ position:'absolute', top:-50, right:-50, width:180, height:180, borderRadius:'50%', background:'radial-gradient(circle,rgba(56,189,248,0.04),transparent)', pointerEvents:'none' }} />
              <p style={{ fontSize:16, lineHeight:1.82, color:'#64748b' }}>
                <span style={{ display:'block', fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:20, color:'#e2e8f0', marginBottom:14 }}>Senior Software Engineer</span>
                with <span style={{ color:'#38bdf8', fontWeight:600 }}>4+ years</span> delivering scalable, high-performance full-stack applications at <span style={{ color:'#38bdf8', fontWeight:600 }}>Apple</span> and <span style={{ color:'#818cf8', fontWeight:600 }}>Deloitte</span>.
                <span style={{ display:'block', marginTop:12 }}>Expert in <span style={{ color:'#38bdf8' }}>Java</span>, <span style={{ color:'#38bdf8' }}>Spring Boot</span>, <span style={{ color:'#818cf8' }}>Python</span>, <span style={{ color:'#818cf8' }}>C#</span>, and <span style={{ color:'#38bdf8' }}>React</span> with deep expertise in cloud-native architectures, microservices, and event-driven systems.</span>
                <span style={{ display:'block', marginTop:12, fontSize:14 }}>Passionate about building observable, reliable, impactful software at scale.</span>
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginTop:32, paddingTop:24, borderTop:BORDER }}>
                {stats.map((s,i)=>(
                  <div key={i} style={{ textAlign:'center' }}>
                    <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:24, background:'linear-gradient(135deg,#38bdf8,#818cf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{s.v}</div>
                    <div style={{ color:'#334155', fontSize:11, marginTop:2, textTransform:'uppercase', letterSpacing:'0.08em' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── EXPERIENCE ─── */}
        <motion.section id="experience" initial="initial" whileInView="animate" viewport={{ once:true, amount:0.08 }} variants={stagger}
          style={{ ...sectionBase, background:'#080e1d', minHeight:'100vh', display:'flex', alignItems:'center' }}>
          <StickerLaptop />
          <div style={{ maxWidth:820, margin:'0 auto', width:'100%', paddingLeft:'clamp(0px,7vw,72px)' }}>
            <motion.div variants={fadeUp} style={{ marginBottom:44 }}>
              <span className="section-label">Career</span>
              <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(30px,5vw,46px)', fontWeight:800, marginTop:8 }}>
                Work <span style={{ background:'linear-gradient(135deg,#38bdf8,#818cf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Experience</span>
              </h2>
            </motion.div>
            <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
              {experiences.map((exp,i)=>(
                <motion.div key={i} variants={fadeUp} whileHover={{ y:-4, borderColor:`${exp.ac}35` }} data-hover
                  style={{ background:SURFACE, border:BORDER, borderRadius:16, padding:'26px 28px', transition:'all 0.3s ease', cursor:'none', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:`linear-gradient(180deg,${exp.ac},transparent)`, borderRadius:'3px 0 0 3px' }} />
                  <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:10, marginBottom:18 }}>
                    <div>
                      <h3 style={{ fontFamily:'Syne,sans-serif', fontSize:19, fontWeight:700, color:'#e2e8f0', marginBottom:4 }}>{exp.role}</h3>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <span style={{ color:exp.ac, fontWeight:600, fontSize:14 }}>{exp.company}</span>
                        {exp.current && <span style={{ padding:'1px 9px', background:`${exp.ac}15`, border:`1px solid ${exp.ac}35`, borderRadius:99, fontSize:10, color:exp.ac, fontWeight:700, letterSpacing:'0.08em' }}>CURRENT</span>}
                      </div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ color:'#64748b', fontSize:13 }}>{exp.period}</div>
                      <div style={{ color:'#334155', fontSize:12, marginTop:2 }}>{exp.loc}</div>
                    </div>
                  </div>
                  <ul style={{ display:'flex', flexDirection:'column', gap:9 }}>
                    {exp.bullets.map((b,j)=>(
                      <motion.li key={j} initial={{ opacity:0, x:-10 }} whileInView={{ opacity:1, x:0 }} transition={{ delay:j*0.06 }} viewport={{ once:true }}
                        style={{ display:'flex', gap:10, fontSize:13, lineHeight:1.65, color:'#64748b' }}>
                        <span style={{ color:exp.ac, flexShrink:0, marginTop:2 }}>›</span>{b}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── ACHIEVEMENTS ─── */}
        <motion.section id="achievements" initial="initial" whileInView="animate" viewport={{ once:true, amount:0.08 }} variants={stagger}
          style={{ ...sectionBase, minHeight:'100vh', display:'flex', alignItems:'center' }}>
          <StickerTrophy />
          <div style={{ maxWidth:820, margin:'0 auto', width:'100%', paddingRight:'clamp(0px,7vw,72px)' }}>
            <motion.div variants={fadeUp} style={{ marginBottom:44 }}>
              <span className="section-label">Impact</span>
              <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(30px,5vw,46px)', fontWeight:800, marginTop:8 }}>
                Key <span style={{ background:'linear-gradient(135deg,#38bdf8,#818cf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Achievements</span>
              </h2>
            </motion.div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:14 }}>
              {achievements.map((a,i)=>(
                <motion.div key={i} variants={fadeUp} whileHover={{ y:-4, borderColor:'rgba(56,189,248,0.28)' }} data-hover
                  style={{ background:SURFACE, border:BORDER, borderRadius:14, padding:'20px 22px', cursor:'none', transition:'all 0.3s ease', display:'flex', gap:14, alignItems:'flex-start' }}>
                  <div style={{ fontSize:26, flexShrink:0, lineHeight:1 }}>{a.icon}</div>
                  <div>
                    <div style={{ fontSize:10, color:'rgba(56,189,248,0.55)', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:5 }}>0{i+1}</div>
                    <p style={{ fontSize:13, lineHeight:1.65, color:'#64748b' }}>{a.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── SKILLS ─── */}
        <motion.section id="skills" initial="initial" whileInView="animate" viewport={{ once:true, amount:0.05 }} variants={stagger}
          style={{ ...sectionBase, background:'#080e1d', minHeight:'100vh', display:'flex', alignItems:'center' }}>
          <StickerOrb />
          <div style={{ maxWidth:920, margin:'0 auto', width:'100%', paddingLeft:'clamp(0px,7vw,72px)' }}>
            <motion.div variants={fadeUp} style={{ marginBottom:44 }}>
              <span className="section-label">Stack</span>
              <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(30px,5vw,46px)', fontWeight:800, marginTop:8 }}>
                Technical <span style={{ background:'linear-gradient(135deg,#38bdf8,#818cf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Skills</span>
              </h2>
            </motion.div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(195px,1fr))', gap:12 }}>
              {skillGroups.map((g,i)=>(
                <motion.div key={i} variants={fadeUp} whileHover={{ y:-4, borderColor:`${g.ac}28` }} data-hover
                  style={{ background:SURFACE, border:BORDER, borderRadius:13, padding:'18px 18px 16px', cursor:'none', transition:'all 0.3s ease', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${g.ac},transparent)`, opacity:0.45 }} />
                  <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:11, color:g.ac, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:12 }}>{g.label}</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                    {g.skills.map((s,j)=>(
                      <motion.span key={j} data-hover whileHover={{ background:`${g.ac}18`, color:g.ac, borderColor:`${g.ac}35` }}
                        style={{ padding:'2px 9px', background:'#111d35', border:BORDER, borderRadius:99, fontSize:10, color:'#64748b', fontWeight:500, cursor:'none', transition:'all 0.2s ease' }}>
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── CERTIFICATIONS ─── */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once:true, amount:0.08 }} variants={stagger}
          style={{ ...sectionBase, display:'flex', alignItems:'center' }}>
          <StickerCert />
          <div style={{ maxWidth:820, margin:'0 auto', width:'100%', paddingRight:'clamp(0px,7vw,72px)' }}>
            <motion.div variants={fadeUp} style={{ marginBottom:44 }}>
              <span className="section-label">Credentials</span>
              <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(30px,5vw,46px)', fontWeight:800, marginTop:8 }}>
                <span style={{ background:'linear-gradient(135deg,#38bdf8,#818cf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Certifications</span>
              </h2>
            </motion.div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {certs.map((cert,i)=>(
                <motion.div key={i} variants={fadeUp} whileHover={{ x:7, borderColor:`${cert.c}35` }} data-hover
                  style={{ background:SURFACE, border:BORDER, borderRadius:13, padding:'16px 22px', cursor:'none', transition:'all 0.3s ease', display:'flex', alignItems:'center', gap:16 }}>
                  <div style={{ width:42, height:42, borderRadius:10, background:`${cert.c}12`, border:`1px solid ${cert.c}28`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{cert.icon}</div>
                  <span style={{ fontSize:14, color:'#e2e8f0', fontWeight:500, flex:1 }}>{cert.name}</span>
                  <motion.div style={{ width:22, height:22, borderRadius:'50%', background:`${cert.c}12`, border:`1px solid ${cert.c}28`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:cert.c, flexShrink:0 }}
                    animate={{ scale:[1,1.18,1] }} transition={{ duration:2, repeat:Infinity, delay:i*0.3 }}>✓</motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── EDUCATION ─── */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once:true, amount:0.08 }} variants={stagger}
          style={{ ...sectionBase, background:'#080e1d', display:'flex', alignItems:'center' }}>
          <StickerGrad />
          <div style={{ maxWidth:820, margin:'0 auto', width:'100%', paddingLeft:'clamp(0px,7vw,72px)' }}>
            <motion.div variants={fadeUp} style={{ marginBottom:44 }}>
              <span className="section-label">Academic</span>
              <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(30px,5vw,46px)', fontWeight:800, marginTop:8 }}>
                <span style={{ background:'linear-gradient(135deg,#38bdf8,#818cf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Education</span>
              </h2>
            </motion.div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:18 }}>
              {[
                { degree:'Master of Science', school:'University of Central Missouri', location:'Warrensburg, MO', icon:'🎓', ac:'#38bdf8' },
                { degree:'Bachelor of Technology', school:'GITAM University', location:'Andhra Pradesh, India', icon:'🏛️', ac:'#818cf8' },
              ].map((e,i)=>(
                <motion.div key={i} variants={fadeUp} whileHover={{ y:-6, borderColor:`${e.ac}35` }} data-hover
                  style={{ background:SURFACE, border:BORDER, borderRadius:16, padding:'28px', cursor:'none', transition:'all 0.3s ease', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:2.5, background:`linear-gradient(90deg,${e.ac},transparent)`, opacity:0.5 }} />
                  <div style={{ fontSize:38, marginBottom:14 }}>{e.icon}</div>
                  <h3 style={{ fontFamily:'Syne,sans-serif', fontSize:18, fontWeight:700, color:'#e2e8f0', marginBottom:5 }}>{e.degree}</h3>
                  <p style={{ color:e.ac, fontWeight:600, marginBottom:3, fontSize:14 }}>{e.school}</p>
                  <p style={{ color:'#334155', fontSize:12 }}>{e.location}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── CONTACT ─── */}
        <motion.section id="contact" initial="initial" whileInView="animate" viewport={{ once:true, amount:0.15 }} variants={stagger}
          style={{ ...sectionBase, minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'96px 24px' }}>
          <StarsBg />
          <StickerEnvelope />
          <motion.div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:560, height:560, borderRadius:'50%', background:'radial-gradient(circle,rgba(56,189,248,0.03),transparent 70%)', pointerEvents:'none' }}
            animate={{ scale:[1,1.2,1] }} transition={{ duration:6, repeat:Infinity }} />
          <div style={{ textAlign:'center', maxWidth:580, position:'relative', zIndex:5 }}>
            <motion.div variants={fadeUp}>
              <span className="section-label">Let's Talk</span>
              <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(40px,8vw,78px)', fontWeight:800, marginTop:10, lineHeight:1.05 }}>
                Get In <span style={{ background:'linear-gradient(135deg,#38bdf8,#818cf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Touch</span>
              </h2>
            </motion.div>
            <motion.p variants={fadeUp} style={{ color:'#64748b', fontSize:16, marginBottom:36, marginTop:14, lineHeight:1.75 }}>
              Whether you have a role in mind, a project to collaborate on, or just want to say hello — my inbox is always open.
            </motion.p>
            <motion.div variants={fadeUp} style={{ marginBottom:36, display:'flex', flexDirection:'column', gap:8, alignItems:'center' }}>
              <a href="mailto:narnemaheshbabu11@gmail.com" data-hover style={{ color:'#38bdf8', fontSize:16, fontWeight:500, textDecoration:'none' }}>
                narnemaheshbabu11@gmail.com
              </a>
              <span style={{ color:'#334155', fontSize:14 }}>+1-913-249-9980</span>
            </motion.div>
            <motion.div variants={fadeUp} style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
              <motion.a href="mailto:narnemaheshbabu11@gmail.com" data-hover whileHover={{ scale:1.04, boxShadow:'0 12px 36px rgba(56,189,248,0.32)' }} whileTap={{ scale:0.96 }}
                style={{ padding:'14px 34px', background:'linear-gradient(135deg,#38bdf8,#818cf8)', borderRadius:11, color:'#050914', fontWeight:700, fontSize:15, textDecoration:'none', letterSpacing:'0.02em', display:'inline-block' }}>
                Send Email 📧
              </motion.a>
              <motion.a href="https://linkedin.com" target="_blank" data-hover whileHover={{ scale:1.04, borderColor:'rgba(56,189,248,0.45)' }} whileTap={{ scale:0.96 }}
                style={{ padding:'14px 34px', background:'transparent', border:'1px solid rgba(99,179,237,0.18)', borderRadius:11, color:'#e2e8f0', fontWeight:600, fontSize:15, textDecoration:'none', display:'inline-block' }}>
                LinkedIn ↗
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

        {/* ─── FOOTER ─── */}
        <footer style={{ borderTop:BORDER, padding:'24px', background:'#050914' }}>
          <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
            <p style={{ color:'#1e293b', fontSize:12 }}>© 2026 Mahesh Babu Narne · Built with Next.js & Framer Motion</p>
            <div style={{ display:'flex', gap:22 }}>
              {['GitHub','LinkedIn','Email'].map((s,i)=>(
                <motion.a key={i} href="#" data-hover whileHover={{ color:'#38bdf8', y:-2 }}
                  style={{ color:'#1e293b', fontSize:12, textDecoration:'none', transition:'color 0.2s' }}>{s}</motion.a>
              ))}
            </div>
          </div>
        </footer>

        {/* ─── BACK TO TOP ─── */}
        <AnimatePresence>
          {backTop && (
            <motion.button data-hover initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:16 }}
              onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
              whileHover={{ scale:1.08 }} whileTap={{ scale:0.92 }}
              style={{ position:'fixed', bottom:28, right:28, zIndex:99, width:44, height:44, borderRadius:12, background:'linear-gradient(135deg,#38bdf8,#818cf8)', border:'none', cursor:'none', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 20px rgba(56,189,248,0.3)', color:'#050914', fontSize:16, fontWeight:700 }}>
              ↑
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}