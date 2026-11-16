// apps/frontend/src/components/ui/button.tsx
import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'volt';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    // Exact sizing tokens (40/48/56)
    const sizeClasses = {
      sm: 'h-10 px-5 text-[14px]',
      md: 'h-12 px-7 text-[16px]',
      lg: 'h-14 px-9 text-[16px] font-bold',
    }[size];

    // Restyled variants: zero library default look, flat surfaces, 1px lines
    const variantClasses = {
      // Primary: White-on-dark / Black-on-light (NOT volt per hard token ban)
      primary:
        'bg-white text-black hover:bg-neutral-200 active:scale-[0.97] border-0 disabled:bg-neutral-800 disabled:text-neutral-500',
      secondary:
        'bg-surface text-text border border-line hover:border-line-strong hover:bg-surface-2 active:scale-[0.97] disabled:border-line/40 disabled:text-text-3',
      outline:
        'bg-surface text-text border border-line hover:border-line-strong hover:bg-surface-2 active:scale-[0.97] disabled:border-line/40 disabled:text-text-3',
      ghost:
        'bg-transparent text-text-2 hover:text-text hover:bg-surface active:scale-[0.97] disabled:text-text-3',
      destructive:
        'bg-risk text-white hover:bg-red-600 active:scale-[0.97] disabled:bg-risk/40',
      volt:
        'bg-volt text-black hover:bg-volt-dark active:scale-[0.97] disabled:bg-volt/40',
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center font-semibold rounded-pill tracking-tight select-none transition-all duration-press ease-nike disabled:cursor-not-allowed disabled:pointer-events-none ${sizeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Loading</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
