
/**
 * @component HeroSection - Sección principal (Hero) de la landing page de Havani
 * Esta sección implementa el diseño del Hero de Pulsar adaptado a Havani.
 * Incluye header con navegación, fondo con estrellas animadas, contenido principal
 * y mockup de dashboard.
 * 
 * Prompt 1 - Hero v4
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useIntersection } from '@/hooks/useIntersection';
import { Play, ArrowDown } from 'lucide-react';
import Header from './Header';
import StarsBackground from './StarsBackground';

const HeroSection = () => {
  // Estados para animaciones
  const [hasScrolled, setHasScrolled] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Ref para el indicador de scroll
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  // Referencia para la animación del texto por líneas (headline)
  const headlineRef = useRef<HTMLHeadingElement>(null);
  
  // Detectar cuando la sección es visible para iniciar animaciones
  const elementRef = useIntersection((entry) => {
    if (entry.isIntersecting) {
      // 👉 Iniciar secuencia de animaciones cuando el elemento es visible en un 40% del viewport
      controls.start('visible');
    }
  });
  
  // Secuencia de animaciones para los elementos
  useEffect(() => {
    // Iniciar animaciones cuando el componente se monta
    controls.start('visible');
    
    // 👉 Detectar scroll para ocultar el indicador y cambiar el header
    const handleScroll = () => {
      if (window.scrollY > 8 && !hasScrolled) {
        setHasScrolled(true);
        
        // Ocultar el indicador de scroll con animación
        if (scrollIndicatorRef.current) {
          scrollIndicatorRef.current.style.opacity = '0';
          setTimeout(() => {
            if (scrollIndicatorRef.current) {
              scrollIndicatorRef.current.style.display = 'none';
            }
          }, 400); // Después de la transición
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls, hasScrolled]);
  
  // Variantes de animación para los distintos elementos
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15,
      }
    }
  };
  
  const badgeVariants = {
    hidden: { opacity: 0, y: -12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.25, 0.8, 0.25, 1],
        delay: 0.15
      }
    }
  };
  
  const headlineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.25, 0.8, 0.25, 1]
      }
    }
  };
  
  const subtitleVariants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.25, 0.8, 0.25, 1],
        delay: 0.25
      }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.25, 0.8, 0.25, 1],
        delay: 0.4 + (i * 0.05)
      }
    })
  };
  
  const mockupVariants = {
    hidden: { opacity: 0, scale: 0.88, x: 60 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.8, 0.25, 1.7] // Simular Out Back
      }
    }
  };

  return (
    <section 
      ref={elementRef}
      className="relative w-full min-h-[100vh] lg:min-h-[100vh] md:min-h-[120vh] overflow-hidden flex flex-col bg-black"
      id="hero"
    >
      {/* Header con navegación */}
      <Header hasScrolled={hasScrolled} />
      
      {/* Fondo de gradiente radial y estrellas */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at 50% 0%, #1B1540 0%, #060E15 55%, #000000 100%)'
        }}
        aria-hidden="true"
      >
        {/* Nebulosa glow */}
        <div 
          className="absolute -top-[50%] left-1/2 -translate-x-1/2 w-[180%] h-[140%] z-0"
          style={{
            background: '#7B61FF33',
            filter: 'blur(160px)',
            mixBlendMode: 'normal'
          }}
          aria-hidden="true"
        />
        
        {/* Capa de estrellas animadas */}
        <StarsBackground />
      </div>
      
      {/* Grid principal */}
      <div className="relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[46%_54%] gap-8 px-6 md:px-12 lg:px-24 pt-[200px] pb-[140px] lg:pt-[200px] lg:pb-[140px] md:pt-28 md:pb-24">
        
        {/* Columna izquierda - Texto */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col order-2 lg:order-1"
        >
          {/* Badge "Descubre Havani →" */}
          <motion.div 
            className="group inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/10 text-sm font-semibold text-white hover:bg-white/20 cursor-pointer"
            variants={badgeVariants}
          >
            Descubre Havani 
            <motion.span
              whileHover={{ x: 4 }}
              transition={{ duration: 0.15 }}
              className="w-4 h-4"
            >
              →
            </motion.span>
          </motion.div>
          
          {/* Headline */}
          <motion.h1 
            ref={headlineRef}
            className="mt-4 text-[clamp(44px,6vw,76px)] font-extrabold leading-[1.1] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,.5)]"
            variants={headlineVariants}
          >
            <span className="block">HAVANI</span>
            <span className="block">Desarrollo Sin Tanto Rollo.</span>
          </motion.h1>
          
          {/* Subtítulo */}
          <motion.p 
            className="mt-6 max-w-[540px] text-lg md:text-xl text-[#CCCCCC] tracking-tight"
            variants={subtitleVariants}
          >
            Desarrollo a medida con un enfoque práctico y transparente. Entregamos innovación, velocidad y profesionalismo en cada línea de código.
          </motion.p>
          
          {/* Botones */}
          <motion.div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-10">
            {/* Botón primario */}
            <motion.button
              className="px-8 py-4 rounded-full bg-white text-[#7B61FF] font-bold shadow-[0_8px_24px_-4px_rgba(123,97,255,.35)] transition-transform focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#7B61FF]"
              variants={buttonVariants}
              custom={0}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              data-tooltip="Inicia tu proyecto"
            >
              Hablemos de tu Idea
            </motion.button>
            
            {/* Botón secundario */}
            <motion.button
              className="px-8 py-4 rounded-full border border-white/40 text-white/90 hover:bg-white hover:text-[#060E15] transition-colors flex items-center justify-center gap-2 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#7B61FF]"
              variants={buttonVariants}
              custom={1}
            >
              <motion.span
                animate={{ 
                  scale: [1, 1.15, 1],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'loop'
                  }
                }}
                className="flex items-center justify-center"
              >
                <Play className="w-5 h-5" />
              </motion.span>
              Watch Video
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Columna derecha - Mockup */}
        <div className="relative order-1 lg:order-2 overflow-visible">
          <motion.div 
            className="relative"
            variants={mockupVariants}
            initial="hidden"
            animate={controls}
          >
            {/* Glow effect para el mockup */}
            <div
              className="absolute inset-0 -z-10"
              style={{
                background: 'radial-gradient(50% 50% at 50% 50%, rgba(123, 97, 255, 0.5) 0%, rgba(123, 97, 255, 0) 100%)',
                transform: 'translateY(40px)',
                filter: 'blur(120px)',
                willChange: 'transform, opacity'
              }}
              aria-hidden="true"
            />
            
            {/* Imagen del mockup */}
            <img 
              src="/placeholder.svg" // Placeholder temporal, debería reemplazarse con la imagen real
              alt="Panel Havani" 
              className="w-full max-w-[760px] h-auto rounded-[32px] border border-white/6 shadow-[0_40px_60px_-10px_rgba(0,0,0,.6)] translate-y-[40px]"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Indicador de scroll */}
      <motion.div
        ref={scrollIndicatorRef}
        className="absolute left-1/2 translate-x-[-50%] bottom-8 z-20 flex items-center justify-center"
        animate={{ 
          y: [0, 8, 0],
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut'
          }
        }}
        aria-label="scroll a la siguiente sección"
      >
        <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center">
          <ArrowDown className="w-5 h-5 text-white/70" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
