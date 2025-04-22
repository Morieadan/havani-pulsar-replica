
export interface Product {
  name: string;
  description: string;
  icon: 'route' | 'file-text' | 'receipt';
  url: string;
}

export const products: Product[] = [
  {
    name: 'NeuralCrane',
    description: 'Gestión inteligente que automatiza asignaciones y rutas en tiempo real.',
    icon: 'route',
    url: '/neuralcrane'
  },
  {
    name: 'AutoMike',
    description: 'Automatiza expedientes y elimina tiempo perdido en gestiones documentales.',
    icon: 'file-text',
    url: '/automike'
  },
  {
    name: 'Conciliador',
    description: 'Factura y concilia servicios sin esfuerzo, con visibilidad total de cobros.',
    icon: 'receipt',
    url: '/conciliador'
  }
];
