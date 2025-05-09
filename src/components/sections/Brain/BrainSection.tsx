
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
      className="relative bg-[#080811] min-h-[600px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden"
      aria-label="Visualización 3D del cerebro de IA"
    >
      {/* Contenedor del cerebro 3D - Ahora como elemento principal, no como fondo */}
      <div className="absolute inset-0 w-full h-full z-10">
        <BrainScene />
      </div>
      
      {/* Capa superpuesta para mejorar legibilidad del texto que pudiera agregarse */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0D0D11] z-20"></div>
      
      {/* Contenido (opcional) - Podría agregarse texto explicativo en el futuro */}
      <div className="relative z-30 max-w-[1240px] mx-auto px-6 md:px-12 lg:px-24 py-32">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Inteligencia Artificial Neuronal</h2>
          <p className="text-xl text-white/80 max-w-[800px] mx-auto">
            Nuestro cerebro de IA procesa millones de datos para ofrecerte soluciones precisas y efectivas.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BrainSection;
