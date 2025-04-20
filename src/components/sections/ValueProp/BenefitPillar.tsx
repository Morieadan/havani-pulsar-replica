
import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from './Icon';
import { BenefitData } from './benefitsData';

const BenefitPillar: React.FC<BenefitData> = ({ icon, title, description, ariaLabel }) => {
  const pillarVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      },
    },
  };

  return (
    <motion.article
      variants={pillarVariants}
      className="group relative flex flex-col items-start"
      role="listitem"
      tabIndex={0}
      aria-label={ariaLabel}
    >
      <motion.span
        variants={iconVariants}
        className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,.4)] transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-1"
      >
        <Icon name={icon} className="w-7 h-7 stroke-[#7B61FF]" />
      </motion.span>

      <motion.h3
        variants={pillarVariants}
        className="mt-6 text-xl font-semibold text-white"
      >
        {title}
      </motion.h3>

      <motion.p
        variants={pillarVariants}
        className="mt-3 text-[#BBBBBB] text-sm leading-relaxed"
      >
        {description}
      </motion.p>

      {/* Accent bar with hover effect */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 overflow-hidden">
        <div className="w-full h-full bg-[#7B61FF] transform scale-x-0 origin-left transition-transform duration-250 ease-[cubic-bezier(.4,0,.2,1)] group-hover:scale-x-100" />
      </div>
    </motion.article>
  );
};

export default BenefitPillar;
