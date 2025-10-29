
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-brand-secondary p-6 rounded-xl shadow-lg border border-brand-accent/20 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
