// apps/frontend/src/components/ui/input.tsx
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leadingIcon?: React.ReactNode;
  trailingElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      label,
      error,
      hint,
      leadingIcon,
      trailingElement,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[12px] font-bold uppercase tracking-wider text-text-2 select-none"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leadingIcon && (
            <div className="absolute left-4 text-text-3 pointer-events-none flex items-center">
              {leadingIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={`w-full h-14 bg-surface border rounded-[12px] text-[16px] text-text placeholder:text-text-3 transition-colors duration-state px-4 ${
              leadingIcon ? 'pl-11' : ''
            } ${trailingElement ? 'pr-12' : ''} ${
              error
                ? 'border-risk focus:border-risk'
                : 'border-line focus:border-text hover:border-line-strong'
            } disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
            {...props}
          />

          {trailingElement && (
            <div className="absolute right-4 flex items-center">
              {trailingElement}
            </div>
          )}
        </div>

        {error ? (
          <p className="text-[12px] font-medium text-risk">{error}</p>
        ) : hint ? (
          <p className="text-[12px] text-text-3">{hint}</p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
