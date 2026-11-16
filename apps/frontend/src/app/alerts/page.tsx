// apps/frontend/src/app/alerts/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

interface PriceAlertItem {
  id: string;
  eventName: string;
  venue: string;
  targetPricePaise: number;
  currentLowestPaise: number;
  channel: string;
  frequency: string;
  active: boolean;
}

export default function PriceAlertsPage() {
  const [alerts, setAlerts] = useState<PriceAlertItem[]>([
    {
      id: 'alt-1',
      eventName: 'Coldplay: Music of the Spheres (Ahmedabad)',
      venue: 'Narendra Modi Stadium',
      targetPricePaise: 500000,
      currentLowestPaise: 650000,
      channel: 'WHATSAPP + SMS',
      frequency: 'INSTANT',
      active: true,
    },
    {
      id: 'alt-2',
      eventName: 'Diljit Dosanjh: Dil-Luminati Tour (Delhi NCR)',
      venue: 'JLN Stadium',
      targetPricePaise: 350000,
      currentLowestPaise: 420000,
      channel: 'PUSH + EMAIL',
      frequency: 'INSTANT',
      active: true,
    },
  ]);

  const [newEvent, setNewEvent] = useState('Coldplay: Music of the Spheres (Ahmedabad)');
  const [newTargetPrice, setNewTargetPrice] = useState('4500');
  const [newChannel, setNewChannel] = useState('WHATSAPP');

  const toggleAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  const deleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPaise = (parseFloat(newTargetPrice) || 0) * 100;
    if (targetPaise <= 0) return;

    setAlerts((prev) => [
      ...prev,
      {
        id: `alt-${Date.now()}`,
        eventName: newEvent,
        venue: 'Stadium Drop Zone',
        targetPricePaise: targetPaise,
        currentLowestPaise: targetPaise + 150000,
        channel: newChannel,
        frequency: 'INSTANT',
        active: true,
      },
    ]);
    setNewTargetPrice('');
  };

  const formatPaise = (paise: number) => {
    const rupees = Math.floor(paise / 100);
    return '₹' + rupees.toLocaleString('en-IN');
  };

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span className="text-xs uppercase tracking-widest text-text-3 font-mono">
              MARKET RADAR &bull; PRICE DROP TRIGGERS
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight font-display leading-none">
            PRICE ALERTS
          </h1>
          <p className="text-sm text-text-2 max-w-lg">
            Set custom price limits for high-demand drops. When a seller lists matching seats below your threshold, you receive a direct priority dispatch.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/wishlist">
            <Button variant="secondary" size="sm">
              VIEW WISHLIST
            </Button>
          </Link>
          <Link href="/events">
            <Button variant="primary" size="sm">
              EXPLORE DROPS
            </Button>
          </Link>
        </div>
      </div>

      {/* Create New Trigger Card */}
      <div className="my-8 p-6 bg-surface border border-line space-y-4">
        <h2 className="text-base font-bold uppercase tracking-tight font-display">
          CREATE NEW PRICE TARGET TRIGGER
        </h2>
        <form onSubmit={handleCreateAlert} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[11px] font-mono uppercase text-text-3">DROP EVENT</label>
            <select
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              className="w-full bg-surface-2 border border-line text-text px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-volt"
            >
              <option value="Coldplay: Music of the Spheres (Ahmedabad)">
                Coldplay: Music of the Spheres (Ahmedabad)
              </option>
              <option value="Diljit Dosanjh: Dil-Luminati Tour (Delhi NCR)">
                Diljit Dosanjh: Dil-Luminati Tour (Delhi NCR)
              </option>
              <option value="IPL 2026: SRH vs PBKS (Hyderabad)">
                IPL 2026: SRH vs PBKS (Hyderabad)
              </option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase text-text-3">TARGET PRICE (₹)</label>
            <input
              type="number"
              placeholder="e.g. 5000"
              value={newTargetPrice}
              onChange={(e) => setNewTargetPrice(e.target.value)}
              className="w-full bg-surface-2 border border-line text-text px-3 py-2.5 rounded-xl text-sm font-mono focus:outline-none focus:border-volt"
            />
          </div>

          <div>
            <Button variant="primary" size="sm" type="submit" className="w-full py-2.5">
              ACTIVATE RADAR
            </Button>
          </div>
        </form>
      </div>

      {/* Active Alerts List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold uppercase tracking-tight font-display">
          ACTIVE MONITORING TRIGGERS ({alerts.length})
        </h2>

        {alerts.length === 0 ? (
          <div className="py-12 text-center text-text-3 font-mono text-sm border border-line bg-surface">
            NO ACTIVE PRICE TARGET TRIGGERS CONFIGURED
          </div>
        ) : (
          <div className="border border-line overflow-x-auto bg-surface">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-surface-2 text-xs font-mono uppercase tracking-wider text-text-3">
                <tr>
                  <th className="py-3 px-4">EVENT</th>
                  <th className="py-3 px-4 text-right">YOUR TARGET</th>
                  <th className="py-3 px-4 text-right">CURRENT LOWEST</th>
                  <th className="py-3 px-4">DISPATCH ROUTE</th>
                  <th className="py-3 px-4 text-center">MONITORING</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {alerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-surface-2 transition-colors">
                    <td className="py-4 px-4 font-bold text-text">
                      {alert.eventName}
                      <div className="text-xs text-text-3 font-normal">{alert.venue}</div>
                    </td>
                    <td className="py-4 px-4 text-right font-mono tabular-nums font-bold text-volt">
                      {formatPaise(alert.targetPricePaise)}
                    </td>
                    <td className="py-4 px-4 text-right font-mono tabular-nums text-text-3">
                      {formatPaise(alert.currentLowestPaise)}
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-text-2">
                      {alert.channel}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => toggleAlert(alert.id)}
                        className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase transition-colors ${
                          alert.active
                            ? 'bg-volt text-black'
                            : 'bg-surface-2 text-text-3 border border-line'
                        }`}
                      >
                        {alert.active ? 'SCANNING 24/7' : 'PAUSED'}
                      </button>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => deleteAlert(alert.id)}
                        className="text-xs font-mono text-text-3 hover:text-rose-400 transition-colors uppercase"
                      >
                        DISMISS
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
