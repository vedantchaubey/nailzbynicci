// apps/frontend/src/components/ui/countdown-block.tsx
'use client';

import * as React from 'react';

export interface CountdownBlockProps {
  targetDate: Date | string | number;
  label?: string;
  size?: 'md' | 'lg' | 'hero';
  onExpire?: () => void;
  className?: string;
}

export const CountdownBlock: React.FC<CountdownBlockProps> = ({
  targetDate,
  label = 'STARTS IN',
  size = 'lg',
  onExpire,
  className = '',
}) => {
  const [timeLeft, setTimeLeft] = React.useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
    isExpired: false,
  });

  React.useEffect(() => {
    const calculate = () => {
      const targetTime = new Date(targetDate).getTime();
      const diff = targetTime - Date.now();

      if (diff <= 0) {
        setTimeLeft({ hours: '00', minutes: '00', seconds: '00', isExpired: true });
        if (onExpire) onExpire();
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
        isExpired: false,
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onExpire]);

  const numeralSizeClasses = {
    md: 'text-2xl md:text-3xl font-extrabold',
    lg: 'text-4xl md:text-5xl font-black',
    hero: 'text-6xl md:text-7xl font-black text-volt',
  }[size];

  return (
    <div className={`flex flex-col gap-1 select-none ${className}`}>
      {label && (
        <span className="text-[11px] font-bold uppercase tracking-widest text-text-3">
          {label}
        </span>
      )}

      <div className="flex items-baseline gap-1.5 font-display tabular-nums">
        <div className="flex flex-col items-center">
          <span className={numeralSizeClasses}>{timeLeft.hours}</span>
          <span className="text-[10px] font-semibold uppercase text-text-3 tracking-wider">HRS</span>
        </div>

        <span className={`${numeralSizeClasses} text-text-3`}>:</span>

        <div className="flex flex-col items-center">
          <span className={numeralSizeClasses}>{timeLeft.minutes}</span>
          <span className="text-[10px] font-semibold uppercase text-text-3 tracking-wider">MIN</span>
        </div>

        <span className={`${numeralSizeClasses} text-text-3`}>:</span>

        <div className="flex flex-col items-center">
          <span className={`${numeralSizeClasses} text-volt`}>{timeLeft.seconds}</span>
          <span className="text-[10px] font-semibold uppercase text-volt tracking-wider">SEC</span>
        </div>
      </div>
    </div>
  );
};
