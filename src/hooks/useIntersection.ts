
/**
 * @hook useIntersection
 * Hook personalizado para manejar la detección de intersección con el viewport
 * Utilizado para activar animaciones cuando un elemento es visible
 * 
 * @param {Object} options - Opciones para el IntersectionObserver
 * @param {Function} callback - Función a ejecutar cuando ocurre la intersección
 * @return {React.RefObject} - Referencia para adjuntar al elemento a observar
 */

import { useEffect, useRef, useState, useCallback } from 'react';

// Opciones por defecto para las animaciones de Havani siguiendo estilo Pulsar
// threshold 0.4 significa que el elemento debe estar 40% visible en el viewport
const defaultOptions = {
  root: null, // viewport
  rootMargin: '0px',
  threshold: 0.4, // 40% visible en el viewport
  once: true, // Solo se dispara una vez
};

export function useIntersection(
  callback: (entry: IntersectionObserverEntry) => void,
  options = defaultOptions
) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);
  const [hasIntersected, setHasIntersected] = useState(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      // Si el elemento está intersectando con el viewport
      if (entry.isIntersecting) {
        callback(entry);
        
        // Si la opción once está activada, desconectar después de la primera intersección
        if (options.once) {
          setHasIntersected(true);
          
          // Desconectar el observador para liberar recursos
          if (observerRef.current && elementRef.current) {
            observerRef.current.unobserve(elementRef.current);
          }
        }
      }
    },
    [callback, options.once]
  );

  useEffect(() => {
    // Si ya ha intersectado y la opción once está activada, no hacer nada
    if (options.once && hasIntersected) return;

    const observer = new IntersectionObserver(handleIntersection, options);
    observerRef.current = observer;

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Limpiar el observador cuando el componente se desmonte
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [handleIntersection, options, hasIntersected]);

  // Si prefers-reduced-motion está activado, ejecutar callback inmediatamente
  // para usuarios que prefieren menos animaciones
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion && !hasIntersected && options.once) {
      // Crear un mock completo de IntersectionObserverEntry para prefersReducedMotion
      const mockEntry = {
        isIntersecting: true,
        target: elementRef.current,
        boundingClientRect: new DOMRect(),
        intersectionRatio: 1,
        intersectionRect: new DOMRect(),
        rootBounds: null,
        time: Date.now()
      } as unknown as IntersectionObserverEntry;
      
      callback(mockEntry);
      setHasIntersected(true);
    }
  }, [callback, hasIntersected, options.once]);

  return elementRef;
}
