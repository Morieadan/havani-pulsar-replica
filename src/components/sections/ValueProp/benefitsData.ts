
export interface BenefitData {
  icon: 'simple' | 'idea' | 'speed' | 'handshake';
  title: string;
  description: string;
  ariaLabel: string;
}

export const benefitsData: BenefitData[] = [
  {
    icon: 'simple',
    title: 'Simplicidad ante Todo',
    description: 'Eliminamos la complejidad innecesaria. Nuestras soluciones son claras, directas y fáciles de mantener.',
    ariaLabel: 'Pilar: Simplicidad ante Todo'
  },
  {
    icon: 'idea',
    title: 'Innovación Práctica',
    description: 'Aplicamos tecnologías modernas de forma sensata, priorizando resultados sobre tendencias pasajeras.',
    ariaLabel: 'Pilar: Innovación Práctica'
  },
  {
    icon: 'speed',
    title: 'Velocidad sin Sacrificios',
    description: 'Desarrollo ágil y eficiente sin comprometer la calidad. Entregas rápidas y código robusto.',
    ariaLabel: 'Pilar: Velocidad sin Sacrificios'
  },
  {
    icon: 'handshake',
    title: 'Colaboración Transparente',
    description: 'Comunicación clara y directa. Somos un equipo extendido de tu empresa, no solo proveedores.',
    ariaLabel: 'Pilar: Colaboración Transparente'
  }
];
