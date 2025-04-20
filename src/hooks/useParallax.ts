
/**
 * @hook useParallax
 * Hook personalizado para manejar efectos de parallax con GSAP ScrollTrigger
 * Se utiliza para elementos que deben moverse a diferentes velocidades durante el scroll
 * Solo se activa en desktop (≥1024px) según las especificaciones de Havani
 * 
 * @param {Object} options - Opciones para el efecto parallax
 * @return {React.RefObject} - Referencia para adjuntar al elemento a animar
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface ParallaxOptions {
  speed?: number;         // Velocidad del parallax (positivo = hacia abajo, negativo = hacia arriba)
  direction?: 'vertical' | 'horizontal'; // Dirección del movimiento
  start?: string;         // Posición de inicio en ScrollTrigger (ej: "top bottom")
  end?: string;           // Posición de fin en ScrollTrigger (ej: "bottom top")
  scrub?: boolean | number; // Si scrub es true, la animación se vincula directamente al scroll
}

// Valores por defecto para las opciones del parallax
const defaultOptions: ParallaxOptions = {
  speed: 0.5,             // Velocidad moderada por defecto
  direction: 'vertical',  // Vertical por defecto
  start: 'top bottom',    // Inicia cuando la parte superior del elemento toca la parte inferior de la ventana
  end: 'bottom top',      // Termina cuando la parte inferior del elemento toca la parte superior de la ventana
  scrub: 1,               // Suavizado de 1 segundo
};

export function useParallax(options: ParallaxOptions = {}) {
  // Combinar opciones por defecto con las proporcionadas
  const config = { ...defaultOptions, ...options };
  
  // Referencia al elemento a animar
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Solo ejecutar en cliente, no en servidor
    if (typeof window === 'undefined') return;
    
    // Referencia al elemento actual
    const element = elementRef.current;
    if (!element) return;
    
    // Comprobar si estamos en desktop (≥1024px) y si no prefiere reducir movimiento
    const isDesktop = window.innerWidth >= 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // No aplicar parallax en mobile o si se prefiere reducir movimiento
    if (!isDesktop || prefersReducedMotion) return;
    
    // Calcular la distancia del movimiento basada en la velocidad
    const distance = config.speed * 100; // Convertir a porcentaje
    
    // Configurar la propiedad a animar según la dirección
    const propY = config.direction === 'vertical' ? 'y' : null;
    const propX = config.direction === 'horizontal' ? 'x' : null;
    
    // Crear la animación con GSAP
    const parallaxAnimation = gsap.fromTo(
      element,
      {
        [propY as string]: -distance, // Valor inicial
        [propX as string]: -distance,
      },
      {
        [propY as string]: distance, // Valor final
        [propX as string]: distance,
        ease: 'none', // Sin easing para un movimiento lineal
        scrollTrigger: {
          trigger: element,
          start: config.start,
          end: config.end,
          scrub: config.scrub,
        },
      }
    );
    
    // Limpiar la animación cuando el componente se desmonte
    return () => {
      parallaxAnimation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
    
  }, [config]);
  
  return elementRef;
}
