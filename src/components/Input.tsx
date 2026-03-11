'use client';

import { motion } from 'framer-motion';
import { InputHTMLAttributes, forwardRef, useMemo } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onDrag'> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    // Separate motion props from HTML props to avoid type conflicts
    const { style, onFocus, onBlur, className: motionClassName, ...htmlProps } = props as any;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">
            {label}
          </label>
        )}
        <motion.input
          ref={ref}
          className={`
            w-full bg-white/5 border border-white/10 
            px-4 py-3 text-white placeholder:text-white/30
            focus:outline-none focus:border-white/30 
            transition-colors duration-300
            ${error ? 'border-red-500/50' : ''}
            ${className}
          `}
          whileFocus={{ scale: 1.01 }}
          {...htmlProps}
        />
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-xs text-red-400"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';