// apps/frontend/src/components/transfer/platform-steps-card.tsx
import React from 'react';
import { Platform } from '@ticketpass/shared';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Smartphone, CheckCircle, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';

interface PlatformStepsCardProps {
  platform: Platform;
  isBuyer: boolean;
}

export function PlatformStepsCard({ platform, isBuyer }: PlatformStepsCardProps) {
  const isBms = platform === Platform.BOOKMYSHOW;

  return (
    <Card className="border-gray-200 bg-white shadow-sm overflow-hidden">
      <CardHeader className="bg-gray-50/70 border-b border-gray-100 pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-gray-700" />
          <h3 className="text-sm font-bold text-gray-900">
            {isBms ? 'BookMyShow Official App Flow' : 'District by Zomato Official App Flow'}
          </h3>
        </div>
        <Badge variant="outline" className="text-xs font-mono">
          {isBuyer ? 'Buyer Steps' : 'Seller Steps'}
        </Badge>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {isBms ? (
          /* BookMyShow Guide */
          <div className="space-y-3">
            <div className="text-xs text-gray-600 font-medium">
              Transfers happen exclusively inside BookMyShow. No screenshots or PDFs are ever valid for stadium gate entry.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="w-5 h-5 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center text-[10px] mb-2">
                    1
                  </div>
                  <div className="font-bold text-gray-900">Select Contacts</div>
                  <div className="text-gray-500 text-[11px] mt-1">
                    Seller selects buyer from smartphone phone contacts.
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="w-5 h-5 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center text-[10px] mb-2">
                    2
                  </div>
                  <div className="font-bold text-gray-900">Transfer Tickets</div>
                  <div className="text-gray-500 text-[11px] mt-1">
                    Popup confirms: &quot;Transfer this ticket to &lt;name&gt;?&quot; and seller confirms.
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="w-5 h-5 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center text-[10px] mb-2">
                    3
                  </div>
                  <div className="font-bold text-gray-900">Accept Transfer</div>
                  <div className="text-gray-500 text-[11px] mt-1">
                    Buyer gets SMS, opens BMS booking history &amp; taps &quot;Accept&quot;.
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col justify-between">
                <div>
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] mb-2">
                    4
                  </div>
                  <div className="font-bold text-emerald-950">Generate M-Ticket</div>
                  <div className="text-emerald-800 text-[11px] mt-1">
                    BMS generates fresh M-Ticket in buyer app; old seller QR invalidated.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Important Notice for BMS:</strong> Sellers can cancel a pending transfer request before you accept.
                Therefore, do not delay: open BookMyShow immediately and tap <strong>Accept</strong>. TicketPass escrow only releases after acceptance is finalized.
              </div>
            </div>
          </div>
        ) : (
          /* District Guide */
          <div className="space-y-3">
            <div className="text-xs text-gray-600 font-medium">
              District (by Zomato) uses native mobile M-Tickets. Box-office pickup vouchers cannot be transferred.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-[10px] mb-2">
                    1
                  </div>
                  <div className="font-bold text-gray-900">Initiate Transfer</div>
                  <div className="text-gray-500 text-[11px] mt-1">
                    Seller enters buyer&apos;s 10-digit mobile number in District.
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-[10px] mb-2">
                    2
                  </div>
                  <div className="font-bold text-gray-900">Pending Tab</div>
                  <div className="text-gray-500 text-[11px] mt-1">
                    Buyer sees tickets under My Bookings &gt; Transferred Tickets.
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-[10px] mb-2">
                    3
                  </div>
                  <div className="font-bold text-gray-900">Accept Tickets</div>
                  <div className="text-gray-500 text-[11px] mt-1">
                    Buyer taps &quot;Accept tickets&quot; popup: Received tickets from seller.
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col justify-between">
                <div>
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] mb-2">
                    4
                  </div>
                  <div className="font-bold text-emerald-950">Booked Badge</div>
                  <div className="text-emerald-800 text-[11px] mt-1">
                    Buyer sees green &quot;Booked&quot; badge and toast &quot;Tickets Accepted!&quot;
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-[11px] text-red-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>CRITICAL ANTI-SCAM WARNING FOR DISTRICT:</strong> If anyone contacts you via WhatsApp, Instagram or SMS asking you to &quot;Send back&quot; or reverse-transfer the ticket because &quot;it was a mistake&quot;, <strong>DO NOT DO IT</strong>. Once accepted, you own the ticket. A reverse transfer permanently surrenders your ticket.
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
