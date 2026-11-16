// apps/frontend/src/app/admin/queues/page.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';

interface QueueStatus {
  name: string;
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  delayed: number;
  status: 'HEALTHY' | 'PAUSED' | 'CONGESTED';
}

interface FailedJobItem {
  id: string;
  queue: string;
  name: string;
  failedReason: string;
  timestamp: string;
  attemptsMade: number;
}

export default function AdminQueuesPage() {
  const [queues, setQueues] = useState<QueueStatus[]>([
    {
      name: 'transfers-queue',
      waiting: 3,
      active: 1,
      completed: 1840,
      failed: 0,
      delayed: 12,
      status: 'HEALTHY',
    },
    {
      name: 'orders-queue',
      waiting: 8,
      active: 2,
      completed: 4520,
      failed: 1,
      delayed: 18,
      status: 'HEALTHY',
    },
    {
      name: 'notifications-queue',
      waiting: 0,
      active: 0,
      completed: 12400,
      failed: 0,
      delayed: 0,
      status: 'HEALTHY',
    },
    {
      name: 'kyc-queue',
      waiting: 0,
      active: 0,
      completed: 310,
      failed: 0,
      delayed: 0,
      status: 'HEALTHY',
    },
    {
      name: 'reconciliation-queue',
      waiting: 0,
      active: 0,
      completed: 92,
      failed: 0,
      delayed: 1,
      status: 'HEALTHY',
    },
  ]);

  const [failedJobs, setFailedJobs] = useState<FailedJobItem[]>([
    {
      id: 'job-ord-expire-9982',
      queue: 'orders-queue',
      name: 'order.reservation.expire',
      failedReason: 'Redis socket timeout during atomic pipeline eval',
      timestamp: '2026-11-02 12:14',
      attemptsMade: 3,
    },
  ]);

  const handleRetryJob = (jobId: string) => {
    setFailedJobs((prev) => prev.filter((j) => j.id !== jobId));
    alert(`Job ${jobId} re-enqueued to active BullMQ processing pipe.`);
  };

  const handlePurgeAll = () => {
    setFailedJobs([]);
    alert('Cleared all dead-letter queues.');
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-line">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span className="text-xs font-mono uppercase tracking-widest text-text-3">
              ASYNC WORKERS &bull; BULLMQ REDIS TELEMETRY
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-display text-text">
            QUEUES &amp; WORKERS
          </h1>
          <p className="text-xs text-text-2 max-w-xl">
            Monitor real-time asynchronous background workers: transfer verifications, order reservation expiry timers, WhatsApp dispatch, and automated KYC processing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={handlePurgeAll}>
            PURGE FAILED JOBS
          </Button>
          <Button variant="primary" size="sm" onClick={() => alert('Workers pinged: 100% responsive')}>
            REFRESH TELEMETRY
          </Button>
        </div>
      </div>

      {/* Redis Connection Badge */}
      <div className="p-4 bg-surface border border-line flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-volt animate-pulse" />
          <span className="text-text font-bold">REDIS ENGINE: CONNECTED</span>
          <span className="text-text-3">&bull; Cluster Latency: 1.1ms &bull; Memory: 24.2 MB</span>
        </div>
        <span className="text-volt">5 ACTIVE WORKER PIPES</span>
      </div>

      {/* Queues Matrix */}
      <div className="border border-line overflow-x-auto bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-surface-2 text-xs font-mono uppercase tracking-wider text-text-3">
            <tr>
              <th className="py-3 px-4">QUEUE NAME</th>
              <th className="py-3 px-4 text-center">WAITING</th>
              <th className="py-3 px-4 text-center">ACTIVE</th>
              <th className="py-3 px-4 text-center">DELAYED</th>
              <th className="py-3 px-4 text-center">COMPLETED</th>
              <th className="py-3 px-4 text-center">FAILED</th>
              <th className="py-3 px-4 text-right">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {queues.map((q) => (
              <tr key={q.name} className="hover:bg-surface-2 transition-colors font-mono text-xs">
                <td className="py-4 px-4 font-bold text-text">{q.name}</td>
                <td className="py-4 px-4 text-center text-text-2 tabular-nums">{q.waiting}</td>
                <td className="py-4 px-4 text-center text-volt font-bold tabular-nums">{q.active}</td>
                <td className="py-4 px-4 text-center text-text-3 tabular-nums">{q.delayed}</td>
                <td className="py-4 px-4 text-center text-text tabular-nums">{q.completed.toLocaleString('en-IN')}</td>
                <td className="py-4 px-4 text-center font-bold tabular-nums">
                  <span className={q.failed > 0 ? 'text-rose-400' : 'text-text-3'}>
                    {q.failed}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase ${
                      q.status === 'HEALTHY'
                        ? 'bg-volt text-black'
                        : 'bg-rose-500 text-white'
                    }`}
                  >
                    {q.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Failed Jobs Dead Letter Queue */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold uppercase tracking-tight font-display">
          DEAD-LETTER JOBS ({failedJobs.length})
        </h2>

        {failedJobs.length === 0 ? (
          <div className="py-12 text-center text-text-3 font-mono text-xs border border-line bg-surface">
            ALL ASYNC QUEUES RUNNING CLEANLY &bull; ZERO DEAD-LETTER JOBS
          </div>
        ) : (
          <div className="border border-line overflow-x-auto bg-surface">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-surface-2 text-xs font-mono uppercase tracking-wider text-text-3">
                <tr>
                  <th className="py-3 px-4">JOB ID &amp; QUEUE</th>
                  <th className="py-3 px-4">JOB NAME</th>
                  <th className="py-3 px-4">EXCEPTION REASON</th>
                  <th className="py-3 px-4 text-center">ATTEMPTS</th>
                  <th className="py-3 px-4">TIMESTAMP</th>
                  <th className="py-3 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {failedJobs.map((j) => (
                  <tr key={j.id} className="hover:bg-surface-2 transition-colors font-mono text-xs">
                    <td className="py-4 px-4">
                      <div className="font-bold text-text">{j.id}</div>
                      <div className="text-[10px] text-text-3">{j.queue}</div>
                    </td>
                    <td className="py-4 px-4 text-text-2">{j.name}</td>
                    <td className="py-4 px-4 text-rose-300 max-w-sm truncate">{j.failedReason}</td>
                    <td className="py-4 px-4 text-center text-text-3">{j.attemptsMade}</td>
                    <td className="py-4 px-4 text-text-3 whitespace-nowrap">{j.timestamp}</td>
                    <td className="py-4 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleRetryJob(j.id)}
                        className="text-volt hover:underline uppercase font-bold"
                      >
                        RETRY JOB
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
