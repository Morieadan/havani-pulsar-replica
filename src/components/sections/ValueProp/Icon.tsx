
import React from 'react';
import { Simple, Idea, Speed, Handshake } from 'lucide-react';

interface IconProps {
  name: 'simple' | 'idea' | 'speed' | 'handshake';
  className?: string;
}

const iconMap = {
  simple: Simple,
  idea: Idea,
  speed: Speed,
  handshake: Handshake,
};

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const IconComponent = iconMap[name];
  return <IconComponent className={className} aria-hidden="true" />;
};
