
import { motion } from 'framer-motion';
import { useIntersection } from '@/hooks/useIntersection';
import ServiceCard from './ServiceCard';
import { services } from './servicesData';

const ServicesSection = () => {
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

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.15
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-title"
      className="relative bg-[#0B0B0F] overflow-hidden"
      style={{
        backgroundImage: 'url("/assets/noise.png")',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-x-0 top-0 h-[160px] bg-gradient-to-b from-white/[0.035] to-transparent" />

      <div className="relative max-w-[1240px] mx-auto px-6 md:px-12 lg:px-24 py-[140px] md:py-[180px]">
        <h2
          id="services-title"
          className="text-center text-3xl md:text-4xl font-extrabold text-white"
        >
          Soluciones a Tu Medida: Impulsamos Tu Crecimiento y Eficiencia
        </h2>

        <p className="mt-6 text-center mx-auto max-w-[680px] text-[#BBBBBB] text-lg md:text-xl">
          Descubre nuestros servicios personalizados que transforman tu negocio.
        </p>

        <motion.div
          className="relative mt-20 grid grid-cols-1 sm:grid-cols-2 gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          style={{
            transform: 'translateY(0px)',
            transition: 'transform 0.1s linear',
          }}
          data-speed="0.12"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
