// apps/frontend/src/app/admin/cms/page.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';

interface PolicyDoc {
  slug: string;
  title: string;
  version: string;
  effectiveDate: string;
  mandatoryConsent: boolean;
  status: 'ACTIVE' | 'DRAFT';
}

interface HelpArticleItem {
  id: string;
  title: string;
  category: string;
  slug: string;
  views: number;
}

export default function AdminCmsPage() {
  const [bannerActive, setBannerActive] = useState(true);
  const [bannerText, setBannerText] = useState(
    '100% NON-CUSTODIAL ESCROW PROTECTION &bull; GUARANTEED ENTRY OR 100% MONEY-BACK REFUND'
  );

  const [policies, setPolicies] = useState<PolicyDoc[]>([
    {
      slug: 'buyer-guarantee',
      title: '100% Non-Custodial Buyer Guarantee',
      version: 'v2.1',
      effectiveDate: '2026-11-01',
      mandatoryConsent: true,
      status: 'ACTIVE',
    },
    {
      slug: 'terms',
      title: 'Platform Terms & Fair Resale Rules',
      version: 'v2.4',
      effectiveDate: '2026-10-22',
      mandatoryConsent: true,
      status: 'ACTIVE',
    },
    {
      slug: 'privacy',
      title: 'Privacy Policy & DPDP Act 2023 Compliance',
      version: 'v1.9',
      effectiveDate: '2026-10-22',
      mandatoryConsent: true,
      status: 'ACTIVE',
    },
    {
      slug: 'grievance',
      title: 'Grievance Redressal Mechanism & Officer Details',
      version: 'v1.2',
      effectiveDate: '2026-10-15',
      mandatoryConsent: false,
      status: 'ACTIVE',
    },
  ]);

  const [articles] = useState<HelpArticleItem[]>([
    {
      id: 'art-1',
      title: 'How does the BookMyShow official ticket transfer work?',
      category: 'BUYER ESCROW',
      slug: 'how-transfers-work',
      views: 14200,
    },
    {
      id: 'art-2',
      title: 'When is my seller payout disbursed to my bank account?',
      category: 'SELLER PAYOUTS',
      slug: 'payout-timelines',
      views: 9810,
    },
    {
      id: 'art-3',
      title: 'What happens if a ticket barcode does not scan at the turnstile?',
      category: 'GATE ISSUES',
      slug: 'gate-entry-issues',
      views: 6540,
    },
  ]);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-line">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span className="text-xs font-mono uppercase tracking-widest text-text-3">
              LEGAL VAULT &bull; POLICY VERSIONING &bull; HELP CMS
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-display text-text">
            CMS &amp; POLICIES
          </h1>
          <p className="text-xs text-text-2 max-w-xl">
            Manage mandatory statutory policy documents, version audit trails, help articles, and global stadium drop announcement banners.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            NEW HELP ARTICLE
          </Button>
          <Button variant="primary" size="sm">
            PUBLISH POLICY VERSION
          </Button>
        </div>
      </div>

      {/* Global Banner Config */}
      <div className="p-6 bg-surface border border-line space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase text-volt">
              GLOBAL ANNOUNCEMENT TICKER (TOP HEADER)
            </div>
            <h2 className="text-lg font-bold font-display uppercase tracking-tight text-text">
              SITE-WIDE ANNOUNCEMENT BANNER
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setBannerActive(!bannerActive)}
            className={`text-xs font-mono px-3 py-1 rounded-full uppercase font-bold transition-colors ${
              bannerActive
                ? 'bg-volt text-black'
                : 'bg-surface-2 text-text-3 border border-line'
            }`}
          >
            {bannerActive ? 'BROADCASTING LIVE' : 'DISABLED'}
          </button>
        </div>

        <input
          type="text"
          value={bannerText}
          onChange={(e) => setBannerText(e.target.value)}
          className="w-full bg-surface-2 border border-line text-text px-4 py-3 rounded-xl font-mono text-xs focus:outline-none focus:border-volt"
        />
      </div>

      {/* Policy Documents Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold uppercase tracking-tight font-display">
          STATUTORY LEGAL DOCUMENTS &amp; POLICIES
        </h2>

        <div className="border border-line overflow-x-auto bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-surface-2 text-xs font-mono uppercase tracking-wider text-text-3">
              <tr>
                <th className="py-3 px-4">DOCUMENT TITLE</th>
                <th className="py-3 px-4">SLUG ROUTE</th>
                <th className="py-3 px-4 text-center">CURRENT VERSION</th>
                <th className="py-3 px-4">EFFECTIVE DATE</th>
                <th className="py-3 px-4 text-center">CHECKOUT CONSENT</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {policies.map((p) => (
                <tr key={p.slug} className="hover:bg-surface-2 transition-colors">
                  <td className="py-4 px-4 font-bold text-text">
                    {p.title}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-volt">
                    /{p.slug}
                  </td>
                  <td className="py-4 px-4 text-center font-mono text-xs text-text-2">
                    {p.version}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-text-3">
                    {p.effectiveDate}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {p.mandatoryConsent ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-2 border border-line text-text">
                        MANDATORY
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-text-3">INFORMATIONAL</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      type="button"
                      className="text-xs font-mono text-volt hover:underline uppercase"
                    >
                      EDIT MARKDOWN
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Help Articles Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold uppercase tracking-tight font-display">
          HELP CENTER KNOWLEDGE BASE ARTICLES
        </h2>

        <div className="border border-line overflow-x-auto bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-surface-2 text-xs font-mono uppercase tracking-wider text-text-3">
              <tr>
                <th className="py-3 px-4">ARTICLE TITLE</th>
                <th className="py-3 px-4">CATEGORY</th>
                <th className="py-3 px-4">SLUG</th>
                <th className="py-3 px-4 text-right">PAGE VIEWS</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-surface-2 transition-colors">
                  <td className="py-4 px-4 font-bold text-text">
                    {art.title}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-text-3">
                    {art.category}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-text-2">
                    /help/{art.slug}
                  </td>
                  <td className="py-4 px-4 text-right font-mono text-xs text-volt tabular-nums">
                    {art.views.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      type="button"
                      className="text-xs font-mono text-volt hover:underline uppercase"
                    >
                      EDIT
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
