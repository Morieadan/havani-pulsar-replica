
import { motion } from 'framer-motion';
import { useIntersection } from '@/hooks/useIntersection';
import { useParallax } from '@/hooks/useParallax';

const StorySection = () => {
  // Ref for intersection observer
  const sectionRef = useIntersection((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
    }
  });

  // Ref for parallax effect on background image
  const parallaxRef = useParallax({ speed: 0.12 });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="story-title"
      className="relative bg-[#09090C] py-[140px] md:py-[180px] overflow-hidden"
    >
      {/* Background glow effect */}
      <div 
        className="absolute top-[-60%] left-1/2 -translate-x-1/2 w-full h-[200%] 
                   pointer-events-none opacity-0 animate-fade-in"
        style={{
          background: 'radial-gradient(circle, rgba(123,97,255,0.05) 0%, rgba(123,97,255,0) 70%)',
          filter: 'blur(280px)'
        }}
      />

      {/* Background image with parallax */}
      <figure 
        ref={parallaxRef}
        className="absolute inset-0 pointer-events-none select-none md:block hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/100 via-black/60 to-transparent" />
        <img
          src="/assets/team_havani.webp"
          alt=""
          className="w-full h-full object-cover opacity-15 blur-[4px]"
          loading="lazy"
          decoding="async"
        />
      </figure>

      {/* Content container */}
      <div className="max-w-[960px] mx-auto px-6 md:px-12 flex flex-col items-center text-center relative">
        <motion.h2
          id="story-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-3xl md:text-4xl font-extrabold text-white leading-snug"
        >
          Nacimos "Sin Tanto Rollo"
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mt-8 text-lg md:text-xl text-[#BBBBBB] leading-relaxed 
                     max-w-[760px] hover:text-white transition-colors duration-200"
        >
          Havani nació para desafiar la complejidad innecesaria... soluciones reales, sin complicaciones.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="relative z-10 mt-10 text-sm tracking-wide uppercase text-[#7B61FF]/80"
        >
          Equipo Havani · México · Est. 2024
        </motion.p>
      </div>
    </section>
  );
};

export default StorySection;
