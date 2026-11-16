// apps/frontend/src/components/ui/shape-skeletons.tsx
import * as React from 'react';

export const EventCardSkeleton: React.FC<{ aspectRatio?: '4:5' | '16:9' }> = ({
  aspectRatio = '4:5',
}) => {
  const aspect = aspectRatio === '4:5' ? 'aspect-[4/5]' : 'aspect-[16/9]';
  return (
    <div className={`w-full rounded-[4px] border border-line bg-surface overflow-hidden flex flex-col justify-end p-5 ${aspect}`}>
      <div className="w-full flex flex-col gap-3 animate-pulse">
        <div className="w-20 h-4 bg-surface-2 rounded-full" />
        <div className="w-3/4 h-7 bg-surface-2 rounded" />
        <div className="w-1/2 h-4 bg-surface-2 rounded" />
        <div className="w-full h-8 bg-surface-2 rounded mt-2" />
      </div>
    </div>
  );
};

export const ListingRowSkeleton: React.FC = () => {
  return (
    <div className="h-[88px] px-6 border-b border-line flex items-center justify-between animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="w-32 h-6 bg-surface-2 rounded" />
        <div className="w-48 h-4 bg-surface-2 rounded" />
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="w-24 h-7 bg-surface-2 rounded" />
        <div className="w-16 h-3 bg-surface-2 rounded" />
      </div>
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="w-full flex flex-col divide-y divide-line border border-line rounded-[8px] bg-surface overflow-hidden animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-14 px-6 flex items-center justify-between">
          <div className="w-36 h-4 bg-surface-2 rounded" />
          <div className="w-24 h-4 bg-surface-2 rounded" />
          <div className="w-28 h-4 bg-surface-2 rounded" />
          <div className="w-16 h-4 bg-surface-2 rounded" />
        </div>
      ))}
    </div>
  );
};
