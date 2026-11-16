// apps/frontend/src/app/sign-up/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Ticket,
  Lock,
} from 'lucide-react';
import { useAuthStore } from '../../stores/auth.store';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function SignUpPage() {
  const router = useRouter();
  const { loginWithDevAccount, isLoading } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [intent, setIntent] = useState<'buyer' | 'seller'>('buyer');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!agreed) {
      setError('Please agree to the Terms of Service & Escrow Rules.');
      return;
    }

    try {
      // Connects via dev session switcher for instantaneous session setup
      await loginWithDevAccount(email.trim(), 'USER');
      if (intent === 'seller') {
        router.push('/sell');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      console.error('Sign-up failed:', err);
      setError(err?.message || 'Failed to create account. Please try again.');
    }
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
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Create Your Account</h2>
        <p className="text-xs text-gray-500 mt-1">
          Join the verified ticket resale marketplace. Zero-scam in-app transfers with autonomous escrow protection.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Card className="border-gray-200 bg-white shadow-md p-6 space-y-5">
          {/* Intent Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
            <button
              type="button"
              onClick={() => setIntent('buyer')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                intent === 'buyer'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              I want to Buy Tickets
            </button>
            <button
              type="button"
              onClick={() => setIntent('seller')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                intent === 'seller'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              I want to Sell Tickets
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="rahul@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Mobile Number (BookMyShow / District Account)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-gray-400 font-mono">+91</span>
                <Input
                  type="tel"
                  maxLength={10}
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="pl-12 font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Password
              </label>
              <Input
                type="password"
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-600 select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="leading-snug">
                  I agree to the{' '}
                  <Link href="/terms" className="font-semibold text-brand-600 underline">
                    Terms of Service
                  </Link>{' '}
                  and acknowledge that tickets are delivered exclusively inside official BookMyShow and District apps.
                </span>
              </label>
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
              className="w-full font-bold text-xs py-5"
              disabled={isLoading || !agreed}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account &amp; Continue'
              )}
            </Button>
          </form>

          <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
            Already have an account?{' '}
            <Link href="/sign-in" className="font-semibold text-brand-600 hover:text-brand-700">
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
