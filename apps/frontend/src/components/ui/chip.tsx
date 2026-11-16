// apps/frontend/src/components/ui/chip.tsx
import * as React from 'react';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'filter' | 'status' | 'tag' | 'live' | 'sold';
  active?: boolean;
  pulse?: boolean;
  onSelect?: () => void;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'tag',
  active = false,
  pulse = false,
  onSelect,
  className = '',
  ...props
}) => {
  const isInteractive = !!onSelect;

  let baseStyle = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-[12px] font-semibold tracking-wider uppercase transition-all duration-state select-none ';

  if (variant === 'live') {
    baseStyle += 'bg-volt/10 text-volt border border-volt/30 ';
  } else if (variant === 'sold') {
    baseStyle += 'bg-surface-2 text-text-3 border border-line ';
  } else if (variant === 'filter') {
    baseStyle += active
      ? 'bg-white text-black border border-white '
      : 'bg-surface text-text-2 border border-line hover:border-line-strong hover:text-text ';
  } else if (variant === 'status') {
    baseStyle += active
      ? 'bg-volt text-black border border-volt '
      : 'bg-surface-2 text-text border border-line ';
  } else {
    // Default tag
    baseStyle += 'bg-surface text-text-2 border border-line ';
  }

  if (isInteractive) {
    baseStyle += 'cursor-pointer active:scale-[0.96] ';
  }

  return (
    <div
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`${baseStyle} ${className}`}
      {...props}
    >
      {(variant === 'live' || pulse) && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-volt opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-volt" />
        </span>
      )}
      <span>{children}</span>
    </div>
  );
};
