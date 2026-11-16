// apps/frontend/src/components/transfer/buyer-number-card.tsx
import React, { useState } from 'react';
import { Copy, Check, Smartphone, AlertCircle, UserCheck } from 'lucide-react';
import { Platform } from '@ticketpass/shared';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface BuyerNumberCardProps {
  buyerPhone: string;
  buyerName: string;
  platform: Platform;
}

export function BuyerNumberCard({ buyerPhone, buyerName, platform }: BuyerNumberCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(buyerPhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isBms = platform === Platform.BOOKMYSHOW;

  return (
    <Card className="border-brand-200 bg-white shadow-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-brand-50 to-white pb-3 border-b border-brand-100 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-brand-600" />
          <h3 className="text-sm font-bold text-gray-900">Buyer Transfer Coordinates</h3>
        </div>
        <Badge variant="outline" className="border-brand-300 text-brand-700 bg-brand-50 text-[11px]">
          Target Recipient
        </Badge>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
              {isBms ? 'BookMyShow Registered Mobile' : 'District Registered Mobile'}
            </div>
            <div className="text-xl font-black font-mono text-gray-900 tracking-wider mt-0.5">
              +91 {buyerPhone}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-600">
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Recipient: <strong className="text-gray-800">{buyerName}</strong></span>
            </div>
          </div>

          <Button
            type="button"
            variant={copied ? 'secondary' : 'primary'}
            size="sm"
            onClick={handleCopy}
            className="flex items-center gap-1.5 shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </Button>
        </div>

        {/* Platform specific instruction */}
        {isBms ? (
          <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-2">
            <div className="flex items-start gap-2 font-bold text-amber-950">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>CRITICAL BOOKMYSHOW REQUIREMENT:</span>
            </div>
            <ol className="list-decimal pl-5 space-y-1 text-[11px] text-amber-900">
              <li>
                Save <strong>+91 {buyerPhone}</strong> into your mobile phone contacts as &quot;TicketPass Buyer {buyerName}&quot;.
              </li>
              <li>
                Open BookMyShow app &gt; Your Booking &gt; Tap &quot;<strong>Transfer ticket</strong>&quot; under QR.
              </li>
              <li>
                BookMyShow will prompt you to select the receiver <em>from your phone contacts</em>. Select the contact you just saved.
              </li>
              <li>
                Confirm the transfer. Your screen will display &quot;<strong>TICKET TRANSFER REQUEST SENT TO {buyerName}</strong>&quot;.
              </li>
            </ol>
          </div>
        ) : (
          <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-2">
            <div className="flex items-start gap-2 font-bold text-blue-950">
              <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>DISTRICT TRANSFER REQUIREMENT:</span>
            </div>
            <ol className="list-decimal pl-5 space-y-1 text-[11px] text-blue-900">
              <li>
                Open the District app (by Zomato) &gt; Go to <strong>My Bookings</strong>.
              </li>
              <li>
                Select this event &gt; Tap <strong>Transfer Ticket</strong>.
              </li>
              <li>
                Select all seats included in this order and type in <strong>{buyerPhone}</strong>.
              </li>
              <li>
                Tap <strong>Confirm Transfer</strong>. District will change status to &quot;Pending&quot;.
              </li>
            </ol>
          </div>
        )}

        <div className="text-[11px] text-gray-500 bg-gray-50 p-2.5 rounded-lg border border-gray-100 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span>
            Off-platform communication or soliciting direct payments violates TicketPass terms and results in forfeiture of your 20% security deposit.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
