// apps/frontend/src/components/ui/icon-button.tsx
import * as React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost';
  ariaLabel: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className = '', size = 'md', variant = 'secondary', ariaLabel, children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-10 h-10',
      md: 'w-12 h-12',
      lg: 'w-14 h-14',
    }[size];

    const variantClasses = {
      primary: 'bg-white text-black hover:bg-neutral-200 active:scale-[0.95]',
      secondary: 'bg-surface text-text border border-line hover:border-line-strong active:scale-[0.95]',
      ghost: 'bg-transparent text-text-2 hover:text-text hover:bg-surface active:scale-[0.95]',
    }[variant];

    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        className={`inline-flex items-center justify-center rounded-pill transition-all duration-press ease-nike disabled:opacity-40 disabled:pointer-events-none ${sizeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
