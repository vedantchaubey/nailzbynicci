// apps/backend/test/fee-calculation.spec.ts
import {
  calculateOrderFees,
  formatINR,
  rupeesToPaise,
  paiseToRupees,
} from '@ticketpass/shared';

describe('Fee Calculation and Money Utilities', () => {
  it('calculates fees strictly as integer paise without floating point issues', () => {
    // Ticket price: ₹3,500.00 = 350,000 paise
    const pricePaise = 350000;
    const fees = calculateOrderFees(pricePaise);

    expect(Number.isInteger(fees.resalePricePaise)).toBe(true);
    expect(Number.isInteger(fees.buyerFeePaise)).toBe(true);
    expect(Number.isInteger(fees.sellerFeePaise)).toBe(true);
    expect(Number.isInteger(fees.totalBuyerPaysPaise)).toBe(true);
    expect(Number.isInteger(fees.sellerReceivesPaise)).toBe(true);
    expect(Number.isInteger(fees.securityDepositPaise)).toBe(true);

    // 5% of 350,000 = 17,500 paise (₹175.00)
    expect(fees.buyerFeePaise).toBe(17500);
    expect(fees.sellerFeePaise).toBe(17500);

    // Total buyer pays = 350,000 + 17,500 = 367,500 paise (₹3,675.00)
    expect(fees.totalBuyerPaysPaise).toBe(367500);

    // Seller receives = 350,000 - 17,500 = 332,500 paise (₹3,325.00)
    expect(fees.sellerReceivesPaise).toBe(332500);

    // Platform take = buyerFee + sellerFee = 17,500 + 17,500 = 35,000 paise (10% of 350,000)
    expect(fees.buyerFeePaise + fees.sellerFeePaise).toBe(35000);

    // 20% Security Deposit = 20% of 350,000 = 70,000 paise (₹700.00)
    expect(fees.securityDepositPaise).toBe(70000);
  });

  it('correctly rounds odd paise fractions to integers', () => {
    // ₹1,499.99 = 149,999 paise
    const oddPricePaise = 149999;
    const fees = calculateOrderFees(oddPricePaise);

    expect(Number.isInteger(fees.buyerFeePaise)).toBe(true);
    expect(Number.isInteger(fees.sellerFeePaise)).toBe(true);
    expect(Number.isInteger(fees.totalBuyerPaysPaise)).toBe(true);
    expect(Number.isInteger(fees.sellerReceivesPaise)).toBe(true);

    // 5% of 149,999 = 7499.95 -> Math.round -> 7500
    expect(fees.buyerFeePaise).toBe(7500);
    expect(fees.sellerFeePaise).toBe(7500);
    expect(fees.totalBuyerPaysPaise).toBe(149999 + 7500);
    expect(fees.sellerReceivesPaise).toBe(149999 - 7500);
  });

  it('throws an error on non-integer or negative inputs', () => {
    expect(() => calculateOrderFees(100.5)).toThrow();
    expect(() => calculateOrderFees(-500)).toThrow();
  });

  it('formats integer paise to standard Indian Rupee currency strings', () => {
    expect(formatINR(150000)).toMatch(/₹\s?1,500/);
    expect(formatINR(367550)).toMatch(/₹\s?3,675\.5/);
    expect(formatINR(0)).toMatch(/₹\s?0/);
  });

  it('converts between rupees and paise accurately', () => {
    expect(rupeesToPaise(500)).toBe(50000);
    expect(rupeesToPaise(1250.75)).toBe(125075);
    expect(paiseToRupees(50000)).toBe(500);
    expect(paiseToRupees(125075)).toBe(1250.75);
  });
});
