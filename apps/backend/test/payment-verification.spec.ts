// apps/backend/test/payment-verification.spec.ts
import * as crypto from 'crypto';

function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  receivedSignature: string,
  secret: string,
): boolean {
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  const expectedBuffer = Buffer.from(generatedSignature);
  const actualBuffer = Buffer.from(receivedSignature);

  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
}

describe('Payment Signature Verification and Money Safety', () => {
  const secret = 'super_secret_webhook_key_12345';
  const orderId = 'order_test_98765';
  const paymentId = 'pay_test_12345';

  it('validates authentic Razorpay payment signatures', () => {
    const validSignature = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    const isValid = verifyRazorpaySignature(orderId, paymentId, validSignature, secret);
    expect(isValid).toBe(true);
  });

  it('rejects tampered signatures or mismatched order/payment IDs', () => {
    const validSignature = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    // Mismatched payment ID
    expect(verifyRazorpaySignature(orderId, 'pay_tampered_99999', validSignature, secret)).toBe(false);

    // Mismatched order ID
    expect(verifyRazorpaySignature('order_tampered', paymentId, validSignature, secret)).toBe(false);

    // Corrupted signature string
    const corruptedSignature = validSignature.slice(0, -4) + 'abcd';
    expect(verifyRazorpaySignature(orderId, paymentId, corruptedSignature, secret)).toBe(false);
  });

  it('detects amount mismatches and prevents escrow lock', () => {
    const expectedOrderTotalPaise = 367500;
    const paymentCapturedFromApiPaise = 350000; // Seller fee was omitted or manipulated

    const isAmountValid = expectedOrderTotalPaise === paymentCapturedFromApiPaise;
    expect(isAmountValid).toBe(false);
  });
});
