
/**
 * @component AnimatedSection
 * 
 * Componente base para secciones con animación al hacer scroll
 * Se utiliza como wrapper para cualquier sección que necesite animarse cuando sea visible
 * Implementa el patrón de animación estándar de Havani (Pulsar template)
 */

import { ReactNode, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-in' | 'fade-in';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  as?: 'section' | 'div' | 'article';
}

const AnimatedSection = ({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  duration = 0.55, // Timing estándar: 0.55s según especificaciones
  threshold = 0.4, // 40% visible en viewport según especificaciones
  once = true,
  as = 'section',
}: AnimatedSectionProps) => {
  
  // Estado de visibilidad del componente
  const [isVisible, setIsVisible] = useState(false);
  // Ref para el elemento a observar
  const [ref, setRef] = useState<HTMLElement | null>(null);
  
  // Configurar el intersection observer
  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Si la opción once está activada, desconectar después de la primera intersección
          if (once) {
            observer.unobserve(ref);
          }
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: threshold
      }
    );
    
    observer.observe(ref);
    
    // Limpiar el observador cuando el componente se desmonte
    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, threshold, once]);
  
  // Si prefers-reduced-motion está activado, mostrar directamente sin animación
  useEffect(() => {
    const prefersReducedMotion = 
      typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsVisible(true);
    }
  }, []);

  // Opciones de animación según el tipo seleccionado
  const getAnimationVariants = () => {
    // Easing estándar de Havani: cubic-bezier(.25,.8,.25,1)
    const easing = [0.25, 0.8, 0.25, 1];
    
    // Verificamos si el usuario prefiere reducir movimiento
    const prefersReducedMotion = 
      typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Para reducción de movimiento, solo hacemos fade sin transformación
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration, delay, ease: easing }
        }
      };
    }
    
    // Diferentes variantes según la animación seleccionada
    switch (animation) {
      case 'fade-up':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration, delay, ease: easing }
          }
        };
      case 'fade-down':
        return {
          hidden: { opacity: 0, y: -20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration, delay, ease: easing }
          }
        };
      case 'fade-left':
        return {
          hidden: { opacity: 0, x: 20 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration, delay, ease: easing }
          }
        };
      case 'fade-right':
        return {
          hidden: { opacity: 0, x: -20 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration, delay, ease: easing }
          }
        };
      case 'scale-in':
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration, delay, ease: easing }
          }
        };
      case 'fade-in':
      default:
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { duration, delay, ease: easing }
          }
        };
    }
  };
  
  // Crear el componente basado en el tag solicitado
  const MotionComponent = motion[as];
  
  return (
    <MotionComponent
      ref={setRef}
      className={className}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={getAnimationVariants()}
      // Atributos de accesibilidad
      aria-hidden={!isVisible}
    >
      {children}
    </MotionComponent>
  );
};

export default AnimatedSection;
