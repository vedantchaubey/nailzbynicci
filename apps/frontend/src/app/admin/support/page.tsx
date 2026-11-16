// apps/frontend/src/app/admin/support/page.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';

interface SupportTicketRow {
  id: string;
  category: 'ENTRY_PROBLEM' | 'WRONG_RECIPIENT' | 'REFUND_DISPUTE' | 'GENERAL';
  event: string;
  user: string;
  phone: string;
  openedAt: string;
  slaRemainingMinutes: number;
  priority: 'CRITICAL' | 'HIGH' | 'NORMAL';
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED';
  subject: string;
}

export default function AdminSupportPage() {
  const [filter, setFilter] = useState<string>('ALL');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicketRow | null>(null);

  const [tickets, setTickets] = useState<SupportTicketRow[]>([
    {
      id: 'TICK-9081',
      category: 'ENTRY_PROBLEM',
      event: 'Coldplay: Music of the Spheres (Ahmedabad)',
      user: 'Siddharth Rao',
      phone: '+91 98200 11928',
      openedAt: '8 mins ago',
      slaRemainingMinutes: 7,
      priority: 'CRITICAL',
      status: 'OPEN',
      subject: 'Barcode turnstile red light at Gate 3. Need instant override.',
    },
    {
      id: 'TICK-9074',
      category: 'WRONG_RECIPIENT',
      event: 'IPL 2026: SRH vs PBKS (Hyderabad)',
      user: 'Pooja Nair',
      phone: '+91 99401 88219',
      openedAt: '24 mins ago',
      slaRemainingMinutes: 36,
      priority: 'HIGH',
      status: 'INVESTIGATING',
      subject: 'Seller sent transfer to wrong BMS mobile number.',
    },
    {
      id: 'TICK-8992',
      category: 'REFUND_DISPUTE',
      event: 'Diljit Dosanjh: Dil-Luminati Tour (Delhi NCR)',
      user: 'Manish Gupta',
      phone: '+91 98110 55410',
      openedAt: '2 hours ago',
      slaRemainingMinutes: 120,
      priority: 'NORMAL',
      status: 'OPEN',
      subject: 'Event rescheduled date conflict. Requesting credit refund.',
    },
  ]);

  const filteredTickets = tickets.filter((t) => {
    if (filter === 'ALL') return true;
    if (filter === 'ENTRY_PROBLEM') return t.category === 'ENTRY_PROBLEM';
    if (filter === 'WRONG_RECIPIENT') return t.category === 'WRONG_RECIPIENT';
    return true;
  });

  const handleResolve = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 'RESOLVED' } : t))
    );
    setSelectedTicket(null);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-line">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span className="text-xs font-mono uppercase tracking-widest text-text-3">
              LIVE OPERATIONS TRIAGE &bull; 15-MINUTE ENTRY SLA
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-display text-text">
            SUPPORT QUEUE
          </h1>
          <p className="text-xs text-text-2 max-w-xl">
            Real-time incident response desk. Gate entry problems trigger an automated 15-minute emergency SLA with instant replacement or 100% refund capability.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'ENTRY_PROBLEM', 'WRONG_RECIPIENT'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition-colors ${
                filter === cat
                  ? 'bg-text text-black font-bold'
                  : 'bg-surface text-text-3 hover:text-text'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Alert Banner if any ENTRY_PROBLEM is open */}
      {tickets.some((t) => t.category === 'ENTRY_PROBLEM' && t.status !== 'RESOLVED') && (
        <div className="p-4 bg-surface-2 border border-rose-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            <div>
              <div className="text-sm font-bold uppercase tracking-wider text-rose-400 font-display">
                ACTIVE DAY-OF-EVENT GATE ENTRY ESCALATION
              </div>
              <div className="text-xs text-text-2">
                1 fan actively blocked at stadium turnstiles. Urgent action required before the 15-minute SLA expires.
              </div>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setSelectedTicket(tickets.find((t) => t.category === 'ENTRY_PROBLEM') || null)}
          >
            HANDLE INCIDENT
          </Button>
        </div>
      )}

      {/* Ticket Table */}
      <div className="border border-line overflow-x-auto bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-surface-2 text-xs font-mono uppercase tracking-wider text-text-3">
            <tr>
              <th className="py-3 px-4">TICKET ID &amp; CATEGORY</th>
              <th className="py-3 px-4">EVENT &amp; FAN</th>
              <th className="py-3 px-4">SUBJECT SUMMARY</th>
              <th className="py-3 px-4 text-center">SLA REMAINING</th>
              <th className="py-3 px-4 text-center">PRIORITY</th>
              <th className="py-3 px-4 text-right">STATUS</th>
              <th className="py-3 px-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filteredTickets.map((t) => (
              <tr key={t.id} className="hover:bg-surface-2 transition-colors">
                <td className="py-4 px-4 font-mono text-xs">
                  <div className="font-bold text-text">{t.id}</div>
                  <div className="text-volt font-bold text-[10px] uppercase">
                    {t.category.replace('_', ' ')}
                  </div>
                </td>
                <td className="py-4 px-4 text-xs">
                  <div className="font-bold text-text truncate max-w-xs">{t.event}</div>
                  <div className="text-text-3 font-mono">
                    {t.user} &bull; {t.phone}
                  </div>
                </td>
                <td className="py-4 px-4 text-xs text-text-2 max-w-sm truncate">
                  {t.subject}
                </td>
                <td className="py-4 px-4 text-center">
                  <div
                    className={`font-mono text-xs font-bold ${
                      t.slaRemainingMinutes <= 15 ? 'text-rose-400 font-black' : 'text-text'
                    }`}
                  >
                    {t.status === 'RESOLVED' ? 'CLOSED' : `${t.slaRemainingMinutes}m left`}
                  </div>
                  <div className="text-[10px] text-text-3 font-mono">{t.openedAt}</div>
                </td>
                <td className="py-4 px-4 text-center">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                      t.priority === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-surface-2 text-text-3 border border-line'
                    }`}
                  >
                    {t.priority}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                      t.status === 'RESOLVED'
                        ? 'bg-volt text-black'
                        : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => setSelectedTicket(t)}
                    className="text-xs font-mono text-volt hover:underline uppercase"
                  >
                    TRIAGE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Triage Detail Drawer */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-surface border border-line max-w-2xl w-full p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <div className="text-xs font-mono uppercase text-volt">
                  INCIDENT TRIAGE &bull; {selectedTicket.id}
                </div>
                <h2 className="text-xl font-bold font-display uppercase tracking-tight text-text">
                  {selectedTicket.subject}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="text-text-3 hover:text-text font-mono text-sm"
              >
                [ESC CLOSE]
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-surface-2 border border-line space-y-1">
                <div className="text-text font-bold">EVENT &amp; FAN IDENTITY</div>
                <div className="text-text-2">{selectedTicket.event}</div>
                <div className="font-mono text-text-3">
                  Fan: {selectedTicket.user} &bull; {selectedTicket.phone}
                </div>
              </div>

              <div className="text-xs font-mono uppercase text-text-3 pt-2">
                CANNED PROTOCOL ACTIONS (SECTION 23.3)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => alert('Escrow frozen immediately. Seller payout on hold.')}
                  className="p-3 text-left bg-surface border border-line hover:border-volt text-xs text-text transition-colors"
                >
                  <strong className="block text-volt">1. FREEZE ESCROW PAYOUT</strong>
                  Lock seller settlement immediately.
                </button>
                <button
                  type="button"
                  onClick={() => alert('Replacement ticket dispatched from Reserve Inventory.')}
                  className="p-3 text-left bg-surface border border-line hover:border-volt text-xs text-text transition-colors"
                >
                  <strong className="block text-white">2. ISSUE REPLACEMENT SEAT</strong>
                  Allocate matching tier ticket from Reserve.
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert('100% full refund executed to buyer original payment method.');
                    handleResolve(selectedTicket.id);
                  }}
                  className="p-3 text-left bg-surface border border-rose-500/50 hover:bg-rose-500/10 text-xs text-rose-300 transition-colors"
                >
                  <strong className="block text-rose-400">3. EXECUTE 100% AUTO-REFUND</strong>
                  Trigger instant gateway refund to buyer.
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleResolve(selectedTicket.id);
                  }}
                  className="p-3 text-left bg-surface border border-line hover:border-text text-xs text-text transition-colors"
                >
                  <strong className="block text-text">4. MARK RESOLVED</strong>
                  Close ticket with buyer consent.
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelectedTicket(null)}>
                CLOSE DESK
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
