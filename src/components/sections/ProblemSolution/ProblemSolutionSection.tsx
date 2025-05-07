
/**
 * @component ProblemSolutionSection
 * Sección que describe los problemas comunes y las soluciones ofrecidas por Havani
 * Incluye una animación 3D interactiva de cerebro con partículas
 */

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersection } from '@/hooks/useIntersection';
import BrainScene from '@/components/NeuronBrain/BrainScene';

const ProblemSolutionSection = () => {
  const handleIntersection = (entry: IntersectionObserverEntry) => {
    // Activar animaciones cuando la sección sea visible
    console.log("ProblemSolutionSection is visible", entry.isIntersecting);
  };

  const sectionRef = useIntersection(
    handleIntersection,
    { 
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
      once: true
    }
  );
  
  // Verificar que la sección se monta correctamente
  useEffect(() => {
    console.log("ProblemSolutionSection mounted");
    return () => {
      console.log("ProblemSolutionSection unmounted");
    };
  }, []);
  
  // Variantes para animaciones de Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] } }
  };

  console.log("Rendering ProblemSolutionSection");

  return (
    <section
      ref={sectionRef}
      id="problem-solution"
      className="relative bg-[#080811] min-h-[800px] overflow-hidden"
    >
      {/* Contenedor para la animación 3D del cerebro */}
      <div className="absolute inset-0 w-full h-full">
        <BrainScene />
      </div>
      
      {/* Capa superpuesta semitransparente para mejorar legibilidad - opacidad reducida */}
      <div className="absolute inset-0 bg-[#060E15] bg-opacity-30 backdrop-blur-[2px] z-10"></div>
      
      {/* Contenido principal - z-index incrementado para estar por encima del cerebro */}
      <motion.div
        className="relative z-30 max-w-[1240px] mx-auto px-6 md:px-12 lg:px-24 py-32 md:py-40"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={itemVariants} className="text-center mx-auto max-w-[800px]">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-8">
            Navegar el Desarrollo de Software 
            <span className="block text-gradient bg-clip-text bg-gradient-to-r from-[#ff4b4b] to-[#ff7b7b]">
              Sin Laberintos Técnicos
            </span>
          </h2>
          
          <p className="mt-6 text-lg md:text-xl text-[#BBBBBB]">
            Transforma la complejidad en claridad con soluciones tecnológicas que realmente resuelven tu problema de negocio, sin intermediarios ni obstáculos.
          </p>
        </motion.div>
        
        {/* Grid de problemas y soluciones */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Columna de problemas */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Problemas Comunes</h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "Comunicación Técnica Confusa",
                  description: "Desarrolladores que hablan en código, no en soluciones de negocio"
                },
                {
                  title: "Costos Impredecibles",
                  description: "Presupuestos que se disparan sin control ni transparencia"
                },
                {
                  title: "Plazos Que No Se Cumplen",
                  description: "Promesas de entrega que se extienden constantemente"
                },
                {
                  title: "Soluciones Sobrecomplicas",
                  description: "Software con más funciones de las necesarias, difícil de usar"
                }
              ].map((problem, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
                  <h4 className="text-white font-semibold mb-2">{problem.title}</h4>
                  <p className="text-[#BBBBBB]">{problem.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Columna de soluciones */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Cómo Lo Resolvemos</h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "Lenguaje Claro y Directo",
                  description: "Comunicación enfocada en resultados de negocio, sin jerga técnica innecesaria"
                },
                {
                  title: "Transparencia Total",
                  description: "Presupuestos claros con alcance definido y sin sorpresas de último momento"
                },
                {
                  title: "Entregas Consistentes",
                  description: "Metodología ágil con entregas incrementales y fechas realistas"
                },
                {
                  title: "Simplicidad Efectiva",
                  description: "Soluciones elegantes que resuelven exactamente lo que necesitas, ni más ni menos"
                }
              ].map((solution, i) => (
                <div key={i} className="bg-[#7B61FF]/10 backdrop-blur-md rounded-xl p-6 border border-[#7B61FF]/30">
                  <h4 className="text-white font-semibold mb-2">{solution.title}</h4>
                  <p className="text-[#BBBBBB]">{solution.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Call To Action */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#ff4b4b] to-[#ff7b7b] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#ff4b4b]/20 transition-all duration-300"
          >
            Hablemos de tu Proyecto
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProblemSolutionSection;
