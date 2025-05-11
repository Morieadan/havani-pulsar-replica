
/**
 * @component BrainScene - Escena 3D que contiene el cerebro de partículas
 * Este componente configura el canvas de Three.js y maneja la interacción del mouse.
 */

import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import BrainParticles from './BrainParticles';
import { useIntersection } from '@/hooks/useIntersection';

const BrainScene = () => {
  // Estado para rastrear la posición del ratón normalizada (-1 a 1)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Referencia al contenedor para calcular posiciones relativas
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Callback para el hook useIntersection
  const handleIntersection = (entry: IntersectionObserverEntry) => {
    console.log("BrainScene is visible:", entry.isIntersecting);
  };
  
  // Hook para detectar cuando el componente está visible
  const elementRef = useIntersection(
    handleIntersection,
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
      once: false
    }
  );
  
  // Manejar movimiento del ratón
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      // Obtener dimensiones y posición del contenedor
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calcular posición normalizada del ratón relativa al centro del contenedor
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Limitar valores extremos para evitar dispersión excesiva
      const clampedX = Math.max(-0.8, Math.min(0.8, x));
      const clampedY = Math.max(-0.8, Math.min(0.8, y));
      
      setMousePosition({ x: clampedX, y: clampedY });
    };
    
    // Registrar evento global de movimiento del ratón
    window.addEventListener('mousemove', handleMouseMove);
    
    // Establecer posición inicial para garantizar que se vea algo
    setMousePosition({ x: 0.3, y: 0.3 });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Para dispositivos táctiles, usar una animación automática
  useEffect(() => {
    // Detectar si es dispositivo táctil
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
      // En dispositivos táctiles, configurar una animación automática
      let frame: number;
      const animate = () => {
        const time = Date.now() * 0.0005;
        // Simular movimiento circular del mouse con valores más limitados
        const x = Math.sin(time * 0.5) * 0.3;
        const y = Math.cos(time * 0.5) * 0.3;
        setMousePosition({ x, y });
        frame = requestAnimationFrame(animate);
      };
      
      frame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frame);
    }
  }, []);

  // Verificar que el componente se está montando correctamente
  useEffect(() => {
    console.log("BrainScene mounted, container ref:", containerRef.current ? "exists" : "null");
    return () => {
      console.log("BrainScene unmounted");
    };
  }, []);

  // Configurar ref para el contenedor
  const setRefs = (el: HTMLDivElement | null) => {
    // Asignar la ref al contenedor
    containerRef.current = el;
    // Asignar la ref para el hook de intersección
    if (elementRef) {
      (elementRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    }
  };
  
  return (
    <div 
      ref={setRefs}
      className="absolute inset-0 w-full h-full"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 2]} // Optimizar rendimiento en dispositivos de alta densidad
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true
        }}
      >
        {/* Luces ambientales potentes para mejor visibilidad */}
        <ambientLight intensity={8.0} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={20.0} color="#ff3030" />
        <pointLight position={[-10, -10, -10]} intensity={15.0} color="#ff1010" />
        
        <BrainParticles mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default BrainScene;
