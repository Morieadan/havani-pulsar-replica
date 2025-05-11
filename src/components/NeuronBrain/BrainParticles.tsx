
/**
 * @component BrainParticles - Componente que renderiza un cerebro 3D con efecto de partículas
 * Este componente utiliza Three.js y React Three Fiber para crear una visualización 3D interactiva
 * de un cerebro que se descompone y reconstruye con partículas basado en la posición del cursor.
 */

import { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Número de partículas para renderizar el cerebro
const PARTICLE_COUNT = 7500; // Reducido para mejor rendimiento
// Distancia máxima de dispersión al alejar el cursor
const MAX_DISPERSION = 5;
// Velocidad de transición entre estados
const TRANSITION_SPEED = 0.05;

interface BrainParticlesProps {
  mousePosition: { x: number; y: number };
}

const BrainParticles = ({ mousePosition }: BrainParticlesProps) => {
  // Referencias para el grupo y las partículas
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  // Estado para la dispersión actual (0 = cerebro formado, 1 = totalmente disperso)
  const [dispersion, setDispersion] = useState(0);
  
  // Crear posiciones originales y posiciones de dispersión para las partículas
  const { positions, originalPositions, dispersedPositions, colors, indices } = useMemo(() => {
    console.log("Creating brain particles");
    // Creamos arrays para almacenar las posiciones y colores
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const dispersedPositions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const indices = new Uint16Array(PARTICLE_COUNT);
    
    // Generar forma base del cerebro (esfera distorsionada)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribución en forma esférica distorsionada para simular cerebro
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      // Radio base con variación para crear la forma del cerebro
      const radius = 2.0 + Math.random() * 0.3; // Aumentado tamaño base
      
      // Añadir distorsión para crear las "arrugas" y lóbulos del cerebro
      const noise = Math.sin(theta * 8) * 0.15 + Math.sin(phi * 6) * 0.15;
      const adjustedRadius = radius * (1 + noise);
      
      const x = adjustedRadius * Math.sin(phi) * Math.cos(theta);
      const y = adjustedRadius * Math.sin(phi) * Math.sin(theta) * 1.2; // Escalar verticalmente
      const z = adjustedRadius * Math.cos(phi) * 0.8; // Comprimir profundidad
      
      // Posiciones originales (cerebro formado)
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y + 0.5; // Elevar ligeramente el cerebro
      originalPositions[i * 3 + 2] = z;
      
      // Posiciones iniciales
      positions[i * 3] = originalPositions[i * 3];
      positions[i * 3 + 1] = originalPositions[i * 3 + 1];
      positions[i * 3 + 2] = originalPositions[i * 3 + 2];
      
      // Posiciones dispersas (cuando el cerebro se desintegra)
      const disperseVector = new THREE.Vector3(x, y, z).normalize().multiplyScalar(MAX_DISPERSION);
      dispersedPositions[i * 3] = disperseVector.x * (1 + Math.random() * 0.5);
      dispersedPositions[i * 3 + 1] = disperseVector.y * (1 + Math.random() * 0.5);
      dispersedPositions[i * 3 + 2] = disperseVector.z * (1 + Math.random() * 0.5);
      
      // Color rojo neón intensificado con brillo - Aumentada intensidad para maximizar visibilidad
      const intensity = 1.8 + Math.random() * 0.5; // Mayor intensidad para mejor visibilidad
      colors[i * 3] = 1.0 * intensity; // R (rojo máximo)
      colors[i * 3 + 1] = 0.1 * intensity; // G (reducido para un rojo más puro)
      colors[i * 3 + 2] = 0.1 * intensity; // B (reducido para un rojo más puro)
      
      indices[i] = i;
    }
    
    return { positions, originalPositions, dispersedPositions, colors, indices };
  }, []);
  
  // Actualizar dispersión basada en la posición del ratón
  useEffect(() => {
    if (!mousePosition) return;
    
    // Calcular distancia normalizada del cursor al centro
    const distanceFromCenter = Math.sqrt(
      mousePosition.x * mousePosition.x + 
      mousePosition.y * mousePosition.y
    );
    
    // Distancia máxima considerada para efecto completo
    const maxDistance = 0.6;
    
    // Calcular nivel de dispersión (0-1) basado en la distancia
    const targetDispersion = Math.min(distanceFromCenter / maxDistance, 1);
    
    // Actualizar el estado de dispersión progresivamente
    setDispersion(targetDispersion);
    console.log("Mouse position updated:", mousePosition, "Dispersion:", targetDispersion);
  }, [mousePosition]);
  
  // Animación del cerebro en cada frame
  useFrame((state) => {
    if (!particlesRef.current) {
      console.log("particlesRef is null in useFrame");
      return;
    }
    
    // Obtener buffer de posiciones actual
    const positionsArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    // Actualizar cada partícula interpolando entre posición original y dispersa
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      
      // Interpolación lineal entre posiciones originales y dispersas
      positionsArray[idx] = THREE.MathUtils.lerp(
        originalPositions[idx],
        dispersedPositions[idx],
        dispersion
      );
      
      positionsArray[idx + 1] = THREE.MathUtils.lerp(
        originalPositions[idx + 1],
        dispersedPositions[idx + 1],
        dispersion
      );
      
      positionsArray[idx + 2] = THREE.MathUtils.lerp(
        originalPositions[idx + 2],
        dispersedPositions[idx + 2],
        dispersion
      );
    }
    
    // Marcar el atributo de posición para actualización
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotación suave del cerebro
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005; // Rotación más rápida para que sea visible
    }
  });
  
  return (
    <>
      {/* Grupo contenedor del cerebro */}
      <group ref={groupRef}>
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={PARTICLE_COUNT}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={PARTICLE_COUNT}
              array={colors}
              itemSize={3}
            />
            <bufferAttribute
              attach="index"
              array={indices}
              itemSize={1}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.3} // Partículas más grandes para mejor visibilidad
            vertexColors
            transparent
            opacity={1.0} 
            sizeAttenuation
          />
        </points>
      </group>

      {/* Luces adicionales para mejor visibilidad */}
      <pointLight position={[10, 10, 10]} intensity={8} color="#ff3030" />
      <pointLight position={[-10, -10, 10]} intensity={8} color="#ff1010" />
      <pointLight position={[0, 0, 5]} intensity={6} color="#ff5050" />
    </>
  );
};

export default BrainParticles;
