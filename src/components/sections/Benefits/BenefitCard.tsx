
import { motion } from 'framer-motion';
import { BenefitIcon } from './BenefitIcon';
import type { Benefit } from './benefitsData';

const BenefitCard: React.FC<Benefit> = ({
  title,
  description,
  icon,
  illustration,
  ariaLabel
}) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 32 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.2, 1.6, 0.3, 1]
      }
    }
  };

  return (
    <motion.article
      variants={cardVariants}
      className="group relative flex flex-col items-center text-center px-8 py-14 rounded-[32px] bg-[#15161B] overflow-hidden shadow-[0_12px_28px_-8px_rgba(0,0,0,0.55)]"
      role="article"
      tabIndex={0}
      aria-label={ariaLabel}
    >
      {/* Abstract Illustration */}
      <img
        src={illustration}
        alt=""
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-[220px] h-[220px] pointer-events-none select-none opacity-60 group-hover:opacity-80 transition-opacity duration-300 md:block hidden"
        loading="lazy"
        decoding="async"
      />

      {/* Icon Bubble */}
      <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-[2px] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.4)] transition-transform duration-200 group-hover:rotate-6 group-hover:scale-110">
        <BenefitIcon name={icon} className="w-8 h-8 stroke-[#7B61FF]" />
      </div>

      {/* Title */}
      <h3 className="relative z-10 mt-10 text-xl font-semibold text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 mt-4 text-sm leading-relaxed text-[#BBBBBB]">
        {description}
      </p>

      {/* Accent underline */}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-[#7B61FF] group-hover:w-[70%] lg:group-hover:w-[70%] md:group-hover:w-[60%] sm:group-hover:w-[50%] transition-[width] duration-300" />
    </motion.article>
  );
};

export default BenefitCard;
