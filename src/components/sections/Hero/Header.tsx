
/**
 * @component Header - Barra de navegación principal de Havani
 * Este componente implementa el header sticky con navegación, siguiendo el diseño de Pulsar.
 * Incluye enlaces de navegación, indicador de página activa y botón de inicio de sesión.
 * 
 * Prompt 1 - Hero
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

// Props para el componente Header
interface HeaderProps {
  hasScrolled: boolean;
}

const Header = ({ hasScrolled }: HeaderProps) => {
  // Estado para el link activo (por defecto 'home' en la landing)
  const [activeLink, setActiveLink] = useState('home');
  
  // Enlaces de navegación
  const navLinks = [
    { name: 'Home', id: 'home', href: '/' },
    { name: 'Valor', id: 'valor', href: '#valor' },
    { name: 'Proceso', id: 'proceso', href: '#proceso' },
    { name: 'Productos', id: 'productos', href: '#productos' },
    { name: 'Precios', id: 'precios', href: '/pricing' },
    { name: 'Contacto', id: 'contacto', href: '#final-cta' }
  ];
  
  // Estilos para los enlaces de navegación
  const linkStyles = "relative px-4 py-2 text-white hover:text-white/90 transition-colors";
  
  // Variantes para la animación del subrayado
  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: { 
        duration: 0.2,
        ease: [0.25, 0.8, 0.25, 1]
      }
    }
  };

  // Manejar el scroll al hacer clic en los enlaces
  const handleLinkClick = (id: string, href: string) => {
    setActiveLink(id);
    
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <header 
      id="site-nav" 
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors duration-300",
        hasScrolled 
          ? "bg-[rgba(0,0,0,.35)] backdrop-blur-sm" 
          : "bg-transparent"
      )}
      role="banner"
    >
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-white flex items-center">
          {/* Placeholder de logo, reemplazar con SVG real */}
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
            H
          </div>
        </Link>
        
        {/* Navegación central - Links */}
        <nav className="flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.href}
              className={cn(
                linkStyles,
                activeLink === link.id && "rounded-full bg-white/[.12] text-white"
              )}
              onClick={() => handleLinkClick(link.id, link.href)}
            >
              {link.name}
              {/* Subrayado animado en hover (solo para links no activos) */}
              {activeLink !== link.id && (
                <motion.span
                  className="absolute left-0 bottom-0 w-full h-0.5 bg-white/60"
                  initial="hidden"
                  whileHover="visible"
                  variants={underlineVariants}
                  style={{ originX: 0.5 }} // Centrar origen para efecto desde el centro
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
