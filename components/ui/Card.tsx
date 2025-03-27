import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hasShadow?: boolean;
  hasBorder?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hasShadow = true,
  hasBorder = true,
  padding = 'md',
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7',
  };
  
  const shadowClass = hasShadow ? 'shadow-md' : '';
  const borderClass = hasBorder ? 'border border-gray-200' : '';
  
  const classNames = `bg-white rounded-lg ${paddingClasses[padding]} ${shadowClass} ${borderClass} ${className}`;
  
  return <div className={classNames}>{children}</div>;
};

export default Card;