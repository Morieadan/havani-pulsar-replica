
import { motion } from 'framer-motion';
import { ServiceIcon } from './ServiceIcon';
import type { Service } from './servicesData';

const ServiceCard: React.FC<Service> = ({
  name,
  description,
  icon
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 34, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.2, 1.5, 0.3, 1]
      }
    }
  };

  return (
    <motion.article
      variants={cardVariants}
      className="group relative flex flex-col bg-[#15161B] rounded-[28px] p-10 h-full transition-transform duration-200 hover:-translate-y-1.5"
      role="article"
      tabIndex={0}
      aria-label={`Servicio: ${name} – ${description}`}
    >
      {/* Hover glow effect */}
      <span className="absolute inset-0 rounded-[28px] bg-[#7B61FF]/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      {/* Icon bubble */}
      <div className="relative z-10 flex items-center justify-center w-16 h-16 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/[0.08] border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.4)] transition-transform duration-200 group-hover:scale-105">
        <ServiceIcon name={icon} className="w-7 h-7 stroke-[#7B61FF]" />
      </div>

      {/* Service name */}
      <h3 className="relative z-10 mt-8 text-xl font-semibold text-white">
        {name}
      </h3>

      {/* Description */}
      <p className="relative z-10 mt-4 text-sm leading-relaxed text-[#BBBBBB]">
        {description}
      </p>
    </motion.article>
  );
};

export default ServiceCard;
