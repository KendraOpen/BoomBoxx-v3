'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className = '', children, ...props }, ref) => {
    const baseStyles = 'px-8 py-3 rounded-none font-medium text-sm uppercase tracking-wider transition-all duration-300';
    
    const variants = {
      primary: 'bg-white text-black hover:bg-neutral-200',
      secondary: 'border border-white/30 text-white hover:border-white hover:bg-white/5',
    };

    return (
      <motion.button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...(props as HTMLMotionProps<'button'>)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';