
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ProductIcon } from './ProductIcon';
import type { Product } from './productsData';

const ProductCard: React.FC<Product> = ({
  name,
  description,
  icon,
  url
}) => {
  // Card animation variant
  const cardVariants = {
    hidden: { opacity: 0, y: 34, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.2, 1.4, 0.3, 1]
      }
    }
  };

  return (
    <motion.article
      variants={cardVariants}
      className="group relative flex flex-col items-center text-center bg-[#15161B] rounded-[28px] p-10 sm:p-8 lg:p-10 shadow-[0_12px_24px_-6px_rgba(0,0,0,0.55)] border border-white/6 overflow-hidden"
      role="link"
      tabIndex={0}
      aria-label={`${name} – ${description}, ver más`}
    >
      {/* Hover glow effect */}
      <span className="absolute inset-0 rounded-[28px] bg-[#7B61FF]/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      {/* Icon bubble */}
      <div className="relative z-10 flex items-center justify-center w-16 h-16 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/[0.08] border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.4)] transition-transform duration-200 group-hover:rotate-3">
        <ProductIcon name={icon} className="w-7 h-7 stroke-[#7B61FF]" />
      </div>

      {/* Product name */}
      <h3 className="relative z-10 mt-8 text-xl font-semibold text-white">
        {name}
      </h3>

      {/* Description */}
      <p className="relative z-10 mt-4 text-sm leading-relaxed text-[#BBBBBB]">
        {description}
      </p>

      {/* CTA link */}
      <a
        href={url}
        className="relative z-10 inline-flex items-center gap-1 mt-8 text-[#7B61FF] font-semibold transition-colors group-hover:text-[#A28CFF] group-hover:underline"
      >
        Ver más
        <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </a>
    </motion.article>
  );
};

export default ProductCard;
