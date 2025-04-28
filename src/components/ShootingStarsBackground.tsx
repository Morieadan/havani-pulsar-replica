
import React, { useEffect, useRef, useState } from "react";

/**
 * @component ShootingStarsBackground
 * Fondo global de estrellas fugaces para toda la aplicación.
 * Cada estrella se renderiza como un punto brillante con una línea de rastro,
 * usando <canvas> para una animación suave y mejor rendimiento.
 */

// Colores para las estrellas y efectos
const STAR_COLOR = "rgba(255,255,255,0.93)"; // Color principal de la estrella
const GLOW_COLOR = "rgba(255,255,255,0.68)"; // Color del brillo/resplandor
const TRAIL_COLOR = "rgba(255,255,255,0.83)"; // Color de la estela
// Gradiente de fondo para el cielo nocturno
const GRADIENT_BG = [
  { color: "#1B1540", stop: 0 },      // Azul oscuro en la parte superior
  { color: "#060E15", stop: 0.57 },   // Azul muy oscuro en el medio
  { color: "#000000", stop: 1 }       // Negro en la parte inferior
];

// Interfaz para definir las propiedades de cada estrella
interface Star {
  x: number;         // Posición X
  y: number;         // Posición Y
  angle: number;     // Ángulo de movimiento
  speed: number;     // Velocidad de movimiento
  trailLength: number; // Longitud de la estela
  progress: number;  // Progreso de la animación (0-1)
  size: number;      // Tamaño de la estrella
  opacity: number;   // Opacidad de la estrella
  alive: boolean;    // Indicador si la estrella sigue activa
}

// Función para generar una nueva estrella con propiedades aleatorias
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

// Función para dibujar el gradiente de fondo en el canvas
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

// Función para dibujar una estrella individual en el canvas
const drawStar = (ctx: CanvasRenderingContext2D, star: Star) => {
  // Calcular el desplazamiento en base al progreso y ángulo
  const dx = Math.cos(star.angle) * star.trailLength * star.progress;
  const dy = Math.sin(star.angle) * star.trailLength * star.progress;

  ctx.save();
  ctx.globalAlpha = star.opacity * 0.93;
  
  // Crear gradiente para la estela
  const trailGradient = ctx.createLinearGradient(star.x - dx, star.y - dy, star.x, star.y);
  trailGradient.addColorStop(0, 'rgba(255,255,255,0)');
  trailGradient.addColorStop(0.4, 'rgba(255,255,255,0.2)');
  trailGradient.addColorStop(0.7, 'rgba(255,255,255,0.6)');
  trailGradient.addColorStop(1, TRAIL_COLOR);
  
  // Dibujar la estela/rastro
  ctx.strokeStyle = trailGradient;
  ctx.lineWidth = 1.5;
  ctx.shadowColor = GLOW_COLOR;
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.moveTo(star.x - dx, star.y - dy);
  ctx.lineTo(star.x, star.y);
  ctx.stroke();
  ctx.restore();

  // Dibujar el punto/cabeza de la estrella
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

  // Verificar preferencias de movimiento reducido del usuario
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShouldAnimate(false);
      return;
    }
    setShouldAnimate(true);
  }, []);

  // Efecto principal para la animación de estrellas
  useEffect(() => {
    if (!shouldAnimate) return;
    let stars: Star[] = [];
    let animationId: number;
    let destroyed = false;

    // Función para generar una nueva estrella
    const spawnStar = (w: number, h: number) => {
      stars.push(generateStar(w, h));
    };

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    let w = window.innerWidth;
    let h = window.innerHeight;

    // Función para ajustar el tamaño del canvas al cambiar el tamaño de la ventana
    const resizeCanvas = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resizeCanvas();

    // Evento para manejar el cambio de tamaño de ventana
    window.addEventListener("resize", resizeCanvas);

    let lastTime = performance.now();
    let spawnAccumulator = 0;

    // Crear estrellas iniciales
    for (let i = 0; i < 5; i++) {
      spawnStar(w, h);
      stars[i].progress = Math.random() * 0.5; // Iniciar con progreso aleatorio
    }

    // Función de animación principal
    const animate = (now: number) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      // Dibujar fondo gradiente
      drawBackgroundGradient(ctx, w, h);

      // Calcular delta de tiempo para animación suave
      const delta = now - lastTime;
      lastTime = now;
      spawnAccumulator += delta;
      
      // Generar nuevas estrellas a intervalos
      if (spawnAccumulator > 220) {
        spawnStar(w, h);
        spawnAccumulator = 0;
      }
      
      // Actualizar progreso de cada estrella
      for (const star of stars) {
        star.progress += delta * star.speed / 450;
        if (star.progress >= 1) {
          star.alive = false;
        }
      }
      
      // Eliminar estrellas "muertas" (que completaron su recorrido)
      stars = stars.filter(s => s.alive);

      // Dibujar todas las estrellas activas
      stars.forEach(star => {
        drawStar(ctx, star);
      });

      // Continuar animación si el componente sigue montado
      if (!destroyed) {
        animationId = requestAnimationFrame(animate);
      }
    };
    
    // Iniciar loop de animación
    animationId = requestAnimationFrame(animate);

    // Limpieza al desmontar el componente
    return () => {
      destroyed = true;
      window.removeEventListener("resize", resizeCanvas);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [shouldAnimate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen z-[-1] pointer-events-none select-none"
      aria-hidden="true"
    />
  );
};

export default ShootingStarsBackground;
