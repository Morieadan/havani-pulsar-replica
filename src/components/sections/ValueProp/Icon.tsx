
import React from 'react';
import { Square, Lightbulb, Zap, Handshake } from 'lucide-react';

interface IconProps {
  name: 'simple' | 'idea' | 'speed' | 'handshake';
  className?: string;
}

// Map our custom icon names to actual Lucide React components
const iconMap = {
  simple: Square,
  idea: Lightbulb,
  speed: Zap,
  handshake: Handshake,
};

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const IconComponent = iconMap[name];
  return <IconComponent className={className} aria-hidden="true" />;
};
