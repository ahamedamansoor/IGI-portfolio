import { useEffect, useRef } from 'react';

/* ─── Palette ─────────────────────────────────────────────── */
const PALETTE = [
  { r: 6,   g: 182, b: 212 },   // cyan
  { r: 139, g: 92,  b: 246 },   // violet
  { r: 236, g: 72,  b: 153 },   // pink
  { r: 16,  g: 185, b: 129 },   // emerald
  { r: 99,  g: 102, b: 241 },   // indigo
];

function lerp(a, b, t) { return a + (b - a) * t; }

function lerpColor(c1, c2, t) {
  return {
    r: Math.round(lerp(c1.r, c2.r, t)),
    g: Math.round(lerp(c1.g, c2.g, t)),
    b: Math.round(lerp(c1.b, c2.b, t)),
  };
}

function rgba(c, a) { return `rgba(${c.r},${c.g},${c.b},${a})`; }

/* ─── Pick palette color pair from scroll ─────────────────── */
function paletteForScroll(s) {
  const n = PALETTE.length - 1;
  const idx = s * n;
  const i = Math.min(Math.floor(idx), n - 1);
  return {
    A: lerpColor(PALETTE[i], PALETTE[i + 1], idx - i),
    B: lerpColor(PALETTE[(i + 1) % n], PALETTE[(i + 2) % n], idx - i),
  };
}

/* ─── Hex grid helpers ─────────────────────────────────────── */
function drawHexGrid(ctx, w, h, size, color, alpha) {
  const dx = size * 2;
  const dy = size * Math.sqrt(3);
  ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`;
  ctx.lineWidth = 0.5;

  for (let row = -1; row < Math.ceil(h / dy) + 1; row++) {
    for (let col = -1; col < Math.ceil(w / dx) + 1; col++) {
      const cx = col * dx + (row % 2 === 0 ? 0 : size);
      const cy = row * dy;
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const angle = (Math.PI / 180) * (60 * k - 30);
        const x = cx + size * Math.cos(angle);
        const y = cy + size * Math.sin(angle);
        k === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }
}

/* ─── Ripple class (click burst) ─────────────────────────── */
class Ripple {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.r = 0;
    this.maxR = 220;
    this.alpha = 0.9;
    this.speed = 6;
    this.dead = false;
  }
  update() {
    this.r += this.speed;
    this.alpha = 0.9 * (1 - this.r / this.maxR);
    if (this.r >= this.maxR) this.dead = true;
  }
  draw(ctx) {
    // Outer shockwave ring
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(this.color, this.alpha);
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 18;
    ctx.shadowColor = rgba(this.color, 0.6);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Inner fill fades quickly
    const innerGrad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
    innerGrad.addColorStop(0, rgba(this.color, this.alpha * 0.25));
    innerGrad.addColorStop(1, rgba(this.color, 0));
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = innerGrad;
    ctx.fill();
  }
}

/* ─── Matrix rain stream ─────────────────────────────────── */
class MatrixStream {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.reset();
  }
  reset() {
    this.x = Math.random() * this.w;
    this.y = -Math.random() * this.h;
    this.speed = Math.random() * 1.6 + 0.6;
    this.len = Math.floor(Math.random() * 18 + 8);
    this.chars = Array.from({ length: this.len }, () =>
      Math.random() > 0.5 ? '1' : '0'
    );
    this.size = Math.floor(Math.random() * 7 + 8);
  }
  update() {
    this.y += this.speed;
    if (this.y > this.h + 200) this.reset();
  }
  draw(ctx, color) {
    ctx.fillStyle = rgba(color, 0.02);
    ctx.font = `${this.size}px "Share Tech Mono", monospace`;
    this.chars.forEach((c, i) => {
      ctx.fillText(c, this.x, this.y + i * this.size * 1.2);
    });
  }
}

/* ─── Particle ───────────────────────────────────────────── */
class Particle {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.9;
    this.vy = (Math.random() - 0.5) * 0.9;
    this.r = Math.random() * 1.8 + 0.8;
  }
  update(mx, my) {
    if (mx !== null) {
      const dx = mx - this.x;
      const dy = my - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 280 && dist > 0) {
        const force = (1 - dist / 280) * 0.18;
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
      }
    }
    // Speed cap + friction
    const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    const maxSpd = 2.2;
    if (spd > maxSpd) { this.vx = (this.vx / spd) * maxSpd; this.vy = (this.vy / spd) * maxSpd; }
    this.vx *= 0.978;
    this.vy *= 0.978;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > this.w) this.vx = -this.vx;
    if (this.y < 0 || this.y > this.h) this.vy = -this.vy;
  }
  draw(ctx, c) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = rgba(c, 0.85);
    ctx.shadowBlur = 6;
    ctx.shadowColor = rgba(c, 0.6);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

/* ═══════════════════════════════════════════════════════════ */
export default function FuturisticBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;

    const mouse = { x: null, y: null, tx: null, ty: null };
    let scroll = 0;
    let ripples = [];
    const PARTICLE_COUNT = 90;
    const STREAM_COUNT = 30;
    const HEX_SIZE = 42;
    const CONNECT_DIST = 145;

    /* ── Resize ─────────────────────────────────────────── */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Particle + stream pools ─────────────────────────── */
    let particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle(canvas.width, canvas.height));
    let streams   = Array.from({ length: STREAM_COUNT }, () => new MatrixStream(canvas.width, canvas.height));

    /* ── Event handlers ─────────────────────────────────── */
    const onMove = (e) => { mouse.tx = e.clientX; mouse.ty = e.clientY; };
    const onLeave = () => { mouse.tx = null; mouse.ty = null; };
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) scroll = Math.min(window.scrollY / total, 1);
    };
    const onClick = (e) => {
      // spawn 2 concentric ripples at click point
      const { A, B } = paletteForScroll(scroll);
      ripples.push(new Ripple(e.clientX, e.clientY, A));
      setTimeout(() => ripples.push(new Ripple(e.clientX, e.clientY, B)), 120);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('click', onClick);

    /* ── Hex pulse state ─────────────────────────────────── */
    let hexPulse = 0;

    /* ── Main loop ───────────────────────────────────────── */
    const draw = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);

      /* Smooth mouse spring */
      if (mouse.tx !== null) {
        mouse.x = mouse.x === null ? mouse.tx : lerp(mouse.x, mouse.tx, 0.1);
        mouse.y = mouse.y === null ? mouse.ty : lerp(mouse.y, mouse.ty, 0.1);
      } else {
        mouse.x = null;
        mouse.y = null;
      }

      const { A, B } = paletteForScroll(scroll);

      /* 1 ─ Matrix rain background */
      streams.forEach((s) => { s.update(); s.draw(ctx, A); });

      /* 2 ─ Hex grid (pulses in/out to create depth) */
      hexPulse += 0.012;
      const hexAlpha = 0.03 + Math.sin(hexPulse) * 0.015;
      drawHexGrid(ctx, W, H, HEX_SIZE, A, hexAlpha);

      /* 3 ─ Particles */
      particles.forEach((p) => {
        p.w = W; p.h = H;
        p.update(mouse.x, mouse.y);
        p.draw(ctx, A);
      });

      /* 4 ─ Connection lines between nearby particles */
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        /* Mouse connection */
        if (mouse.x !== null) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST * 1.8) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            const a = 0.28 * (1 - d / (CONNECT_DIST * 1.8));
            ctx.strokeStyle = rgba(A, a);
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }

        /* Particle–particle connections with gradient colour shift */
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const a = 0.18 * (1 - d / CONNECT_DIST);
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, rgba(A, a));
            grad.addColorStop(1, rgba(B, a));
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      /* 5 ─ Ripple shockwaves */
      ripples = ripples.filter((r) => !r.dead);
      ripples.forEach((r) => { r.update(); r.draw(ctx); });

      /* 6 ─ Radial ambient glow at mouse */
      if (mouse.x !== null) {
        const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
        grd.addColorStop(0, rgba(A, 0.09));
        grd.addColorStop(1, rgba(A, 0));
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        pointerEvents: 'none',
        background: '#000000',
      }}
    />
  );
}
