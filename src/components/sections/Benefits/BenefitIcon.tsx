
import { Brain, Heart, Handshake } from 'lucide-react';

interface BenefitIconProps {
  name: "brain-lightning" | "clear" | "handshake-heart";
  className?: string;
}

export const BenefitIcon: React.FC<BenefitIconProps> = ({ name, className }) => {
  const icons = {
    'brain-lightning': Brain,
    'clear': Heart,
    'handshake-heart': Handshake
  };

  const IconComponent = icons[name];
  return <IconComponent className={className} aria-hidden="true" />;
};
