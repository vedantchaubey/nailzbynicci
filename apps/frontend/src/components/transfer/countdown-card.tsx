// apps/frontend/src/components/transfer/countdown-card.tsx
import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, AlertCircle } from 'lucide-react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

dayjs.extend(duration);

interface CountdownCardProps {
  targetDate: string | Date;
  label: string;
  sublabel?: string;
  type?: 'seller-sla' | 'buyer-sla' | 'hard-stop' | 'window-opens';
  onExpire?: () => void;
  className?: string;
}

export function CountdownCard({
  targetDate,
  label,
  sublabel,
  type = 'seller-sla',
  onExpire,
  className,
}: CountdownCardProps) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
    isPast: boolean;
  }>({ hours: 0, minutes: 0, seconds: 0, totalSeconds: 0, isPast: false });

  useEffect(() => {
    const calculateTime = () => {
      const now = dayjs();
      const target = dayjs(targetDate);
      const diffMs = target.diff(now);

      if (diffMs <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, totalSeconds: 0, isPast: true });
        if (onExpire) {
          onExpire();
        }
        return;
      }

      const dur = dayjs.duration(diffMs);
      const hours = Math.floor(dur.asHours());
      const minutes = dur.minutes();
      const seconds = dur.seconds();
      const totalSeconds = Math.floor(diffMs / 1000);

      setTimeLeft({ hours, minutes, seconds, totalSeconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onExpire]);

  const isUrgent = !timeLeft.isPast && timeLeft.totalSeconds < 600; // < 10 mins
  const isCritical = !timeLeft.isPast && timeLeft.totalSeconds < 300; // < 5 mins

  return (
    <Card
      className={cn(
        'border transition-colors shadow-sm',
        timeLeft.isPast
          ? 'border-red-300 bg-red-50/50'
          : isCritical
          ? 'border-red-400 bg-red-50/30 animate-pulse'
          : isUrgent
          ? 'border-amber-300 bg-amber-50/30'
          : 'border-gray-200 bg-white',
        className,
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Clock
              className={cn(
                'w-4 h-4',
                timeLeft.isPast
                  ? 'text-red-500'
                  : isCritical
                  ? 'text-red-600'
                  : isUrgent
                  ? 'text-amber-500'
                  : 'text-gray-500',
              )}
            />
            <span className="text-xs font-semibold text-gray-800">{label}</span>
          </div>

          <Badge
            variant={
              timeLeft.isPast
                ? 'danger'
                : isCritical
                ? 'danger'
                : isUrgent
                ? 'warning'
                : 'neutral'
            }
          >
            {timeLeft.isPast ? 'Expired' : isCritical ? 'Urgent' : 'Active SLA'}
          </Badge>
        </div>

        <div className="flex items-baseline gap-2 my-1">
          {timeLeft.isPast ? (
            <div className="flex items-center gap-1.5 text-red-600 text-lg font-bold">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span>SLA Breached</span>
            </div>
          ) : (
            <div className="font-mono text-2xl font-black text-gray-900 tracking-tight">
              {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
          )}
        </div>

        {sublabel && (
          <p className="text-[11px] text-gray-500 mt-1 leading-snug">
            {sublabel}
          </p>
        )}

        {isCritical && !timeLeft.isPast && (
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-red-700 font-medium">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Less than 5 minutes remaining before automated failover!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
