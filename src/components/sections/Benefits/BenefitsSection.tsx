
import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';
import { benefits } from './benefitsData';
import BenefitCard from './BenefitCard';

const BenefitsSection = () => {
  const sectionRef = useParallax({ speed: 0.08 });

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="kb-title"
      className="relative bg-[#0D0D11] overflow-hidden"
      style={{
        backgroundImage: 'url("/assets/noise.png")',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(123,97,255,0.06) 0%, transparent 70%)',
          filter: 'blur(120px)'
        }}
      />

      <div className="relative max-w-[1240px] mx-auto px-6 md:px-12 lg:px-24 py-[140px] md:py-[180px] flex flex-col">
        <h2
          id="kb-title"
          className="text-center text-3xl md:text-4xl font-extrabold text-white"
        >
          La Diferencia Havani: Más Allá del Código
        </h2>

        <p className="mt-6 text-center mx-auto max-w-[680px] text-[#BBBBBB] text-lg md:text-xl">
          Elegir un partner tecnológico es clave; descubre por qué nuestro enfoque rompe el molde.
        </p>

        <motion.div
          className="relative mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
