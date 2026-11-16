// apps/frontend/src/components/transfer/activity-feed.tsx
import React from 'react';
import dayjs from 'dayjs';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Activity, ShieldCheck, ArrowRightLeft, DollarSign, AlertCircle, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface TransferLogItem {
  id?: string;
  action: string;
  actor: 'BUYER' | 'SELLER' | 'SYSTEM' | 'ADMIN';
  details?: Record<string, any> | string;
  createdAt: string | Date;
}

interface ActivityFeedProps {
  logs: TransferLogItem[];
  className?: string;
}

export function ActivityFeed({ logs, className }: ActivityFeedProps) {
  const getActorBadge = (actor: string) => {
    switch (actor) {
      case 'BUYER':
        return <Badge variant="outline" className="text-[10px] text-blue-700 bg-blue-50">Buyer</Badge>;
      case 'SELLER':
        return <Badge variant="outline" className="text-[10px] text-purple-700 bg-purple-50">Seller</Badge>;
      case 'SYSTEM':
        return <Badge variant="outline" className="text-[10px] text-emerald-700 bg-emerald-50">System Engine</Badge>;
      case 'ADMIN':
        return <Badge variant="outline" className="text-[10px] text-amber-700 bg-amber-50">Admin</Badge>;
      default:
        return <Badge variant="neutral" className="text-[10px]">{actor}</Badge>;
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes('PAYMENT') || action.includes('ESCROW') || action.includes('PAYOUT')) {
      return <DollarSign className="w-3.5 h-3.5 text-emerald-600" />;
    }
    if (action.includes('VERIFIED') || action.includes('CONFIRM')) {
      return <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />;
    }
    if (action.includes('DISPUTE') || action.includes('BREACH')) {
      return <AlertCircle className="w-3.5 h-3.5 text-red-600" />;
    }
    if (action.includes('INITIATE') || action.includes('TRANSFER')) {
      return <ArrowRightLeft className="w-3.5 h-3.5 text-purple-600" />;
    }
    return <FileText className="w-3.5 h-3.5 text-gray-500" />;
  };

  return (
    <Card className={cn('border-gray-200 bg-white shadow-sm overflow-hidden', className)}>
      <CardHeader className="bg-gray-50/70 border-b border-gray-100 pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-gray-700" />
          <h3 className="text-sm font-bold text-gray-900">Live Transfer Audit Log</h3>
        </div>
        <span className="text-[11px] text-gray-400 font-mono">
          {logs.length} {logs.length === 1 ? 'event' : 'events'} recorded
        </span>
      </CardHeader>

      <CardContent className="pt-4">
        {logs.length === 0 ? (
          <div className="py-8 text-center text-xs text-gray-400">
            No transfer activities logged yet.
          </div>
        ) : (
          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
            {logs.map((log, index) => {
              const formattedTime = dayjs(log.createdAt).format('HH:mm:ss');
              const formattedDate = dayjs(log.createdAt).format('DD MMM');
              const detailsString =
                typeof log.details === 'string'
                  ? log.details
                  : log.details && typeof log.details === 'object'
                  ? Object.entries(log.details)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(' • ')
                  : null;

              return (
                <div key={log.id || index} className="relative group">
                  <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-xs">
                    {getActionIcon(log.action)}
                  </div>

                  <div className="bg-gray-50/60 hover:bg-gray-50 p-3 rounded-xl border border-gray-100 transition-colors">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-gray-800">{log.action}</span>
                        {getActorBadge(log.actor)}
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 whitespace-nowrap">
                        {formattedDate} {formattedTime}
                      </span>
                    </div>

                    {detailsString && (
                      <p className="text-[11px] text-gray-600 mt-1 font-mono leading-relaxed break-words">
                        {detailsString}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
