// apps/frontend/src/app/support/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiClient } from '../../lib/api-client';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { TableSkeleton } from '../../components/ui/skeleton';
import { IconClock, IconCheck, IconArrowUpRight, IconPlus, IconClose } from '../../components/icons';

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEntryProblemOpen, setIsEntryProblemOpen] = useState(false);

  // New ticket state
  const [category, setCategory] = useState('GENERAL');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [orderId, setOrderId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/support/tickets/me');
      setTickets(res.data || []);
    } catch (err) {
      console.error('Failed to load tickets', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiClient.post('/support/tickets', {
        category,
        subject,
        content,
        orderId: orderId || undefined,
      });
      setIsModalOpen(false);
      setSubject('');
      setContent('');
      setOrderId('');
      fetchTickets();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to create support ticket');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEntryProblem = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiClient.post('/support/tickets/entry-problem', {
        orderId,
        details: content,
      });
      setIsEntryProblemOpen(false);
      setContent('');
      setOrderId('');
      fetchTickets();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to report entry problem');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span className="text-xs uppercase tracking-widest text-text-3 font-mono">
              OPERATIONS DESK
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight font-display leading-none">
            SUPPORT &amp; TICKETS
          </h1>
          <p className="text-sm text-text-2 max-w-lg">
            Direct assistance with native in-app transfers, escrow disputes, and turnstile entry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsEntryProblemOpen(true)}
            className="text-risk border-risk/40 hover:bg-risk/10"
          >
            ENTRY PROBLEM? (15M SLA)
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5"
          >
            <IconPlus size={14} />
            <span>OPEN TICKET</span>
          </Button>
        </div>
      </div>

      {/* Tickets List */}
      <div className="mt-8">
        {loading ? (
          <TableSkeleton rows={4} />
        ) : tickets.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-line bg-surface space-y-4">
            <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center mx-auto text-volt">
              <IconCheck size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold uppercase tracking-tight font-display">
                NO ACTIVE SUPPORT TICKETS
              </h3>
              <p className="text-xs text-text-3 font-mono">
                EVERY TRANSACTION AND TRANSFER IS OPERATING NORMALLY
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-line border-t border-b border-line">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="py-5 px-3 md:px-6 hover:bg-surface transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      className={`text-xs font-mono uppercase ${
                        t.priority === 'URGENT' ? 'text-risk' : 'text-volt'
                      }`}
                    >
                      {t.priority} PRIORITY
                    </span>
                    <span className="text-[10px] font-mono text-text-3 border border-line px-1.5 py-0.5">
                      {t.category}
                    </span>
                    <span className="text-[10px] font-mono text-text-3">
                      #{t.ticketNumber}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight font-display truncate">
                    {t.subject}
                  </h3>

                  <p className="text-xs text-text-2 font-mono">
                    STATUS: <strong className="text-text">{t.status}</strong> · {t.messages?.length || 1} MESSAGE{(t.messages?.length || 1) > 1 ? 'S' : ''}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  <Link href={`/support/tickets/${t.id}`}>
                    <Button variant="secondary" size="sm" className="flex items-center gap-1.5 text-xs">
                      <span>VIEW CONVERSATION</span>
                      <IconArrowUpRight size={14} />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Ticket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-surface border border-line p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight font-display">
                  OPEN SUPPORT TICKET
                </h3>
                <p className="text-xs text-text-3 font-mono mt-0.5">
                  DESCRIBE YOUR QUESTION OR ESCROW INQUIRY
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-text-3 hover:text-text"
              >
                <IconClose size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase text-text-3 mb-1">
                  CATEGORY
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-surface-2 border border-line rounded-[12px] p-3 text-xs text-text focus:outline-none focus:border-volt"
                >
                  <option value="TRANSFERS_BMS">BookMyShow Transfer Issue</option>
                  <option value="TRANSFERS_DISTRICT">District Transfer Issue</option>
                  <option value="PAYMENT_REFUND">Payment or Refund Question</option>
                  <option value="VERIFICATION">Identity Verification (KYC)</option>
                  <option value="GENERAL">General Inquiries</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-text-3 mb-1">
                  SUBJECT
                </label>
                <Input
                  required
                  placeholder="e.g. Seller hasn't initiated BookMyShow transfer"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-text-3 mb-1">
                  ORDER ID (OPTIONAL)
                </label>
                <Input
                  placeholder="ord_..."
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-text-3 mb-1">
                  DETAILS
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-surface-2 border border-line rounded-[12px] p-3 text-xs text-text placeholder:text-text-3 focus:outline-none focus:border-volt"
                  placeholder="Please provide full details..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-line">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
                  CANCEL
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={submitting}
                >
                  {submitting ? 'CREATING...' : 'SUBMIT TICKET'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Day-of-Event Entry Problem Modal */}
      {isEntryProblemOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-surface border border-risk/60 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-risk animate-ping" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-risk">
                    HIGH PRIORITY (15-MIN SLA)
                  </span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight font-display mt-1">
                  TURNSTILE ENTRY DENIAL REPORT
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEntryProblemOpen(false)}
                className="text-text-3 hover:text-text"
              >
                <IconClose size={20} />
              </button>
            </div>

            <form onSubmit={handleEntryProblem} className="space-y-4">
              <div className="p-3 bg-risk/10 border border-risk/40 text-xs text-risk font-mono">
                NOTICE: Filing a false entry report forfeits platform access. This desk pages turnstile liaisons directly at the stadium gate.
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-text-3 mb-1">
                  ORDER ID
                </label>
                <Input
                  required
                  placeholder="Enter order ID (e.g. ord_...)"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-text-3 mb-1">
                  EXACT TURNSTILE / GATE DETAILS
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-surface-2 border border-line rounded-[12px] p-3 text-xs text-text placeholder:text-text-3 focus:outline-none focus:border-volt"
                  placeholder="e.g. Gate 4 scanner shows barcode already scanned or invalid..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-line">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsEntryProblemOpen(false)}
                  className="flex-1"
                >
                  CANCEL
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1 bg-risk text-white hover:bg-risk/90"
                  disabled={submitting}
                >
                  {submitting ? 'PAGING ON-CALL...' : 'DISPATCH URGENT REPORT'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
