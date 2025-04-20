
import { motion } from 'framer-motion';
import { useIntersection } from '@/hooks/useIntersection';
import ProcessStep from './ProcessStep';
import { processSteps } from './processData';

const ProcessSection = () => {
  // Reference for section to trigger animations
  const sectionRef = useIntersection(
    (entry) => {
      if (entry.isIntersecting) {
        // Animation will be handled by Framer Motion
      }
    },
    { 
      root: null,
      rootMargin: '0px',
      threshold: 0.4,
      once: true
    }
  );
  
  // Parallax effect hook for the entire timeline
  const parallaxSpeed = 0.15;
  
  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.1
      }
    }
  };
  
  // Animation for the connecting line
  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1, 
      transition: { 
        duration: 1.2, 
        ease: [0.33, 0.66, 0.66, 1] 
      }
    }
  };
  
  return (
    <section
      ref={sectionRef}
      aria-labelledby="process-title"
      className="relative bg-[#0D0D11] overflow-hidden"
    >
      {/* Top decorative wave */}
      <svg 
        className="absolute top-0 left-0 w-full h-[120px]" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path 
          d="M0,0 C150,20 350,0 500,15 C650,30 700,60 900,50 C1050,40 1150,10 1200,0 L1200,120 L0,120 Z" 
          fill="rgba(255,255,255,0.03)" 
        />
      </svg>
      
      {/* Main content container */}
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 lg:px-24 py-[140px] md:py-[180px] flex flex-col">
        <h2 
          id="process-title" 
          className="text-white text-center text-3xl md:text-4xl font-extrabold leading-snug"
        >
          Tu Éxito en 4 Pasos: Nuestro Proceso Simple y Rápido
        </h2>
        
        <p className="mt-6 text-center max-w-[700px] mx-auto text-[#BBBBBB] text-lg md:text-xl">
          Olvídate de procesos interminables y la burocracia. Trabajamos de manera ágil y eficiente para que puedas ver resultados cuanto antes.
        </p>
        
        {/* Timeline Grid Desktop */}
        <motion.div 
          className="relative mt-20 grid grid-cols-1 lg:grid-cols-4 lg:gap-x-12 gap-y-16 lg:gap-y-0"
          style={{
            transform: `translateY(0px)`,
            transition: 'transform 0.1s linear',
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer}
          data-speed={parallaxSpeed}
        >
          {/* Connecting line for desktop */}
          <div className="absolute hidden lg:block top-[44px] left-0 w-full h-2 z-0">
            <svg 
              width="100%" 
              height="2" 
              viewBox="0 0 100 2" 
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path 
                d="M0 1 L100 1" 
                stroke="#2A2B30" 
                strokeWidth="2" 
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ 
                  pathLength: 1,
                  transition: { duration: 1.2, ease: [0.33, 0.66, 0.66, 1] }
                }}
                viewport={{ once: true, amount: 0.4 }}
              />
              
              {/* Connecting dots */}
              {[0, 33.33, 66.66, 100].map((position, i) => (
                <motion.circle 
                  key={i}
                  cx={`${position}%`} 
                  cy="1" 
                  r="4" 
                  fill="#7B61FF"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ 
                    scale: 1, 
                    opacity: 1,
                    transition: { 
                      delay: 0.1 + (i * 0.3), 
                      duration: 0.5,
                      ease: [0.33, 1.5, 0.5, 1]
                    }
                  }}
                  viewport={{ once: true, amount: 0.4 }}
                />
              ))}
            </svg>
          </div>
          
          {/* Vertical line for mobile */}
          <div className="absolute lg:hidden left-[34px] top-[120px] h-[calc(100%-140px)] w-[2px] bg-[#2A2B30]" />
          
          {/* Process steps */}
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              index={index + 1}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
