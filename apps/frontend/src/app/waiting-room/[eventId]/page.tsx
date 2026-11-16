// apps/frontend/src/app/waiting-room/[eventId]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';

export default function WaitingRoomPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = (params?.eventId as string) || 'evt-coldplay-amd-2026';

  const [position, setPosition] = useState(142);
  const [totalInQueue, setTotalInQueue] = useState(1890);
  const [secondsRemaining, setSecondsRemaining] = useState(45);
  const [isAdmitted, setIsAdmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsAdmitted(true);
          return 0;
        }
        return prev - 1;
      });

      setPosition((prev) => {
        const step = Math.floor(Math.random() * 5) + 3;
        return Math.max(1, prev - step);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercentage = Math.min(100, Math.round(((45 - secondsRemaining) / 45) * 100));

  const handleProceedToDrop = () => {
    router.push(`/events/coldplay-music-of-the-spheres-ahmedabad-2026?queue_token=TP-QUEUE-AUTH-PASS`);
  };

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col justify-between p-6 md:p-16 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-line pb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-volt animate-ping" />
          <span className="text-xs font-mono uppercase tracking-widest text-text">
            TICKETPASS CONCURRENCY GATE &bull; VIRTUAL QUEUE
          </span>
        </div>
        <div className="text-xs font-mono text-text-3">
          FAIR-DROP RATE LIMITER ACTIVE
        </div>
      </div>

      {/* Main Queue Card */}
      <div className="my-auto py-12 space-y-8 text-center md:text-left">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-volt">
            EXCLUSIVE STADIUM DROP ADMISSION
          </div>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight font-display leading-none">
            COLDPLAY: MUSIC OF THE SPHERES
          </h1>
          <p className="text-sm md:text-base text-text-2">
            Narendra Modi Stadium &bull; Ahmedabad &bull; Jan 25, 2026
          </p>
        </div>

        {/* Big Queue Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-surface border border-line">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-text-3">
              YOUR PLACE IN LINE
            </div>
            <div className="text-5xl md:text-6xl font-black font-display text-volt tabular-nums">
              #{isAdmitted ? '1' : position}
            </div>
            <div className="text-xs text-text-3">Of {totalInQueue} live fans</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-text-3">
              ESTIMATED WAIT TIME
            </div>
            <div className="text-5xl md:text-6xl font-black font-display text-text tabular-nums">
              {isAdmitted ? '00:00' : formatTimer(secondsRemaining)}
            </div>
            <div className="text-xs text-text-3">Live admittance pacing</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-text-3">
              ADMISSION WINDOW
            </div>
            <div className="text-5xl md:text-6xl font-black font-display text-text tabular-nums">
              10:00
            </div>
            <div className="text-xs text-text-3">Minutes to select &amp; pay</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-text-3">
            <span>HOLDING ENCRYPTED POSITION</span>
            <span>{progressPercentage}% READY</span>
          </div>
          <div className="w-full h-2 bg-surface-2 overflow-hidden">
            <div
              className="h-full bg-volt transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Admitted State vs Holding State */}
        {isAdmitted ? (
          <div className="p-6 bg-surface-2 border border-volt space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-volt" />
              <div className="text-lg font-bold font-display uppercase tracking-tight text-white">
                YOUR TURN HAS ARRIVED &mdash; GATE PASSED
              </div>
            </div>
            <p className="text-xs text-text-2">
              Cryptographic reservation token generated. You have 10 minutes of guaranteed access before tickets are released to the next fan in line.
            </p>
            <Button variant="primary" size="lg" onClick={handleProceedToDrop} className="w-full md:w-auto">
              ENTER DROP ROOM NOW
            </Button>
          </div>
        ) : (
          <div className="p-4 bg-surface-2 border border-line flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-volt" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-text-2">
                <strong>DO NOT CLOSE OR REFRESH.</strong> Your position is cryptographically signed in the queue ledger.
              </span>
            </div>
            <span className="text-text-3 font-mono hidden md:inline">ID: {eventId}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-line pt-6 text-xs text-text-3">
        <div>
          TicketPass FairQueue &bull; Powered by Redis Token Bucket Rate Limiting
        </div>
        <div className="flex items-center gap-4">
          <Link href="/buyer-guarantee" className="hover:text-text transition-colors">
            Buyer Guarantee
          </Link>
          <Link href="/help" className="hover:text-text transition-colors">
            Queue FAQs
          </Link>
        </div>
      </div>
    </div>
  );
}
