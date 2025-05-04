
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
  
  // Hook para detectar cuando el componente está visible
  const isVisible = useIntersection(
    (entry) => {},
    { threshold: 0.1, once: false }
  );
  
  // Manejar movimiento del ratón
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!containerRef.current) return;
      
      // Obtener dimensiones y posición del contenedor
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calcular posición normalizada del ratón relativa al centro del contenedor
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      setMousePosition({ x, y });
    };
    
    // Registrar evento global de movimiento del ratón
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Para dispositivos táctiles, usar un valor predeterminado
  useEffect(() => {
    // Detectar si es dispositivo táctil
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
      // En dispositivos táctiles, configurar una animación automática
      let frame;
      const animate = () => {
        const time = Date.now() * 0.001;
        // Simular movimiento circular del mouse
        const x = Math.sin(time * 0.5) * 0.5;
        const y = Math.cos(time * 0.5) * 0.5;
        setMousePosition({ x, y });
        frame = requestAnimationFrame(animate);
      };
      
      frame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frame);
    }
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]} // Optimizar rendimiento en dispositivos de alta densidad
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance' 
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <BrainParticles mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default BrainScene;
