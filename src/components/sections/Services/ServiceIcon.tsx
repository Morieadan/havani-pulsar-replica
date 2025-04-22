
import { Rocket, Robot, Laptop, Compass } from 'lucide-react';

interface ServiceIconProps {
  name: 'rocket' | 'robot' | 'laptop' | 'compass';
  className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ name, className }) => {
  const icons = {
    'rocket': Rocket,
    'robot': Robot,
    'laptop': Laptop,
    'compass': Compass
  };

  const IconComponent = icons[name];
  return <IconComponent className={className} aria-hidden="true" />;
};
