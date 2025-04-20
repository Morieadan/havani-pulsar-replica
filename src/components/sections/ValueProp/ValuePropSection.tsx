
import React from 'react';
import { motion } from 'framer-motion';
import { useIntersection } from '@/hooks/useIntersection';
import BenefitPillar from './BenefitPillar';
import { benefitsData } from './benefitsData';

const ValuePropSection = () => {
  const sectionRef = useIntersection(
    (entry) => {
      if (entry.isIntersecting) {
        // Animation will be handled by Framer Motion
      }
    },
    { 
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
      once: true
    }
  );

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.18,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="vp-title"
      className="relative bg-[#0D0D11] z-10"
    >
      {/* Top edge gradient overlay */}
      <div className="absolute inset-x-0 top-0 h-[120px] bg-gradient-to-b from-white/[0.04] to-transparent" />

      {/* Main content container */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24 py-[120px] md:py-[160px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
        >
          <h2
            id="vp-title"
            className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight text-center"
          >
            Tecnología Que Impulsa, No Que Frena: La Ventaja Havani
          </h2>

          <p className="mx-auto mt-6 max-w-[680px] text-center text-[#BBBBBB] text-lg md:text-xl">
            Transformamos la complejidad técnica en soluciones claras y efectivas, permitiéndote enfocarte en hacer crecer tu negocio mientras nosotros nos encargamos del desarrollo.
          </p>

          {/* Grid of benefits */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {benefitsData.map((benefit, index) => (
              <BenefitPillar key={index} {...benefit} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuePropSection;
