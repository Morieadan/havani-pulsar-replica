
/**
 * @component BrainSection
 * Sección dedicada a mostrar la animación 3D del cerebro de neuronas
 * Esta sección está diseñada para ser posicionada entre ProblemSolution y ValueProp
 */

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import BrainScene from '@/components/NeuronBrain/BrainScene';
import { useIntersection } from '@/hooks/useIntersection';

const BrainSection = () => {
  const sectionRef = useIntersection(
    (entry) => {
      console.log("BrainSection visibility:", entry.isIntersecting);
    },
    { 
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
      once: false
    }
  );

  useEffect(() => {
    console.log("BrainSection mounted");
    return () => {
      console.log("BrainSection unmounted");
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="brain-animation"
      className="relative bg-black min-h-[800px] md:min-h-[900px] lg:min-h-[1000px] overflow-hidden w-full"
      aria-label="Visualización 3D del cerebro de IA"
      style={{ position: 'relative', zIndex: 5 }} /* Asegurar que tenga un z-index adecuado */
    >
      {/* Contenedor del cerebro 3D - altura y ancho completos */}
      <div className="absolute inset-0 w-full h-full z-10">
        <BrainScene />
      </div>
      
      {/* Degradado superior para ayudar en la transición desde la sección anterior */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg-body to-transparent z-20"></div>
      
      {/* Degradado inferior para mejor visibilidad del texto */}
      <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-black via-black/80 to-transparent z-20"></div>
      
      {/* Elemento de debug para verificar posicionamiento - visible temporalmente */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 w-16 h-16 rounded-full z-50 opacity-20"></div>
      
      {/* Contenido con texto */}
      <div className="relative z-30 max-w-[1240px] mx-auto px-6 md:px-12 lg:px-24 h-full flex flex-col justify-center items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
            Inteligencia Artificial Neuronal
          </h2>
          <p className="text-xl md:text-2xl text-white/90 max-w-[800px] mx-auto">
            Nuestro cerebro de IA procesa millones de datos para ofrecerte soluciones precisas y efectivas.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BrainSection;
