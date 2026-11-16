// apps/frontend/src/app/contact/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-line pb-12 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-volt" />
          <span className="text-xs uppercase tracking-widest text-text-3 font-mono">
            GET IN TOUCH
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight font-display leading-none">
          CONTACT US
        </h1>
        <p className="text-base text-text-2 max-w-xl">
          Questions about escrow custody, event partnerships, or verified transfers? We respond within 4 hours.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="p-8 border border-line bg-surface space-y-6">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <span className="text-xs font-mono text-volt uppercase">MESSAGE DELIVERED</span>
              <h3 className="text-xl font-bold font-display uppercase">WE WILL BE IN TOUCH</h3>
              <p className="text-xs text-text-3 font-mono">Our operations desk has received your note.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-text-3">NAME</label>
                <Input
                  required
                  placeholder="Rahul Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-text-3">EMAIL</label>
                <Input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-text-3">MESSAGE</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-surface-2 border border-line rounded-[12px] p-3 text-sm text-text placeholder:text-text-3 focus:outline-none focus:border-volt transition-colors"
                  placeholder="How can we assist with your live event ticket or escrow question?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button type="submit" variant="primary" size="sm" className="w-full">
                SEND MESSAGE
              </Button>
            </form>
          )}
        </div>

        {/* Contact Meta */}
        <div className="space-y-8 font-mono text-xs">
          <div>
            <span className="text-text-3 uppercase">CUSTOMER SUPPORT DESK</span>
            <p className="text-text font-bold mt-1">support@ticketpass.dev</p>
            <p className="text-text-3 mt-0.5">Operating 8 AM – 11 PM IST</p>
          </div>
          <div>
            <span className="text-text-3 uppercase">ORGANIZER &amp; PARTNERSHIPS</span>
            <p className="text-text font-bold mt-1">partners@ticketpass.dev</p>
          </div>
          <div>
            <span className="text-text-3 uppercase">REGISTERED OFFICE</span>
            <p className="text-text font-bold mt-1">TicketPass Technologies India Pvt. Ltd.</p>
            <p className="text-text-3 mt-0.5">Bandra-Kurla Complex (BKC), Mumbai, Maharashtra 400051</p>
          </div>
        </div>
      </div>
    </div>
  );
}
