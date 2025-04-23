/**
 * @component App - Componente principal de la aplicación Havani
 * Este componente configura el enrutamiento y los proveedores globales para la aplicación.
 * Implementa el diseño de Pulsar de Framer adaptado para Havani.
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ShootingStarsBackground from "@/components/ShootingStarsBackground";

// Rutas adicionales según las especificaciones de Havani
import NeuralCrane from "./pages/Servicios/NeuralCrane";
import AutoMike from "./pages/Servicios/AutoMike";
import Conciliador from "./pages/Servicios/Conciliador";
import Pricing from "./pages/Pricing";

// Crear cliente de consulta para React Query
const queryClient = new QueryClient();

const App = () => (
  <>
    <ShootingStarsBackground />
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Componentes de notificación */}
        <Toaster />
        <Sonner />
        {/* Configuración de enrutamiento */}
        <BrowserRouter>
          <Routes>
            {/* Ruta principal - Landing page */}
            <Route path="/" element={<Index />} />
            {/* Rutas de servicios específicos */}
            <Route path="/neuralcrane" element={<NeuralCrane />} />
            <Route path="/automike" element={<AutoMike />} />
            <Route path="/conciliador" element={<Conciliador />} />
            <Route path="/pricing" element={<Pricing />} />
            {/* Ruta de captura para páginas no encontradas */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </>
);

export default App;
