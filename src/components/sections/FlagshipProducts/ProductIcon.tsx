
import { Route, FileText, Receipt } from 'lucide-react';

interface ProductIconProps {
  name: 'route' | 'file-text' | 'receipt';
  className?: string;
}

export const ProductIcon: React.FC<ProductIconProps> = ({ name, className }) => {
  const icons = {
    'route': Route,
    'file-text': FileText,
    'receipt': Receipt
  };

  const IconComponent = icons[name];
  return <IconComponent className={className} />;
};
