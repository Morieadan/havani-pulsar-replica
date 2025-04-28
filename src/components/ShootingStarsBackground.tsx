import React, { useEffect, useRef, useState } from "react";

/**
 * @component ShootingStarsBackground
 * Fondo global de estrellas fugaces para toda la aplicación.
 * Cada estrella se renderiza como un punto brillante con una línea de rastro,
 * usando <canvas> para una animación suave y mejor rendimiento.
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
  angle: number;
  speed: number;
  trailLength: number;
  progress: number;
  size: number;
  opacity: number;
  alive: boolean;
}

const generateStar = (w: number, h: number): Star => {
  const size = Math.random() * 2 + 1.5;
  const angle = Math.random() * Math.PI * 0.5 - Math.PI * 0.25;
  const startX = Math.random() * w;
  const startY = Math.random() * (h * 0.85);
  const trailLength = Math.random() * 280 + 180;
  const speed = Math.random() * 0.6 + 0.78;
  return {
    x: startX,
    y: startY,
    angle,
    speed,
    trailLength,
    progress: 0,
    size,
    opacity: Math.random() * 0.18 + 0.77,
    alive: true
  };
};

const drawBackgroundGradient = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
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
  const dx = Math.cos(star.angle) * star.trailLength * star.progress;
  const dy = Math.sin(star.angle) * star.trailLength * star.progress;

  ctx.save();
  ctx.globalAlpha = star.opacity * 0.93;
  
  const trailGradient = ctx.createLinearGradient(star.x - dx, star.y - dy, star.x, star.y);
  trailGradient.addColorStop(0, 'rgba(255,255,255,0)');
  trailGradient.addColorStop(0.4, 'rgba(255,255,255,0.2)');
  trailGradient.addColorStop(0.7, 'rgba(255,255,255,0.6)');
  trailGradient.addColorStop(1, TRAIL_COLOR);
  
  ctx.strokeStyle = trailGradient;
  ctx.lineWidth = 1.5;
  ctx.shadowColor = GLOW_COLOR;
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.moveTo(star.x - dx, star.y - dy);
  ctx.lineTo(star.x, star.y);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = star.opacity;
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.size * 1.2, 0, Math.PI * 2);
  ctx.fillStyle = STAR_COLOR;
  ctx.shadowColor = GLOW_COLOR;
  ctx.shadowBlur = 20;
  ctx.fill();
  ctx.restore();
};

const ShootingStarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);

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

    for (let i = 0; i < 5; i++) {
      spawnStar(w, h);
      stars[i].progress = Math.random() * 0.5;
    }

    const animate = (now: number) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      drawBackgroundGradient(ctx, w, h);

      const delta = now - lastTime;
      lastTime = now;
      spawnAccumulator += delta;
      
      if (spawnAccumulator > 220) {
        spawnStar(w, h);
        spawnAccumulator = 0;
      }
      
      for (const star of stars) {
        star.progress += delta * star.speed / 450;
        if (star.progress >= 1) {
          star.alive = false;
        }
      }
      
      stars = stars.filter(s => s.alive);

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

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen z-[-20] pointer-events-none select-none"
      aria-hidden="true"
    />
  );
};

export default ShootingStarsBackground;
