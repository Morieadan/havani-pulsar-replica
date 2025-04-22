
interface Benefit {
  title: string;
  description: string;
  icon: "brain-lightning" | "clear" | "handshake-heart";
  illustration: string;
  ariaLabel: string;
}

export const benefits: Benefit[] = [
  {
    title: "Innovación Práctica",
    description: "Aplicamos tecnología de vanguardia con un propósito claro: soluciones reales que impulsan tu negocio.",
    icon: "brain-lightning",
    illustration: "/assets/illu_innovacion.webp",
    ariaLabel: "Beneficio: Innovación práctica – Aplicamos tecnología de vanguardia con propósito claro"
  },
  {
    title: "Simplicidad Radical",
    description: "Hacemos lo complejo sorprendentemente simple con procesos transparentes.",
    icon: "clear",
    illustration: "/assets/illu_simplicidad.webp",
    ariaLabel: "Beneficio: Simplicidad radical – Hacemos lo complejo sorprendentemente simple"
  },
  {
    title: "Talento Experto y Cercano",
    description: "Equipo accesible + experiencia sólida; colaboramos codo a codo contigo.",
    icon: "handshake-heart",
    illustration: "/assets/illu_talento.webp",
    ariaLabel: "Beneficio: Talento experto y cercano – Equipo accesible con experiencia sólida"
  }
];
