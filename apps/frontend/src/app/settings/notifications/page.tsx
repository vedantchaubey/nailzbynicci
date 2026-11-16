// apps/frontend/src/app/settings/notifications/page.tsx
'use client';

import React, { useState } from 'react';
import { SettingsNav } from '../../../components/settings/settings-nav';
import { Button } from '../../../components/ui/button';

export default function NotificationsSettingsPage() {
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(true);
  const [whatsapp, setWhatsapp] = useState(true);
  const [push, setPush] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggles = [
    { label: 'EMAIL ALERTS', desc: 'Order confirmations, invoices, and SLA reminders', val: email, set: setEmail },
    { label: 'SMS ALERTS', desc: 'Critical verification milestones and 60-min transfer countdowns', val: sms, set: setSms },
    { label: 'WHATSAPP NOTIFICATIONS', desc: 'In-app transfer prompt links directly on WhatsApp', val: whatsapp, set: setWhatsapp },
    { label: 'BROWSER PUSH NOTIFICATIONS', desc: 'Instant desktop alerts when buyer confirms ticket receipt', val: push, set: setPush },
    { label: 'PRICE DROP NOTIFICATIONS', desc: 'Alerts when saved events drop below your target price', val: priceAlerts, set: setPriceAlerts },
    { label: 'PROMOTIONAL & EVENT NEWS', desc: 'Curated stadium drop announcements and artist tour lineups', val: marketing, set: setMarketing },
  ];

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-text-3">
          CHANNELS &amp; QUIET HOURS
        </span>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight font-display">
          SETTINGS
        </h1>
      </div>

      <SettingsNav />

      <div className="space-y-8">
        {/* Quiet Hours Banner */}
        <div className="p-6 border border-line bg-surface space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span className="text-[10px] font-mono uppercase text-volt">
              MANDATORY QUIET HOURS ENFORCED (10:00 PM – 08:00 AM IST)
            </span>
          </div>
          <p className="text-xs text-text-2">
            Non-urgent price alerts and promotional pings are automatically silenced overnight. Real-time in-flight transfer SLA warnings and active payment notices are delivered 24/7.
          </p>
        </div>

        {/* Channels List */}
        <div className="p-8 border border-line bg-surface space-y-6">
          <h3 className="text-lg font-bold uppercase tracking-tight font-display">
            COMMUNICATION PREFERENCES
          </h3>

          <div className="divide-y divide-line border-t border-b border-line">
            {toggles.map((item, idx) => (
              <div key={idx} className="py-4 flex items-center justify-between gap-6">
                <div>
                  <p className="text-sm font-bold font-mono text-text">{item.label}</p>
                  <p className="text-xs text-text-3 mt-0.5">{item.desc}</p>
                </div>

                <button
                  type="button"
                  onClick={() => item.set(!item.val)}
                  className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                    item.val ? 'bg-volt' : 'bg-surface-2 border border-line'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                      item.val ? 'left-7' : 'left-1 bg-text-3'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          {saved && (
            <div className="p-3 bg-volt/10 border border-volt/40 text-xs font-mono text-volt">
              NOTIFICATION PREFERENCES UPDATED
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button variant="primary" size="sm" onClick={handleSave}>
              SAVE PREFERENCES
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
