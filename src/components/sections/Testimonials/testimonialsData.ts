
interface Testimonial {
  quote: string;
  name: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Havani creó nuestra nueva tienda online y las ventas subieron un 30% el primer trimestre. Su enfoque práctico realmente genera resultados de negocio notables.",
    name: "Laura, Fundadora de E‑commerce de Moda"
  },
  {
    quote: "Necesitábamos optimizar rutas. Havani entregó una solución de software robusta y muy eficiente. La calidad del desarrollo es impecable y ya notamos el ahorro.",
    name: "Javier, Gerente en Empresa de Logística"
  },
  {
    quote: "El equipo Havani se sintió como parte del nuestro. Entendieron perfecto nuestras necesidades contables y crearon una herramienta simple que nos facilitó la vida.",
    name: "Sofía, Socia en Despacho Contable"
  },
  {
    quote: "Implementaron un sistema de gestión para la flota sorprendentemente innovador y muy confiable. Mejoró nuestra respuesta y el servicio al cliente final enormemente.",
    name: "Ricardo, Dueño de Servicio de Grúas"
  },
  {
    quote: "¡Rápidos, confiables y geniales! Desarrollaron nuestra app de seguimiento justo como la pedimos y antes de lo esperado. Confianza total en su ejecución.",
    name: "Miguel, Director en Empresa de Paquetería"
  }
];

export type { Testimonial };
