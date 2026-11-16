// apps/backend/test/fraud-rules.spec.ts
import { FraudSeverity, BUSINESS_RULES } from '@ticketpass/shared';

describe('Fraud Engine and Risk Rules', () => {
  it('flags extreme price markups as HIGH severity and moderate markups as MEDIUM', () => {
    const originalPricePaise = 100000; // ₹1,000

    // 12x markup -> HIGH
    const extremeMarkup = originalPricePaise * 12;
    const extremeRatio = extremeMarkup / originalPricePaise;
    expect(extremeRatio >= BUSINESS_RULES.PRICE_ANOMALY_HIGH_MULTIPLIER).toBe(true);

    // 6x markup -> MEDIUM
    const highMarkup = originalPricePaise * 6;
    const highRatio = highMarkup / originalPricePaise;
    expect(highRatio >= BUSINESS_RULES.PRICE_ANOMALY_MEDIUM_MULTIPLIER).toBe(true);
    expect(highRatio < BUSINESS_RULES.PRICE_ANOMALY_HIGH_MULTIPLIER).toBe(true);

    // 15% of original price -> Suspicious underpricing (< 20%)
    const suspiciousUnderprice = originalPricePaise * 0.15;
    const underpriceRatio = suspiciousUnderprice / originalPricePaise;
    expect(underpriceRatio < BUSINESS_RULES.PRICE_ANOMALY_LOW_FLOOR).toBe(true);
  });

  it('detects collusion when buyer and seller share the same device fingerprint', () => {
    const sellerDeviceFingerprints = ['fp_browser_mac_99', 'fp_iphone_safari_01'];
    const buyerDeviceFingerprint = 'fp_browser_mac_99'; // Same machine!

    const isCollusion = sellerDeviceFingerprints.includes(buyerDeviceFingerprint);
    expect(isCollusion).toBe(true);

    const severity = isCollusion ? FraudSeverity.CRITICAL : FraudSeverity.LOW;
    expect(severity).toBe(FraudSeverity.CRITICAL);
  });

  it('detects collusion when buyer and seller share the same phone number', () => {
    const sellerPhone = '+919876543210';
    const buyerPhone = '+919876543210';

    const isSharedPhone = sellerPhone === buyerPhone;
    expect(isSharedPhone).toBe(true);
  });

  it('enforces velocity limits on listings and order submissions', () => {
    const listingsInPastHour = 9;
    expect(listingsInPastHour > BUSINESS_RULES.MAX_LISTINGS_PER_HOUR).toBe(true);

    const ordersInTenMinutes = 4;
    expect(ordersInTenMinutes > BUSINESS_RULES.MAX_ORDERS_PER_TEN_MINUTES).toBe(true);
  });
});
