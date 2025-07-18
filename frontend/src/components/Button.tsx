import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  size?: 'md' | 'sm';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const base =
    'rounded font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-400';
  const sizeClass =
    size === 'sm'
      ? 'px-3 py-1 text-sm'
      : 'px-4 py-2';
  const variantClass =
    variant === 'outline'
      ? 'border border-blue-600 text-blue-600 bg-white hover:bg-blue-50'
      : 'bg-blue-600 text-white hover:bg-blue-700';

  return (
    <button className={`${base} ${sizeClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button; 