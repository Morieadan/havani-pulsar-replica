
import { motion } from 'framer-motion';
import { useIntersection } from '@/hooks/useIntersection';
import ProductCard from './ProductCard';
import { products } from './productsData';

const FlagshipProductsSection = () => {
  // Reference for section to trigger animations
  const sectionRef = useIntersection(
    (entry) => {
      if (entry.isIntersecting) {
        // Animation will be handled by Framer Motion
      }
    },
    { threshold: 0.4 }
  );

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.12
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="fp-title"
      className="relative bg-[#0D0D11] overflow-hidden"
      style={{
        backgroundImage: 'url("/assets/noise.png")',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Top gradient overlay */}
      <div className="absolute inset-x-0 top-0 h-[160px] bg-gradient-to-b from-white/[0.03] to-transparent" />

      <div className="relative max-w-[1240px] mx-auto px-6 md:px-12 lg:px-24 py-[140px] md:py-[180px]">
        <h2
          id="fp-title"
          className="text-center text-3xl md:text-4xl font-extrabold text-white"
        >
          Nuestras Soluciones Inteligentes: Eficiencia y Control para Tu Negocio
        </h2>

        <p className="mt-6 text-center mx-auto max-w-[680px] text-[#BBBBBB] text-lg md:text-xl">
          Descubre cómo nuestras herramientas "Sin Tanto Rollo" automatizan procesos y potencian resultados.
        </p>

        <motion.div
          className="relative mt-20 grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          style={{
            transform: 'translateY(0px)',
            transition: 'transform 0.1s linear',
          }}
          data-speed="0.1"
        >
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FlagshipProductsSection;
