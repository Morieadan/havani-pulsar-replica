
import React, { useEffect, useRef, useState } from "react";

/**
 * Global background of shooting stars for the entire app.
 * Each shooting star is rendered as a glowing dot with a trailing line,
 * using a <canvas> for smooth animation and performance.
 */

const STAR_COLOR = "rgba(255,255,255,0.93)";
const GLOW_COLOR = "rgba(255,255,255,0.68)";
const TRAIL_COLOR = "rgba(255,255,255,0.83)";
const GRADIENT_BG = [
  { color: "#1B1540", stop: 0 },
  { color: "#060E15", stop: 0.57 },
  { color: "#000000", stop: 1 }
];

interface Star {
  x: number;
  y: number;
  angle: number; // radians
  speed: number;
  trailLength: number;
  progress: number; // 0..1
  size: number;
  opacity: number;
  alive: boolean;
}

const generateStar = (w: number, h: number): Star => {
  const size = Math.random() * 2 + 1.5; // Size of the "head" (2-3.5px), more evident than base
  const angle = Math.random() * Math.PI * 0.5 - Math.PI * 0.25; // -45º a 45º
  const startX = Math.random() * w;
  const startY = Math.random() * (h * 0.85);
  const trailLength = Math.random() * 280 + 180; // 180-460px
  const speed = Math.random() * 0.6 + 0.78; // px/ms, slightly more lively
  return {
    x: startX,
    y: startY,
    angle,
    speed,
    trailLength,
    progress: 0,
    size,
    opacity: Math.random() * 0.18 + 0.77, // 0.77-0.95
    alive: true
  };
};

const drawBackgroundGradient = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
  // Radial gradient as in hero background
  const grad = ctx.createRadialGradient(
    w * 0.5, h * 0.04, w * 0.20,
    w * 0.5, h * 0.55, w * 1
  );
  for (const stop of GRADIENT_BG) {
    grad.addColorStop(stop.stop, stop.color);
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
};

const drawStar = (ctx: CanvasRenderingContext2D, star: Star) => {
  // Trail
  const dx = Math.cos(star.angle) * star.trailLength * star.progress;
  const dy = Math.sin(star.angle) * star.trailLength * star.progress;

  // Draw trail (thin fading line)
  ctx.save();
  ctx.globalAlpha = star.opacity * 0.93;
  ctx.strokeStyle = TRAIL_COLOR;
  ctx.lineWidth = 1.1;
  ctx.shadowColor = GLOW_COLOR;
  ctx.shadowBlur = 7;
  ctx.beginPath();
  ctx.moveTo(star.x - dx, star.y - dy);
  ctx.lineTo(star.x, star.y);
  ctx.stroke();
  ctx.restore();

  // Draw star head (bright glow as in the reference)
  ctx.save();
  ctx.globalAlpha = star.opacity;
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.size * 1.05, 0, Math.PI * 2);
  ctx.fillStyle = STAR_COLOR;
  ctx.shadowColor = GLOW_COLOR;
  ctx.shadowBlur = 18;
  ctx.fill();
  ctx.restore();
};

const ShootingStarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  // Handle animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShouldAnimate(false);
      return;
    }
    setShouldAnimate(true);
  }, []);

  useEffect(() => {
    if (!shouldAnimate) return;
    let stars: Star[] = [];
    let animationId: number;
    let destroyed = false;

    const spawnStar = (w: number, h: number) => {
      stars.push(generateStar(w, h));
    };

    const canvas = canvasRef.current;
    if (!canvas) return;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resizeCanvas = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    let lastTime = performance.now();
    let spawnAccumulator = 0;

    const animate = (now: number) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      // BG
      drawBackgroundGradient(ctx, w, h);

      // New star spawn timer
      const delta = now - lastTime;
      lastTime = now;
      spawnAccumulator += delta;
      // About every 250ms
      if (spawnAccumulator > 220) {
        spawnStar(w, h);
        spawnAccumulator = 0;
      }
      // Animate stars
      for (const star of stars) {
        star.progress += delta * star.speed / 450;
        if (star.progress >= 1) {
          star.alive = false;
        }
      }
      // Filter dead
      stars = stars.filter(s => s.alive);

      // Draw
      stars.forEach(star => {
        drawStar(ctx, star);
      });

      if (!destroyed) {
        animationId = requestAnimationFrame(animate);
      }
    };
    animationId = requestAnimationFrame(animate);

    return () => {
      destroyed = true;
      window.removeEventListener("resize", resizeCanvas);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [shouldAnimate]);

  // Background style: covers all, pointer-events none, fixed always, super behind
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen z-[-20] pointer-events-none select-none"
      aria-hidden="true"
      style={{
        position: "fixed",
        left: 0, top: 0, width: "100vw", height: "100vh",
        zIndex: -20,
        pointerEvents: "none",
        userSelect: "none",
        background: "transparent",
      }}
    />
  );
};

export default ShootingStarsBackground;
