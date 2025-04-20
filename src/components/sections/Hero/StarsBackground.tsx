
/**
 * @component StarsBackground - Fondo animado de estrellas fugaces
 * Este componente genera y anima las estrellas del fondo del Hero.
 * Las estrellas aparecen en posiciones aleatorias y se animan con un efecto de "shooting star".
 * Se pausan en dispositivos con preferencia de reducción de movimiento.
 * 
 * Prompt 1 - Hero
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const StarsBackground = () => {
  // Referencia al contenedor de estrellas
  const starsContainerRef = useRef<HTMLDivElement>(null);
  
  // Estado para controlar si se deben crear estrellas
  const [shouldAnimate, setShouldAnimate] = useState(true);
  
  useEffect(() => {
    // Verificar preferencias de movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setShouldAnimate(false);
      return;
    }
    
    // Referencia al contenedor
    const container = starsContainerRef.current;
    if (!container) return;
    
    // Función para generar estrellas aleatorias
    const createStar = () => {
      if (!shouldAnimate || !container) return;
      
      // Crear elemento de estrella
      const star = document.createElement('div');
      
      // Dimensiones aleatorias para la estrella
      const width = Math.random() * 1 + 1; // 1-2px
      const height = Math.random() * 6 + 8; // 8-14px
      
      // Posición aleatoria dentro del contenedor
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * (window.innerHeight * 0.8); // Solo en el 80% superior
      
      // Dirección y distancia aleatorias para la animación
      const angle = Math.random() * Math.PI * 2; // 0-360 grados en radianes
      const distance = Math.random() * 200 + 100; // 100-300px
      const speed = Math.random() * 0.4 + 0.7; // 0.7-1.1s
      
      // Calcular punto final
      const endX = startX + Math.cos(angle) * distance;
      const endY = startY + Math.sin(angle) * distance;
      
      // Configurar propiedades de CSS
      star.style.position = 'absolute';
      star.style.width = `${width}px`;
      star.style.height = `${height}px`;
      star.style.borderRadius = '9999px';
      star.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
      star.style.filter = 'blur(2px)';
      star.style.mixBlendMode = 'screen';
      star.style.willChange = 'transform, opacity';
      star.style.opacity = '0';
      
      // Establecer posición inicial
      star.style.left = `${startX}px`;
      star.style.top = `${startY}px`;
      
      // Añadir al contenedor
      container.appendChild(star);
      
      // Animación con transiciones CSS
      setTimeout(() => {
        star.style.transition = `transform ${speed}s cubic-bezier(.4,0,.2,1), opacity ${speed}s cubic-bezier(.4,0,.2,1)`;
        star.style.opacity = '1';
        star.style.transform = `translate(${endX - startX}px, ${endY - startY}px)`;
        
        // Eliminar después de la animación
        setTimeout(() => {
          if (container.contains(star)) {
            container.removeChild(star);
          }
        }, speed * 1000);
      }, 10);
    };
    
    // Crear estrellas iniciales (batch inicial)
    for (let i = 0; i < 6; i++) {
      setTimeout(() => createStar(), i * 100);
    }
    
    // Generar estrellas a intervalos regulares
    const interval = setInterval(createStar, 260);
    
    // Observador de intersección para pausar cuando no es visible
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setShouldAnimate(entry.isIntersecting);
      },
      { threshold: 0.1 } // Pausar cuando menos del 10% es visible
    );
    
    observer.observe(container);
    
    // Limpieza
    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [shouldAnimate]);
  
  return (
    <div 
      ref={starsContainerRef} 
      className="absolute inset-0 overflow-hidden z-0"
      aria-hidden="true"
    />
  );
};

export default StarsBackground;
