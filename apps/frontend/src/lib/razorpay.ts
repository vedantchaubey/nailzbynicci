// apps/frontend/src/lib/razorpay.ts

export interface RazorpayPrefill {
  name?: string;
  email?: string;
  contact?: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number; // in paise
  currency: string;
  name: string;
  description: string;
  order_id: string;
  image?: string;
  prefill?: RazorpayPrefill;
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  handler?: (response: RazorpayPaymentSuccessResponse) => void;
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
    backdropclose?: boolean;
  };
}

export interface RazorpayPaymentSuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayPaymentFailureResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id: string;
      payment_id?: string;
    };
  };
}

export interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: (response: RazorpayPaymentFailureResponse) => void) => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

/**
 * Dynamically loads the official Razorpay checkout script if not already present.
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      console.error('[Razorpay] Failed to load Razorpay checkout script.');
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

/**
 * Opens Razorpay checkout modal with comprehensive error handling and callbacks.
 */
export async function openRazorpayCheckout(
  options: Omit<RazorpayOptions, 'theme'> & { themeColor?: string },
  callbacks?: {
    onSuccess?: (res: RazorpayPaymentSuccessResponse) => void;
    onDismiss?: () => void;
    onFailure?: (err: RazorpayPaymentFailureResponse) => void;
  },
): Promise<void> {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded || !window.Razorpay) {
    throw new Error('Unable to initialize payment gateway. Please check your internet connection.');
  }

  const razorpayOptions: RazorpayOptions = {
    key: options.key,
    amount: options.amount,
    currency: options.currency || 'INR',
    name: options.name || 'TicketPass',
    description: options.description || 'Verified Ticket Resale Escrow',
    order_id: options.order_id,
    image: options.image || '/logo.png',
    prefill: options.prefill,
    notes: options.notes,
    theme: {
      color: options.themeColor || '#10b981', // emerald-500
    },
    handler: (response) => {
      if (options.handler) {
        options.handler(response);
      }
      if (callbacks?.onSuccess) {
        callbacks.onSuccess(response);
      }
    },
    modal: {
      ondismiss: () => {
        if (options.modal?.ondismiss) {
          options.modal.ondismiss();
        }
        if (callbacks?.onDismiss) {
          callbacks.onDismiss();
        }
      },
      escape: true,
      backdropclose: false,
    },
  };

  const rzp = new window.Razorpay(razorpayOptions);

  rzp.on('payment.failed', (response: RazorpayPaymentFailureResponse) => {
    console.error('[Razorpay] Payment failed:', response.error);
    if (callbacks?.onFailure) {
      callbacks.onFailure(response);
    }
  });

  rzp.open();
}
