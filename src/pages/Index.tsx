
/**
 * @component Index - Página principal (Landing) de Havani
 * 
 * Esta página integra todas las secciones de la landing page siguiendo el diseño
 * de la plantilla Pulsar adaptada a Havani. Las secciones se cargarán dinámicamente
 * a medida que se vayan desarrollando con los prompts específicos.
 */

import { useEffect } from 'react';

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
      {/* 
        Esta es la estructura base que contendrá todas las secciones.
        Cada sección se integrará a medida que se desarrolle con los prompts específicos.
      */}
      
      {/* Sección Hero - Se añadirá con el prompt específico */}
      <section className="flex items-center justify-center min-h-screen p-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">Havani</h1>
          <p className="text-text-secondary text-xl mb-8">
            Inteligencia Artificial para Empresas
          </p>
          <p className="text-text-tertiary">
            Esta landing page está en desarrollo. Las secciones se irán añadiendo con cada prompt específico.
          </p>
        </div>
      </section>
      
      {/* Aquí se añadirán el resto de secciones específicas */}
      {/* Sección Propuesta de Valor */}
      {/* Sección Problema/Solución */}
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
