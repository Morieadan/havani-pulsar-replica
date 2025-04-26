import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

const inputBaseStyle =
  "w-full rounded-xl bg-[#15161B]/50 border border-white/10 px-6 py-4 text-white placeholder:text-[#7A7A7A] focus:border-[#7B61FF] focus:ring-2 focus:ring-[#7B61FF]/40 transition outline-none";
const inputMobileStyle = "px-4 py-3";

function validateEmail(email: string) {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
}

export default function FinalCTASection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Responsive handling
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 768
  );
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // IntersectionObserver for section reveal
  const [sectionRevealed, setSectionRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSectionRevealed(true);
      return;
    }
    const obs = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
    setErrors((err) => ({ ...err, [e.target.name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validation logic
    let newErr: typeof errors = {};
    if (!fields.name.trim()) newErr.name = "Por favor ingresa tu nombre.";
    if (!fields.email.trim() || !validateEmail(fields.email)) newErr.email = "Ingresa un correo válido.";
    if (!fields.message.trim()) newErr.message = "Describe brevemente tu necesidad.";
    setErrors(newErr);

    // Scroll to first error if any
    if (Object.keys(newErr).length) {
      const firstErrKey = Object.keys(newErr)[0];
      const el = formRef.current?.querySelector(`[name='${firstErrKey}']`);
      if (el && "scrollIntoView" in el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);
    // Placeholder API call
    try {
      await new Promise((r) => setTimeout(r, 700));
      setLoading(false);
      setSuccess(true);
    } catch {
      setLoading(false);
      // ... handle error scenario if needed
    }
  };

  return (
    <section
      aria-labelledby="cta-title"
      id="final-cta"
      className="relative overflow-hidden bg-[#09090C]"
      ref={sectionRef}
    >
      {/* Overlay Glow (top) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-22%] z-0 h-[340px] w-[820px] -translate-x-1/2 blur-[170px]"
        style={{ background: "rgba(123,97,255,0.05)" }}
      />
      {/* Bottom SVG Divider */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[110px] select-none pointer-events-none z-10"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1440 110"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C420,120 1200,-40 1440,60 L1440,110 L0,110 Z"
          fill="rgba(255,255,255,0.04)"
        />
      </svg>

      {/* Container */}
      <div
        className="relative z-10 max-w-[700px] mx-auto px-6 md:px-12 py-[160px] md:py-[200px] flex flex-col items-center text-center"
      >
        {/* Animations based on sectionRevealed (framer variants) */}
        <motion.h2
          id="cta-title"
          initial={{ opacity: 0, y: 24 }}
          animate={sectionRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.6, 0.8, 0.25, 1] }}
          className="text-3xl md:text-4xl font-extrabold leading-tight text-white"
        >
          Empezar es Más Fácil de lo Que Crees
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={sectionRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.6, 0.8, 0.25, 1] }}
          className="mt-6 text-lg md:text-xl text-[#BBBBBB] max-w-[560px] mx-auto"
        >
          Deja atrás las complicaciones. Completa el formulario y hablemos hoy mismo.
        </motion.p>
        {/* Form + Success */}
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.form
              key="cta-form"
              id="contact-form"
              ref={formRef}
              initial={{ opacity: 0, y: 28 }}
              animate={sectionRevealed ? { opacity: 1, y: 0 } : {}}
              exit={
                window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? { opacity: 0 }
                  : { opacity: 0, y: -20, transition: { duration: 0.5 } }
              }
              transition={{ duration: 0.5, delay: 0.16 }}
              onSubmit={handleSubmit}
              className={`relative z-10 mt-14 w-full flex flex-col gap-8 sm:gap-8 ${isMobile ? "gap-6" : ""}`}
              noValidate
            >
              {/* Name */}
              <motion.div
                className="form-field"
                initial={{ opacity: 0, y: 20 }}
                animate={sectionRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.22 }}
              >
                <label htmlFor="name" className="sr-only">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  aria-label="Nombre"
                  disabled={loading}
                  placeholder="Nombre"
                  autoComplete="off"
                  value={fields.name}
                  onChange={handleChange}
                  className={`${inputBaseStyle} ${isMobile ? inputMobileStyle : ""} ${
                    errors.name
                      ? "border-[#FF5F5F] focus:border-[#FF5F5F] focus:ring-[#FF5F5F]/30"
                      : ""
                  }`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "err-name" : undefined}
                />
                <AnimatePresence initial={false}>
                  {errors.name && (
                    <motion.p
                      key="err-name"
                      role="alert"
                      aria-live="polite"
                      id="err-name"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="error-msg mt-2 text-sm text-[#FF5F5F]"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email */}
              <motion.div
                className="form-field"
                initial={{ opacity: 0, y: 20 }}
                animate={sectionRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.34 }}
              >
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  aria-label="Email"
                  disabled={loading}
                  inputMode="email"
                  autoComplete="off"
                  placeholder="Correo electrónico"
                  value={fields.email}
                  onChange={handleChange}
                  className={`${inputBaseStyle} ${isMobile ? inputMobileStyle : ""} ${
                    errors.email
                      ? "border-[#FF5F5F] focus:border-[#FF5F5F] focus:ring-[#FF5F5F]/30"
                      : ""
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "err-email" : undefined}
                />
                <AnimatePresence initial={false}>
                  {errors.email && (
                    <motion.p
                      key="err-email"
                      role="alert"
                      aria-live="polite"
                      id="err-email"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="error-msg mt-2 text-sm text-[#FF5F5F]"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Message */}
              <motion.div
                className="form-field"
                initial={{ opacity: 0, y: 20 }}
                animate={sectionRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.46 }}
              >
                <label htmlFor="message" className="sr-only">
                  ¿En qué podemos ayudarte?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  aria-label="¿En qué podemos ayudarte?"
                  disabled={loading}
                  autoComplete="off"
                  placeholder="¿En qué podemos ayudarte?"
                  value={fields.message}
                  onChange={handleChange}
                  className={`${inputBaseStyle} resize-none ${isMobile ? inputMobileStyle : ""} ${
                    errors.message
                      ? "border-[#FF5F5F] focus:border-[#FF5F5F] focus:ring-[#FF5F5F]/30"
                      : ""
                  }`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "err-msg" : undefined}
                  maxLength={800}
                  style={{ minHeight: isMobile ? 90 : 128 }}
                />
                <AnimatePresence initial={false}>
                  {errors.message && (
                    <motion.p
                      key="err-msg"
                      role="alert"
                      aria-live="polite"
                      id="err-msg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="error-msg mt-2 text-sm text-[#FF5F5F]"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Button - Updated text and added neon glow effect with fill animation */}
              <motion.button
                type="submit"
                className={`${isMobile
                  ? "w-full"
                  : "mx-auto"
                  } mt-2 inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 font-bold text-[#7B61FF] shadow-[0_0_15px_rgba(123,97,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,97,255,0.6)] hover:outline-[#7B61FF] hover:outline-2 hover:outline-offset-4 relative overflow-hidden group
                ${loading ? "opacity-70 pointer-events-none" : ""}`}
                whileHover={
                  window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? {}
                    : { scale: 1.06 }
                }
                whileTap={window.matchMedia("(prefers-reduced-motion: reduce)").matches ? {} : { scale: 0.94 }}
                transition={{
                  scale: { type: "spring", stiffness: 260, damping: 20 },
                  opacity: { duration: 0.12 },
                }}
                disabled={loading}
                tabIndex={0}
              >
                {/* Fill animation on hover */}
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#7B61FF]/10 to-[#7B61FF]/40 transition-all duration-300 group-hover:w-full"></span>
                <span className="relative z-10">Hablemos de tu Idea</span>
                {!isMobile && <ArrowRight className="w-5 h-5 relative z-10" aria-hidden="true" />}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="cta-success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              id="form-success"
              data-testid="form-success"
              tabIndex={-1}
              aria-live="polite"
              className="mt-10 rounded-xl bg-[#15161B] border border-[#2ECC71]/40 px-8 py-6 text-[#4ADE80] flex items-center gap-3 justify-center text-base md:text-lg font-semibold shadow-[0_8px_24px_-6px_rgba(76,222,128,.09)]"
            >
              <CheckCircle className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
              ¡Gracias! Te contactaremos en breve.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
