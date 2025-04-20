
import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../ValueProp/Icon';

interface ProcessStepProps {
  index: number;
  title: string;
  description: string;
  icon: 'simple' | 'idea' | 'speed' | 'handshake';
}

const ProcessStep: React.FC<ProcessStepProps> = ({ index, title, description, icon }) => {
  // Animation variants
  const circleVariants = {
    hidden: { scale: 0.7, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        duration: 0.6, 
        ease: [0.33, 1.5, 0.5, 1] 
      }
    }
  };
  
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.45, 
        ease: [0.23, 1, 0.32, 1] 
      }
    }
  };

  return (
    <article 
      className="group flex flex-col items-center text-center relative"
      tabIndex={0}
      role="listitem"
      aria-label={`Paso ${index}: ${title} – ${description}`}
    >
      <motion.div 
        className="relative step-circle flex items-center justify-center w-[68px] h-[68px] lg:w-[88px] lg:h-[88px] rounded-full bg-[#15161B] border-2 border-[#7B61FF]/60 shadow-[0_0_0_4px_rgba(123,97,255,.15)] transition-transform hover:scale-107 focus:scale-107 duration-150"
        variants={circleVariants}
        whileHover={{ scale: 1.07 }}
      >
        <span className="step-index font-bold text-xl lg:text-2xl text-white absolute">
          {index}
        </span>
        <div className="absolute bottom-2 right-2 w-6 h-6 text-[#7B61FF]">
          <Icon name={icon} className="w-6 h-6 stroke-[#7B61FF]" />
        </div>
      </motion.div>
      
      <motion.h3 
        className="mt-6 text-lg font-semibold text-white"
        variants={textVariants}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="mt-3 text-sm leading-relaxed text-[#BBBBBB] max-w-[250px]"
        variants={textVariants}
      >
        {description}
      </motion.p>
      
      {/* Hover/focus ring style - added via group-hover/focus utilities */}
      <div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 outline outline-2 outline-offset-4 outline-[#7B61FF] absolute rounded-full top-0 left-1/2 transform -translate-x-1/2 w-[76px] h-[76px] lg:w-[96px] lg:h-[96px] transition-opacity duration-150" />
    </article>
  );
};

export default ProcessStep;
