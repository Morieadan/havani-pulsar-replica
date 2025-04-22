
export interface Service {
  name: string;
  description: string;
  icon: 'rocket' | 'robot' | 'laptop' | 'compass';
}

export const services: Service[] = [
  {
    name: "Desarrollo de Productos Digitales",
    description: "Convertimos tu idea en un SaaS o app escalable lista para generar ingresos.",
    icon: "rocket"
  },
  {
    name: "Automatización Inteligente",
    description: "Libera a tu equipo: automatizamos tareas repetitivas y optimizamos flujos.",
    icon: "robot"
  },
  {
    name: "Desarrollo Web y Móvil",
    description: "Plataformas web robustas y apps móviles intuitivas creadas con código limpio.",
    icon: "laptop"
  },
  {
    name: "Consultoría Tecnológica",
    description: "Asesoría experta para elegir herramientas correctas y maximizar ROI tech.",
    icon: "compass"
  }
];
