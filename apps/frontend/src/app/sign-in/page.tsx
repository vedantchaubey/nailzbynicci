// apps/frontend/src/app/sign-in/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  UserCheck,
  Award,
  Sparkles,
  ArrowRight,
  Loader2,
  Lock,
  Smartphone,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useAuthStore } from '../../stores/auth.store';
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';

const DEMO_PERSONAS = [
  {
    name: 'SuperAdmin',
    email: 'admin@ticketpass.dev',
    role: 'SUPER_ADMIN',
    badge: 'Full Back-Office Access',
    description: 'Manage disputes, trigger force-refunds, monitor fraud scores, and audit system logs.',
    icon: ShieldCheck,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
  },
  {
    name: 'Verified Seller (Score: 94)',
    email: 'seller.verified@ticketpass.dev',
    role: 'USER',
    badge: 'Verified Tier • Instant Payouts',
    description: '21 completed sales, 0 disputes. Has registered bank coordinates and active listings.',
    icon: Award,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    name: 'Trusted Seller (Score: 78)',
    email: 'seller.trusted@ticketpass.dev',
    role: 'USER',
    badge: 'Trusted Tier • Fast Escrow',
    description: '7 completed sales. Active seller with BookMyShow tickets.',
    icon: CheckCircle2,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    name: 'Active Buyer',
    email: 'buyer.one@ticketpass.dev',
    role: 'USER',
    badge: 'Escrow Protected Buyer',
    description: 'Active buyer with orders awaiting BookMyShow and District in-app transfers.',
    icon: UserCheck,
    color: 'text-purple-600 bg-purple-50 border-purple-200',
  },
];

export default function SignInPage() {
  const router = useRouter();
  const { loginWithDevAccount, isLoading } = useAuthStore();

  const [activePersona, setActivePersona] = useState<string | null>(null);
  const [customEmail, setCustomEmail] = useState('');
  const [customPassword, setCustomPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSelectPersona = async (email: string, role?: string) => {
    setError(null);
    setActivePersona(email);
    try {
      await loginWithDevAccount(email, role);
      if (role === 'SUPER_ADMIN') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      console.error('Failed to login:', err);
      setError(err?.message || 'Login failed.');
      setActivePersona(null);
    }
  };

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    await handleSelectPersona(customEmail);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
            T
          </div>
          <span className="font-serif font-black text-2xl tracking-tight text-gray-900">
            TicketPass
          </span>
        </Link>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Sign In to Your Account</h2>
        <p className="text-xs text-gray-500 mt-1">
          Select a verified testing persona for instant zero-password access or enter credentials below.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4">
        <Card className="border-gray-200 bg-white shadow-md p-6 space-y-6">
          {/* Quick Persona Selector */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                1-Click Demonstration Personas
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DEMO_PERSONAS.map((p) => {
                const Icon = p.icon;
                const isSelected = activePersona === p.email;

                return (
                  <button
                    key={p.email}
                    type="button"
                    onClick={() => handleSelectPersona(p.email, p.role)}
                    disabled={isLoading}
                    className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/40 ring-2 ring-brand-600'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className={`p-1.5 rounded-lg border ${p.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <Badge variant="outline" className="text-[10px]">
                          {p.role === 'SUPER_ADMIN' ? 'Admin' : 'User'}
                        </Badge>
                      </div>
                      <div className="font-bold text-xs text-gray-900">{p.name}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{p.email}</div>
                      <p className="text-[11px] text-gray-500 mt-2 leading-snug line-clamp-2">
                        {p.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-brand-600">
                      <span>{isSelected ? 'Authenticating...' : 'Sign in as this user'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400 font-medium">Or Sign In with Email</span>
            </div>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="name@example.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={customPassword}
                onChange={(e) => setCustomPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full font-bold text-xs"
              disabled={isLoading || !customEmail}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In to TicketPass'
              )}
            </Button>
          </form>

          <div className="text-center text-xs text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="font-semibold text-brand-600 hover:text-brand-700">
              Sign up for free
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
