
import { useEffect, useRef, useState } from "react";
import { Pagination, Navigation, Autoplay, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { testimonials } from "./testimonialsData";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";

// SVG Q mark.
const QuoteMark = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="64" height="64" viewBox="0 0 60 60" fill="none" aria-hidden="true">
    <path d="M44 12C50 13.0001 54 17.0001 54 25.0001C54 32.0001 50.0001 38.0001 43.0001 41.0001V32.0001C46.0001 31.0001 48.0001 29.0001 48.0001 26.0001C48 23.0001 46.0001 21.0001 43.0001 20.0001C43.0001 14.0001 44 12 44 12Z" fill="currentColor" fillOpacity="0.15"/>
    <path d="M16 12C22 13.0001 26 17.0001 26 25.0001C26 32.0001 22.0001 38.0001 15.0001 41.0001V32.0001C18.0001 31.0001 20.0001 29.0001 20.0001 26.0001C20 23.0001 18.0001 21.0001 15.0001 20.0001C15.0001 14.0001 16 12 16 12Z" fill="currentColor" fillOpacity="0.15"/>
  </svg>
);

const TestimonialsSection = () => {
  // Control autoplay with intersection observer
  const sectionRef = useRef<HTMLDivElement>(null);
  const [autoplayActive, setAutoplayActive] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return; // do not enable autoplay

    const observer = new window.IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) setAutoplayActive(true);
        else setAutoplayActive(false);
      },
      { threshold: 0.25 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="test-title"
      id="testimonials"
      className="relative bg-[#0B0B0F] overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Glow background */}
      <div 
        className="pointer-events-none absolute bottom-[-18%] left-1/2 -translate-x-1/2 w-[540px] h-[540px] z-0"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, rgba(123,97,255,0.04) 0%,rgba(123,97,255,0) 70%)",
          filter: "blur(320px)",
        }}
      />
      {/* Top divider wave */}
      <svg
        className="absolute top-0 left-0 w-full h-[100px] z-10 text-white/3"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 1440 110"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 Q400,110 900,90 Q1200,80 1440,110 L1440,0 L0,0 Z"
          fill="currentColor"
          opacity="0.03"
        />
      </svg>
      <div
        ref={sectionRef}
        className="relative max-w-[1000px] mx-auto px-6 md:px-12 py-[140px] md:py-[180px] text-center z-20"
      >
        <h2
          id="test-title"
          className="text-3xl md:text-4xl font-extrabold text-white"
        >
          Ellos Ya Confían en Havani: Historias Reales
        </h2>
        <p className="mt-6 text-[#BBBBBB] text-lg md:text-xl">
          Descubre cómo nuestro enfoque “Sin Tanto Rollo” transforma negocios como el tuyo.
        </p>
        <div className="mt-20 relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation, A11y]}
            slidesPerView={1}
            loop
            effect="fade"
            autoplay={autoplayActive ? { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
            speed={600}
            pagination={{
              clickable: true,
              bulletClass: "havani-swiper-bullet",
              bulletActiveClass: "havani-swiper-bullet-active"
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }}
            a11y={{ enabled: true }}
            aria-live="polite"
            lazyPreloadPrevNext={1} // only one ahead
            style={{ "--swiper-pagination-bottom": "0px" } as any}
          >
            {testimonials.map(({ quote, name }, i) => (
              <SwiperSlide key={name}>
                <motion.blockquote
                  className="mx-auto max-w-[700px] bg-[#15161B] rounded-[28px] px-12 py-14 shadow-[0_12px_24px_-8px_rgba(0,0,0,.55)] border border-white/10 relative group focus-within:outline-[#7B61FF] focus-within:outline-2 focus-within:outline-offset-4"
                  role="group"
                  aria-roledescription="testimonial"
                  tabIndex={0}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, ease: [0.25, 0.8, 0.25, 1] }}
                >
                  {/* Quotation Mark */}
                  <span className="absolute -top-6 -left-6 md:w-16 md:h-16 w-12 h-12 text-[#7B61FF]/15 rotate-180 select-none pointer-events-none transition-transform duration-500 group-hover:rotate-0">
                    <QuoteMark className="w-full h-full" />
                  </span>
                  <p className="text-lg md:text-xl leading-relaxed text-white">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <footer className="mt-8 text-[#7B61FF] font-semibold">
                    — {name}
                  </footer>
                </motion.blockquote>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom arrows */}
          <button
            className="swiper-button-prev after:content-[''] w-12 h-12 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/10 transition-colors absolute top-1/2 left-0 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 focus:opacity-100 duration-200"
            aria-label="Testimonio anterior"
            aria-controls="testimonials-swiper"
            tabIndex={0}
            type="button"
          >
            <svg width="28" height="28" fill="none" aria-hidden="true"><path d="M18 6 10 14l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <button
            className="swiper-button-next after:content-[''] w-12 h-12 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/10 transition-colors absolute top-1/2 right-0 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 focus:opacity-100 duration-200"
            aria-label="Siguiente testimonio"
            aria-controls="testimonials-swiper"
            tabIndex={0}
            type="button"
          >
            <svg width="28" height="28" fill="none" aria-hidden="true"><path d="M10 6l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>
      <style>{`
        .havani-swiper-bullet {
          background: #2A2B30;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin: 0 7px !important;
          opacity: 1 !important;
          transition: background 0.2s, transform 0.2s;
        }
        .havani-swiper-bullet-active {
          background: #7B61FF !important;
          transform: scale(1.2);
        }
        .swiper:hover .swiper-button-prev,
        .swiper:hover .swiper-button-next {
          opacity: 1;
        }
        @media (max-width: 768px) {
          .swiper-button-prev, .swiper-button-next { display: none !important; }
        }
      `}
      </style>
    </section>
  );
};

export default TestimonialsSection;
