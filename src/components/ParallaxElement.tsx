
/**
 * @component ParallaxElement
 * 
 * Componente para aplicar efectos de parallax a elementos al hacer scroll
 * Utiliza GSAP para crear efectos de movimiento suaves a diferentes velocidades
 * Solo se activa en pantallas de escritorio (≥1024px) según las especificaciones de Havani
 */

import { ReactNode, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface ParallaxElementProps {
  children: ReactNode;
  className?: string;
  speed?: number; // Velocidad del efecto parallax (-1 a 1, negativo sube, positivo baja)
  direction?: 'vertical' | 'horizontal'; // Dirección del movimiento
  container?: boolean; // Si el elemento es un contenedor para otros elementos con parallax
  mobileDisabled?: boolean; // Si el parallax debe desactivarse en móviles (por defecto: true)
}

const ParallaxElement = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'vertical',
  container = false,
  mobileDisabled = true,
}: ParallaxElementProps) => {
  // Referencia al elemento que tendrá el efecto parallax
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Solo ejecutar en cliente, no en servidor
    if (typeof window === 'undefined') return;
    
    const element = elementRef.current;
    if (!element) return;
    
    // Comprobar si estamos en desktop y si no prefiere reducir movimiento
    const isDesktop = window.innerWidth >= 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // No aplicar parallax en mobile (si está desactivado) o si se prefiere reducir movimiento
    if ((mobileDisabled && !isDesktop) || prefersReducedMotion) return;
    
    // Añadir data-attribute para documentación/debugging
    element.setAttribute('data-parallax-speed', speed.toString());
    element.setAttribute('data-parallax-direction', direction);
    
    // Calcular la distancia del movimiento
    const distance = speed * 100; // En píxeles
    
    // Crear la animación dependiendo de la dirección
    if (direction === 'vertical') {
      gsap.fromTo(
        element,
        { y: -distance }, // Punto de inicio
        {
          y: distance, // Punto final
          ease: 'none', // Sin easing para que sea lineal con el scroll
          scrollTrigger: {
            trigger: element,
            start: 'top bottom', // Empezar cuando el top del elemento toca bottom del viewport
            end: 'bottom top', // Terminar cuando el bottom del elemento toca top del viewport
            scrub: 1, // Suavizar el efecto (1 = 1 segundo)
            // markers: true, // Para debugging, comentar en producción
          }
        }
      );
    } else {
      gsap.fromTo(
        element,
        { x: -distance }, // Punto de inicio
        {
          x: distance, // Punto final
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        }
      );
    }
    
    // Limpiar animación al desmontar el componente
    return () => {
      const triggers = ScrollTrigger.getAll();
      triggers.forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed, direction, mobileDisabled]);
  
  // Clases adicionales para el contenedor si es necesario
  const containerClass = container ? 'overflow-hidden' : '';
  
  return (
    <div 
      ref={elementRef}
      className={`${className} ${containerClass}`}
      // Añadir atributos de accesibilidad
      aria-hidden={container ? 'false' : 'true'}
    >
      {children}
    </div>
  );
};

export default ParallaxElement;
