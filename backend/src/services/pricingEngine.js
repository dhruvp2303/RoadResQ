/**
 * RoadResQ Transparent Pricing Engine
 * Computes base rates, labor, parts, GST (18%), and dynamic membership discounts in ₹ INR.
 */

const BASE_SERVICE_RATES = {
  FLAT_TYRE: 350.0,
  DEAD_BATTERY: 450.0,
  OUT_OF_FUEL: 400.0,
  OVERHEATING: 550.0,
  MECHANICAL: 650.0,
  TOWING: 1200.0,
  DONT_KNOW: 500.0,
};

export function calculateIncidentInvoice({
  breakdownType = 'FLAT_TYRE',
  labourFee = 150.0,
  parts = [],
  discount = 50.0,
}) {
  const normType = String(breakdownType).toUpperCase();
  const baseFee = BASE_SERVICE_RATES[normType] || 450.0;
  const partsFee = parts.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const subtotal = baseFee + labourFee + partsFee;
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Number((taxableAmount * 0.18).toFixed(2)); // 18% GST in India
  const total = Number((taxableAmount + tax).toFixed(2));

  return {
    baseFee,
    labourFee,
    partsFee,
    parts,
    discount,
    tax,
    total,
  };
}
