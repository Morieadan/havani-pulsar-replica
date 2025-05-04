
/**
 * @component BrainParticles - Componente que renderiza un cerebro 3D con efecto de partículas
 * Este componente utiliza Three.js y React Three Fiber para crear una visualización 3D interactiva
 * de un cerebro que se descompone y reconstruye con partículas basado en la posición del cursor.
 */

import { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Número de partículas para renderizar el cerebro
const PARTICLE_COUNT = 15000;
// Distancia máxima de dispersión al alejar el cursor
const MAX_DISPERSION = 8;
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
  
  // Obtener el contexto de la escena para adaptar la escala
  const { viewport } = useThree();
  
  // Crear posiciones originales y posiciones de dispersión para las partículas
  const { positions, originalPositions, dispersedPositions, colors, indices } = useMemo(() => {
    // Creamos arrays para almacenar las posiciones y colores
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const dispersedPositions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const indices = new Uint16Array(PARTICLE_COUNT);
    
    // Generar forma base del cerebro (esfera distorsionada)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribución en forma esférica distorsionada para simular cerebro
      // Técnica de muestreo de puntos en esfera con noise para crear forma orgánica
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      // Radio base con variación para crear la forma del cerebro
      const radius = 2 + Math.random() * 0.2;
      
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
      
      // Color rojo neón con variación
      const intensity = 0.6 + Math.random() * 0.4; // Variar intensidad para efecto profundidad
      colors[i * 3] = 1.0 * intensity; // R (rojo máximo)
      colors[i * 3 + 1] = 0.2 * intensity; // G (un poco de verde para naranja)
      colors[i * 3 + 2] = 0.2 * intensity; // B (un poco de azul para brillar)
      
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
  }, [mousePosition]);
  
  // Animación del cerebro en cada frame
  useFrame(() => {
    if (!particlesRef.current) return;
    
    // Obtener buffer de posiciones actual
    const positionsArray = particlesRef.current.geometry.attributes.position.array;
    
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
      groupRef.current.rotation.y += 0.002;
    }
  });
  
  return (
    <>
      {/* Efectos de post-procesamiento */}
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={1.5}
        />
      </EffectComposer>
      
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
            size={0.05}
            vertexColors
            transparent
            opacity={0.8}
            sizeAttenuation
          />
        </points>
      </group>
    </>
  );
};

export default BrainParticles;
