// apps/frontend/src/app/admin/audit-logs/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  RefreshCw,
  Loader2,
  ChevronRight,
  ChevronDown,
  Clock,
  Shield,
  Activity,
} from 'lucide-react';
import { apiClient } from '../../../lib/api-client';
import { Card, CardHeader, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [entityFilter, setEntityFilter] = useState<string>('');

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = entityFilter
        ? `/admin/audit-logs?entity=${entityFilter}&limit=50`
        : `/admin/audit-logs?limit=50`;
      const res = await apiClient.get(url);
      setLogs(res.data?.items || []);
    } catch (err: any) {
      console.error('Failed to load audit logs:', err);
      setError(err?.message || 'Failed to fetch audit log trail.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, [entityFilter]);

  const toggleExpand = (id: string) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">System Audit Log Trail</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Immutable cryptographic records of all state machine transitions and administrator actions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-xl border border-gray-300 bg-white"
          >
            <option value="">All Entities</option>
            <option value="Order">Order</option>
            <option value="TransferSession">TransferSession</option>
            <option value="Dispute">Dispute</option>
            <option value="Listing">Listing</option>
            <option value="User">User</option>
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchAuditLogs}
            className="text-xs flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      <Card className="border-gray-200 bg-white shadow-sm overflow-hidden">
        <CardHeader className="bg-gray-50/70 border-b border-gray-100 pb-3 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Audit Events ({logs.length})
          </h3>
          <span className="text-[11px] text-gray-400 font-mono">Append-Only Immutable Ledger</span>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-brand-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Querying immutable audit logs...</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-400">
              No audit log entries recorded for this filter.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {logs.map((log) => {
                const isExpanded = expandedLogId === log.id;

                return (
                  <div key={log.id} className="p-4 hover:bg-gray-50/50 transition-colors">
                    <div
                      onClick={() => toggleExpand(log.id)}
                      className="flex items-center justify-between cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-gray-100 text-gray-600 rounded-lg">
                          <Activity className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-xs text-gray-900">{log.action}</span>
                            <Badge variant="outline" className="text-[10px]">
                              {log.entity}
                            </Badge>
                            {log.entityId && (
                              <span className="font-mono text-[10px] text-gray-400">
                                ID: #{log.entityId.slice(-8).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-gray-400 mt-0.5">
                            Actor: <strong className="font-mono text-gray-700">{log.actorId || 'SYSTEM'}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-gray-400">
                          {new Date(log.createdAt).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </span>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] font-mono">
                        {log.before && (
                          <div className="p-2.5 bg-red-50/50 rounded-lg border border-red-100">
                            <div className="text-red-700 font-bold mb-1">State Before:</div>
                            <pre className="text-gray-700 overflow-x-auto whitespace-pre-wrap">
                              {JSON.stringify(log.before, null, 2)}
                            </pre>
                          </div>
                        )}
                        {log.after && (
                          <div className="p-2.5 bg-emerald-50/50 rounded-lg border border-emerald-100">
                            <div className="text-emerald-700 font-bold mb-1">State After:</div>
                            <pre className="text-gray-700 overflow-x-auto whitespace-pre-wrap">
                              {JSON.stringify(log.after, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
