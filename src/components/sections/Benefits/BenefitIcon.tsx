
import { Brain, Heart, HandshakePulse } from 'lucide-react';

interface BenefitIconProps {
  name: "brain-lightning" | "clear" | "handshake-heart";
  className?: string;
}

export const BenefitIcon: React.FC<BenefitIconProps> = ({ name, className }) => {
  const icons = {
    'brain-lightning': Brain,
    'clear': Heart,
    'handshake-heart': HandshakePulse
  };

  const IconComponent = icons[name];
  return <IconComponent className={className} aria-hidden="true" />;
};
