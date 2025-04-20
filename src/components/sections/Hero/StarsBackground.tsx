
/**
 * @component StarsBackground - Fondo animado de estrellas fugaces
 * Este componente genera y anima las estrellas del fondo del Hero.
 * Las estrellas aparecen como delicados puntos que dejan una estela al cruzar.
 * Se pausan en dispositivos con preferencia de reducción de movimiento.
 * 
 * Prompt 1 - Hero v4
 */

import React, { useEffect, useRef, useState } from 'react';

const StarsBackground = () => {
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  
  useEffect(() => {
    // Verificar preferencias de movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setShouldAnimate(false);
      return;
    }
    
    const container = starsContainerRef.current;
    if (!container) return;
    
    // Función para generar estrellas aleatorias
    const createStar = () => {
      if (!shouldAnimate || !container) return;
      
      // Crear elemento de estrella
      const star = document.createElement('div');
      
      // Configurar tamaño de la estrella (más pequeño y delicado)
      const width = Math.random() * 0.8 + 0.4; // 0.4-1.2px
      const height = Math.random() * 4 + 6; // 6-10px
      
      // Posición aleatoria dentro del contenedor
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * (window.innerHeight * 0.8);
      
      // Ángulo y distancia aleatorios para la animación
      const angle = Math.random() * Math.PI * 0.5 - Math.PI * 0.25; // -45° a 45°
      const distance = Math.random() * 300 + 200; // 200-500px
      const speed = Math.random() * 0.6 + 0.7; // 0.7-1.3s
      
      // Calcular punto final
      const endX = startX + Math.cos(angle) * distance;
      const endY = startY + Math.sin(angle) * distance;
      
      // Estilo base de la estrella
      star.style.position = 'absolute';
      star.style.width = `${width}px`;
      star.style.height = `${height}px`;
      star.style.borderRadius = '50%';
      star.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
      star.style.filter = 'blur(0.6px)';
      star.style.mixBlendMode = 'screen';
      star.style.boxShadow = '0 0 3px rgba(255, 255, 255, 0.8)';
      star.style.willChange = 'transform, opacity';
      star.style.opacity = '0';
      
      // Posición inicial
      star.style.left = `${startX}px`;
      star.style.top = `${startY}px`;
      
      // Añadir al contenedor
      container.appendChild(star);
      
      // Animación con transiciones CSS
      requestAnimationFrame(() => {
        star.style.transition = `transform ${speed}s cubic-bezier(.4,0,.2,1), opacity ${speed}s ease-in-out`;
        star.style.opacity = '1';
        star.style.transform = `translate(${endX - startX}px, ${endY - startY}px)`;
        
        // Crear efecto de estela
        star.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)';
        
        // Eliminar después de la animación
        setTimeout(() => {
          if (container.contains(star)) {
            container.removeChild(star);
          }
        }, speed * 1000);
      });
    };
    
    // Crear estrellas iniciales
    for (let i = 0; i < 4; i++) {
      setTimeout(() => createStar(), i * 200);
    }
    
    // Generar estrellas a intervalos
    const interval = setInterval(createStar, 260);
    
    // Observador para pausar cuando no es visible
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setShouldAnimate(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(container);
    
    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [shouldAnimate]);
  
  return (
    <div 
      ref={starsContainerRef} 
      className="absolute inset-0 overflow-hidden z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default StarsBackground;
