import React from 'react';
import { cn } from '@/lib/utils/common';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  hover = false,
  onClick,
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const Component = hover ? motion.div : 'div';

  return (
    <Component
      className={cn(
        'bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden', // Increased roundness, lighter border
        paddingClasses[padding],
        hover && 'cursor-pointer hover:shadow-lg', // Removed simple hover, handle via motion
        className
      )}
      onClick={onClick}
      {...(hover
        ? {
            whileHover: { y: -4, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },
            transition: { type: 'spring', stiffness: 300 }
          }
        : {})}
    >
      {children}
    </Component>
  );
};
