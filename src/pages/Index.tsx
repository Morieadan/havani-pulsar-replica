
/**
 * @component Index - Página principal (Landing) de Havani
 * 
 * Esta página integra todas las secciones de la landing page siguiendo el diseño
 * de la plantilla Pulsar adaptada a Havani. Las secciones se cargarán dinámicamente
 * a medida que se vayan desarrollando con los prompts específicos.
 */

import { useEffect } from 'react';
import HeroSection from '@/components/sections/Hero/HeroSection';
import ValuePropSection from '@/components/sections/ValueProp/ValuePropSection';
import ProblemSolutionSection from '@/components/sections/ProblemSolution/ProblemSolutionSection';
import BrainSection from '@/components/sections/Brain/BrainSection';
import ProcessSection from '@/components/sections/Process/ProcessSection';
import FlagshipProductsSection from '@/components/sections/FlagshipProducts/FlagshipProductsSection';
import ServicesSection from '@/components/sections/Services/ServicesSection';
import BenefitsSection from '@/components/sections/Benefits/BenefitsSection';
import StorySection from '@/components/sections/Story/StorySection';
import TestimonialsSection from '@/components/sections/Testimonials/TestimonialsSection';
import ComparisonSection from '@/components/sections/Comparison/ComparisonSection';
import FinalCTASection from "@/components/sections/CTA/FinalCTASection";
import FooterSection from "@/components/sections/Footer/FooterSection";

const Index = () => {
  
  // Establecer el color de fondo del cuerpo y otras configuraciones globales
  useEffect(() => {
    // Configurar el fondo negro para toda la página
    document.body.classList.add('bg-bg-body');
    document.body.classList.add('text-text-primary');
    
    // Configurar el título de la página
    document.title = 'Havani - Inteligencia Artificial para Empresas';
    
    // Limpieza al desmontar el componente
    return () => {
      document.body.classList.remove('bg-bg-body');
      document.body.classList.remove('text-text-primary');
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-bg-body text-text-primary">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Problem/Solution Section */}
      <ProblemSolutionSection />
      
      {/* Brain Section - Colocada entre Problem/Solution y ValueProp */}
      <BrainSection />
      
      {/* Value Proposition Section */}
      <ValuePropSection />
      
      {/* Sección Proceso */}
      <ProcessSection />
      
      {/* Sección Servicios */}
      <ServicesSection />
      
      {/* Sección Beneficios */}
      <BenefitsSection />
      
      {/* Sección Productos Insignia */}
      <FlagshipProductsSection />
      
      {/* Sección Historia */}
      <StorySection />
      
      {/* Sección Testimonios */}
      <TestimonialsSection />
      
      {/* Sección Comparativa */}
      <ComparisonSection />
      
      {/* SECCIÓN CTA FINAL */}
      <FinalCTASection />
      
      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default Index;
