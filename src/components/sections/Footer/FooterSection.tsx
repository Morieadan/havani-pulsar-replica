
/**
 * @component FooterSection
 * 
 * Footer principal de la aplicación que contiene:
 * - Enlaces de navegación organizados en columnas
 * - Enlaces a redes sociales
 * - Información legal y de copyright
 * - Animaciones y micro-interacciones en los enlaces
 */

import { motion } from "framer-motion"; // Importar motion de framer-motion para animaciones
import { Twitter, Linkedin } from "lucide-react"; // Importar iconos de redes sociales

// Configuración de las columnas del footer
const footerColumns = [
  {
    title: "Producto",
    links: [
      { label: "Servicios", href: "#services" },
      { label: "Productos", href: "#flagship-products" },
      { label: "Precios", href: "/pricing" },
      { label: "Roadmap", href: "#" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { label: "Nuestra Historia", href: "#our-story" },
      { label: "Testimonios", href: "#testimonials" },
      { label: "Contacto", href: "#contact-form" },
      { label: "Carreras (Próximamente)", href: "/404" },
    ],
  },
  {
    title: "Recursos",
    links: [
      {
        label: "Plantillas",
        href: "https://framer.com/templates",
        target: "_blank",
        rel: "noopener",
      },
      {
        label: "Assets",
        href: "https://framer.com/assets",
        target: "_blank",
      },
      { label: "Blog (Próximamente)", href: "/blog" },
      { label: "Soporte", href: "mailto:hello@havani.dev" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Política de Privacidad", href: "/privacy" },
      { label: "Términos de Servicio", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

// Variantes de animación para las columnas
const colVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 + i * 0.13, duration: 0.55, ease: [0.27, 0.72, 0.29, 0.94] },
  }),
};

const FooterSection = () => (
  <footer
    aria-label="Información legal y enlaces"
    className="relative bg-[#060E15] overflow-hidden"
  >
    {/* Divider wave SVG top */}
    <div aria-hidden="true" className="pointer-events-none select-none absolute top-0 inset-x-0 z-10" style={{ height: "100px" }}>
      <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M0 60L48 56.7C96 53.3 192 47 288 59.7C384 73 480 117 576 130.3C672 143 768 126 864 100.3C960 73 1056 37 1152 30C1248 23 1344 47 1392 59.7L1440 72V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V60Z"
          fill="rgba(255,255,255,.04)"
        />
      </svg>
    </div>

    {/* Container */}
    <nav
      className="relative max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 py-[100px] md:py-[140px] grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 md:gap-x-16 text-sm z-20"
      aria-label="Mapa del sitio"
    >
      {footerColumns.map((col, i) => (
        <motion.div
          key={col.title}
          className="flex flex-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={i}
          variants={colVariants}
        >
          <h3 className="mb-6 font-semibold tracking-wide uppercase text-[#BBBBBB]">{col.title}</h3>
          <ul className="space-y-4">
            {col.links.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="footer-link"
                  {...(link.target ? {target: link.target} : {})}
                  {...(link.rel ? {rel: link.rel} : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </nav>

    {/* Divider */}
    <hr className="my-14 border-t border-[#2A2B30] max-w-[1280px] mx-auto" />

    {/* Social icons */}
    <motion.div
      className="mt-8 flex justify-center gap-6"
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: [0.17, 0.67, 0.55, 1.28], delay: 0.1 }}
    >
      <a
        href="https://twitter.com/havani"
        aria-label="Twitter"
        target="_blank"
        rel="noopener"
        className="social-link"
      >
        <Twitter className="w-5 h-5" />
      </a>
      <a
        href="https://www.linkedin.com/company/havani"
        aria-label="LinkedIn"
        target="_blank"
        rel="noopener"
        className="social-link"
      >
        <Linkedin className="w-5 h-5" />
      </a>
    </motion.div>

    {/* Copyright */}
    <div className="mt-6 pb-14">
      <p className="text-center text-[#555555] text-xs">
        © 2025 Havani. Todos los derechos reservados.
      </p>
    </div>
  </footer>
);

export default FooterSection;
