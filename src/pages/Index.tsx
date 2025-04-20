
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
import ProcessSection from '@/components/sections/Process/ProcessSection';

// Este componente será un contenedor para todas las secciones
// Se irán añadiendo las secciones a medida que se desarrollen
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
      {/* Sección Hero - Implementada con el prompt específico */}
      <HeroSection />
      
      {/* Sección Propuesta de Valor */}
      <ValuePropSection />
      
      {/* Sección Problema/Solución */}
      <ProblemSolutionSection />
      
      {/* Sección Proceso */}
      <ProcessSection />
      
      {/* Aquí se añadirán el resto de secciones específicas */}
      {/* Sección Características */}
      {/* Sección Productos Insignia */}
      {/* Sección Testimonios */}
      {/* Sección Precios */}
      {/* Sección FAQ */}
      {/* Sección CTA */}
      {/* Sección Equipo */}
      {/* Sección Blog */}
      {/* Sección Footer */}
    </div>
  );
};

export default Index;
