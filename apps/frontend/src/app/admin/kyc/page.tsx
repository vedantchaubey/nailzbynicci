// apps/frontend/src/app/admin/kyc/page.tsx
'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api-client';
import { Button } from '../../../components/ui/button';
import { Chip } from '../../../components/ui/chip';
import { TableSkeleton } from '../../../components/ui/shape-skeletons';
import { ShieldIcon, VerifiedSealGlyph, CheckIcon, CloseIcon } from '../../../components/icons/index';

interface AdminKycRecord {
  id: string;
  userId: string;
  status: string;
  provider: string;
  verifiedName: string;
  aadhaarLast4: string | null;
  state: string | null;
  verifiedAt: string | null;
  expiresAt: string | null;
  rejectionReason: string | null;
  attemptCount: number;
  user: {
    name: string;
    email: string;
    phone: string | null;
    role: string;
  };
}

interface BlockedIdentityRecord {
  id: string;
  identityFingerprint: string;
  reason: string;
  bannedUserId: string | null;
  createdAt: string;
}

export default function AdminKycOversightPage() {
  const [filterStatus, setFilterStatus] = React.useState<string>('');
  const [activeTab, setActiveTab] = React.useState<'RECORDS' | 'BLOCKED'>('RECORDS');

  const { data: kycRecords, isLoading, refetch } = useQuery<AdminKycRecord[]>({
    queryKey: ['admin-kyc', filterStatus],
    queryFn: async () => {
      const url = filterStatus ? `/admin/kyc?status=${filterStatus}` : '/admin/kyc';
      const res = await apiClient.get<AdminKycRecord[]>(url);
      return res.data;
    },
  });

  const { data: blockedIdentities } = useQuery<BlockedIdentityRecord[]>({
    queryKey: ['admin-blocked-identities'],
    queryFn: async () => {
      const res = await apiClient.get<BlockedIdentityRecord[]>('/admin/blocked-identities');
      return res.data;
    },
  });

  const handleForceReverify = async (userId: string) => {
    if (!confirm('Force-expire this user KYC and mandate re-verification?')) return;
    try {
      await apiClient.post(`/admin/kyc/${userId}/force-reverify`);
      refetch();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to update user KYC.');
    }
  };

  const handleManualApprove = async (userId: string) => {
    const reason = prompt('Enter a mandatory compliance reason for manual Super-Admin approval:');
    if (!reason) return;
    try {
      await apiClient.post(`/admin/kyc/${userId}/manual-approve`, { reason });
      refetch();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to manually approve KYC.');
    }
  };

  return (
    <div className="flex flex-col gap-8 select-none">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldIcon size={18} className="text-volt" />
            <span className="text-[12px] font-mono uppercase tracking-widest text-volt">
              ADMIN OVERSIGHT
            </span>
          </div>
          <h1 className="type-section-title text-white mt-1">
            DIGILOCKER KYC &amp; IDENTITY AUDIT
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={activeTab === 'RECORDS' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('RECORDS')}
          >
            VERIFICATION RECORDS
          </Button>
          <Button
            size="sm"
            variant={activeTab === 'BLOCKED' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('BLOCKED')}
          >
            BLOCKED IDENTITIES ({blockedIdentities?.length || 0})
          </Button>
        </div>
      </div>

      {activeTab === 'RECORDS' ? (
        <div className="flex flex-col gap-6">
          {/* Status Filter Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {['', 'VERIFIED', 'IN_PROGRESS', 'REJECTED', 'EXPIRED', 'WITHDRAWN'].map((st) => (
              <Chip
                key={st || 'ALL'}
                variant="filter"
                active={filterStatus === st}
                onSelect={() => setFilterStatus(st)}
              >
                {st || 'ALL STATUSES'}
              </Chip>
            ))}
          </div>

          {isLoading ? (
            <TableSkeleton rows={6} />
          ) : (
            <div className="w-full border border-line rounded-[12px] bg-surface overflow-x-auto">
              <table className="w-full text-left text-[14px]">
                <thead className="bg-surface-2 border-b border-line text-[11px] font-bold uppercase tracking-wider text-text-3">
                  <tr>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Provider</th>
                    <th className="py-3 px-4">Masked Aadhaar</th>
                    <th className="py-3 px-4">State</th>
                    <th className="py-3 px-4">Attempts</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {kycRecords && kycRecords.length > 0 ? (
                    kycRecords.map((r) => (
                      <tr key={r.id} className="hover:bg-surface-2/50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-white">{r.verifiedName || r.user.name}</span>
                            <span className="text-[12px] text-text-3">{r.user.email}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <Chip
                            variant={
                              r.status === 'VERIFIED'
                                ? 'status'
                                : r.status === 'REJECTED'
                                ? 'filter'
                                : 'tag'
                            }
                            className={`text-[11px] ${
                              r.status === 'VERIFIED'
                                ? 'bg-volt/10 text-volt border-volt/30'
                                : r.status === 'REJECTED'
                                ? 'bg-risk/10 text-risk border-risk/30'
                                : ''
                            }`}
                          >
                            {r.status}
                          </Chip>
                          {r.rejectionReason && (
                            <span className="block text-[11px] text-risk mt-0.5">
                              {r.rejectionReason}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 font-mono text-[12px] text-text-2">
                          {r.provider}
                        </td>

                        <td className="py-3.5 px-4 font-mono text-[12px] tabular-nums text-text-2">
                          {r.aadhaarLast4 ? `XXXX-XXXX-${r.aadhaarLast4}` : '—'}
                        </td>

                        <td className="py-3.5 px-4 text-text-2">
                          {r.state || '—'}
                        </td>

                        <td className="py-3.5 px-4 font-mono text-[12px] tabular-nums text-text-3">
                          {r.attemptCount} / 5
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            {r.status === 'VERIFIED' ? (
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => handleForceReverify(r.userId)}
                              >
                                FORCE RE-VERIFY
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="volt"
                                onClick={() => handleManualApprove(r.userId)}
                              >
                                APPROVE
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-text-3">
                        No KYC records found matching criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* Blocked Identities Table */
        <div className="w-full border border-line rounded-[12px] bg-surface overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-surface-2 border-b border-line text-[11px] font-bold uppercase tracking-wider text-text-3">
              <tr>
                <th className="py-3 px-4">Salted Identity Fingerprint (SHA-256)</th>
                <th className="py-3 px-4">Reason for Block</th>
                <th className="py-3 px-4">Banned At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {blockedIdentities && blockedIdentities.length > 0 ? (
                blockedIdentities.map((b) => (
                  <tr key={b.id} className="hover:bg-surface-2/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[12px] text-risk break-all">
                      {b.identityFingerprint}
                    </td>
                    <td className="py-3.5 px-4 text-white font-medium">
                      {b.reason}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[12px] text-text-3 tabular-nums">
                      {new Date(b.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-text-3">
                    No blocked identities recorded.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
