// apps/frontend/src/app/support/tickets/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { apiClient } from '../../../../lib/api-client';
import { Button } from '../../../../components/ui/button';
import { TableSkeleton } from '../../../../components/ui/skeleton';
import { IconCheck, IconClock, IconArrowUpRight } from '../../../../components/icons';

export default function TicketConversationPage() {
  const params = useParams();
  const ticketId = params?.id as string;

  const [ticket, setTicket] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/support/tickets/${ticketId}`);
      setTicket(res.data);
    } catch (err) {
      console.error('Failed to load ticket', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ticketId) fetchTicket();
  }, [ticketId]);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setSending(true);
    try {
      await apiClient.post(`/support/tickets/${ticketId}/messages`, {
        content: replyText.trim(),
      });
      setReplyText('');
      fetchTicket();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-4xl mx-auto">
        <TableSkeleton rows={4} />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-4xl mx-auto text-center py-24 space-y-4">
        <h2 className="text-2xl font-bold font-display uppercase">TICKET NOT FOUND</h2>
        <Link href="/support">
          <Button variant="primary" size="sm">
            BACK TO TICKETS
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-4xl mx-auto">
      {/* Back button */}
      <div className="pb-6">
        <Link href="/support" className="text-xs font-mono text-text-3 hover:text-text transition-colors">
          ← BACK TO SUPPORT INBOX
        </Link>
      </div>

      {/* Ticket Header */}
      <div className="border-b border-line pb-6 space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className={`text-xs font-mono uppercase ${
              ticket.priority === 'URGENT' ? 'text-risk' : 'text-volt'
            }`}
          >
            {ticket.priority} PRIORITY
          </span>
          <span className="text-[10px] font-mono text-text-3 border border-line px-1.5 py-0.5">
            {ticket.category}
          </span>
          <span className="text-[10px] font-mono text-text-3">
            #{ticket.ticketNumber}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight font-display">
          {ticket.subject}
        </h1>
        <p className="text-xs font-mono text-text-3">
          STATUS: <strong className="text-text">{ticket.status}</strong> · OPENED{' '}
          {new Date(ticket.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
        </p>
      </div>

      {/* Message Thread */}
      <div className="mt-8 space-y-6">
        {ticket.messages?.map((msg: any) => {
          const isAdmin = msg.senderType === 'ADMIN';
          const isSystem = msg.senderType === 'SYSTEM';

          return (
            <div
              key={msg.id}
              className={`p-5 border ${
                isAdmin
                  ? 'border-volt/40 bg-surface-2'
                  : isSystem
                  ? 'border-line-strong bg-surface text-text-3'
                  : 'border-line bg-surface'
              } space-y-2`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className={isAdmin ? 'text-volt font-bold uppercase' : 'text-text-3 uppercase'}>
                  {isAdmin ? 'TICKETPASS OPERATIONS DESK' : isSystem ? 'SYSTEM PROTOCOL' : 'YOU'}
                </span>
                <span className="text-text-3">
                  {new Date(msg.createdAt).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}
                </span>
              </div>
              <p className="text-sm text-text leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </p>
            </div>
          );
        })}
      </div>

      {/* Reply Composer */}
      {ticket.status !== 'CLOSED' && (
        <form onSubmit={handleSendReply} className="mt-8 space-y-4 pt-6 border-t border-line">
          <div>
            <label className="block text-[10px] font-mono uppercase text-text-3 mb-1">
              POST A REPLY
            </label>
            <textarea
              required
              rows={3}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full bg-surface-2 border border-line rounded-[12px] p-3 text-sm text-text placeholder:text-text-3 focus:outline-none focus:border-volt"
              placeholder="Type your response to the operations desk..."
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="sm" disabled={sending}>
              {sending ? 'SENDING...' : 'SEND REPLY'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
