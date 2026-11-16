// apps/frontend/src/app/admin/escrow/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  RefreshCw,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { EscrowStatus, formatPaiseToInr } from '@ticketpass/shared';
import { apiClient } from '../../../lib/api-client';
import { Card, CardHeader, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';

export default function AdminEscrowPage() {
  const [escrowState, setEscrowState] = useState<{ totalHeldPaise: number; transactions: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEscrowLedger = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiClient.get('/admin/escrow');
      setEscrowState(res.data);
    } catch (err: any) {
      console.error('Failed to load escrow ledger:', err);
      setError(err?.message || 'Failed to load escrow transactions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEscrowLedger();
  }, []);

  const getEscrowStatusBadge = (status: EscrowStatus) => {
    switch (status) {
      case EscrowStatus.HOLDING:
        return <Badge variant="success">Secured in Vault</Badge>;
      case EscrowStatus.RELEASED:
        return <Badge variant="neutral">Settled to Seller</Badge>;
      case EscrowStatus.REFUNDED:
        return <Badge variant="neutral">Refunded to Buyer</Badge>;
      case EscrowStatus.DISPUTED:
        return <Badge variant="danger">Disputed Freeze</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">Escrow Custody Vault Ledger</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time balance reconciliation of buyer funds and seller 20% security deposits.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchEscrowLedger}
          className="text-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Audit Reconciliation</span>
        </Button>
      </div>

      {/* Top Escrow Summary Banner */}
      <div className="p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-gray-900 text-white rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Lock className="w-4 h-4" />
            <span>Autonomous Escrow Holding Balance</span>
          </div>
          <div className="text-3xl md:text-4xl font-black font-mono tracking-tight text-white">
            {formatPaiseToInr(escrowState?.totalHeldPaise || 0)}
          </div>
          <p className="text-xs text-emerald-200/80 mt-1">
            Reconciled with Razorpay Route nodal and platform held custody accounts.
          </p>
        </div>

        <div className="p-4 bg-white/10 rounded-xl backdrop-blur-xs border border-white/10 text-xs space-y-1">
          <div className="text-gray-300 font-semibold">Autonomous Guardrails:</div>
          <div className="text-emerald-300 font-mono">1. Never release on transfer initiated</div>
          <div className="text-emerald-300 font-mono">2. Require Signal A + Confidence ≥ 80</div>
          <div className="text-emerald-300 font-mono">3. 30m before event hard-stop auto-refund</div>
        </div>
      </div>

      {/* Ledger Table */}
      <Card className="border-gray-200 bg-white shadow-sm overflow-hidden">
        <CardHeader className="bg-gray-50/70 border-b border-gray-100 pb-3 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Escrow Custody Transactions ({escrowState?.transactions?.length || 0})
          </h3>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="py-16 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-brand-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Loading ledger records...</p>
            </div>
          ) : !escrowState?.transactions || escrowState.transactions.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-400">
              No escrow transactions logged yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-200 text-gray-500 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Transaction ID</th>
                    <th className="py-3 px-4">Order Ref</th>
                    <th className="py-3 px-4">Buyer Amount</th>
                    <th className="py-3 px-4">Seller Bond</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Razorpay Ref</th>
                    <th className="py-3 px-4 text-right">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {escrowState.transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-gray-900">
                        #{tx.id.slice(-8).toUpperCase()}
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/transfer/${tx.orderId}`}
                          className="font-mono text-brand-600 hover:text-brand-700 font-bold inline-flex items-center gap-1"
                        >
                          #{tx.orderId.slice(-8).toUpperCase()}
                          <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-gray-900">
                        {formatPaiseToInr(tx.amountPaise)}
                      </td>
                      <td className="py-3 px-4 font-mono text-emerald-700">
                        {tx.sellerDepositPaise ? `+${formatPaiseToInr(tx.sellerDepositPaise)}` : '—'}
                      </td>
                      <td className="py-3 px-4">
                        {getEscrowStatusBadge(tx.status)}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-gray-500">
                        {tx.razorpayPaymentId || 'pay_simulated'}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-400 font-mono text-[11px]">
                        {new Date(tx.createdAt).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
