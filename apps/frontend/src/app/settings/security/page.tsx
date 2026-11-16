// apps/frontend/src/app/settings/security/page.tsx
'use client';

import React, { useState } from 'react';
import { SettingsNav } from '../../../components/settings/settings-nav';
import { Button } from '../../../components/ui/button';
import { IconLock, IconShield, IconCheck } from '../../../components/icons';

export default function SecuritySettingsPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessions, setSessions] = useState([
    { id: 'sess_1', device: 'Chrome on Windows 11', ip: '152.57.12.84 (Mumbai, India)', current: true, time: 'Active now' },
    { id: 'sess_2', device: 'Safari on iPhone 15 Pro', ip: '103.21.244.0 (Bengaluru, India)', current: false, time: '2 hours ago' },
  ]);

  const handleRevoke = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-bg text-text pb-28 pt-8 px-4 md:px-12 max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-text-3">
          SECURITY &amp; ACCESS
        </span>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight font-display">
          SETTINGS
        </h1>
      </div>

      <SettingsNav />

      <div className="space-y-8">
        {/* 2FA */}
        <div className="p-8 border border-line bg-surface flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <span className="text-[10px] font-mono uppercase text-volt">MANDATORY FOR SELLERS</span>
            <h3 className="text-xl font-bold uppercase tracking-tight font-display">
              TWO-FACTOR AUTHENTICATION (TOTP / SMS)
            </h3>
            <p className="text-xs text-text-2">
              Protects ticket payouts and transfer coordinates with time-based one-time password verification on unknown devices.
            </p>
          </div>

          <Button
            variant={twoFactorEnabled ? 'secondary' : 'primary'}
            size="sm"
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
          >
            {twoFactorEnabled ? 'ENABLED (DISABLE)' : 'ENABLE 2FA'}
          </Button>
        </div>

        {/* Active Sessions */}
        <div className="p-8 border border-line bg-surface space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold uppercase tracking-tight font-display">
              ACTIVE SESSIONS ({sessions.length})
            </h3>
            {sessions.length > 1 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSessions(sessions.filter((s) => s.current))}
                className="text-risk border-risk/40"
              >
                LOG OUT OTHER DEVICES
              </Button>
            )}
          </div>

          <div className="divide-y divide-line border-t border-b border-line">
            {sessions.map((sess) => (
              <div key={sess.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold font-mono text-text">{sess.device}</p>
                    {sess.current && (
                      <span className="text-[10px] font-mono text-volt border border-volt/40 px-1.5 py-0.5 rounded-full">
                        CURRENT
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono text-text-3 mt-0.5">
                    {sess.ip} · {sess.time}
                  </p>
                </div>

                {!sess.current && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleRevoke(sess.id)}
                    className="text-xs"
                  >
                    REVOKE
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
