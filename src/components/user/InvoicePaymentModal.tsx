import React, { useState } from 'react';
import { useRoadResQ } from '../../context/RoadResQContext';
import {
  CreditCard,
  QrCode,
  Smartphone,
  Banknote,
  Receipt,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const InvoicePaymentModal: React.FC = () => {
  const { activeIncident, processPayment } = useRoadResQ();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'wallet' | 'cash'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  // Card form simulation
  const [cardDetails, setCardDetails] = useState({
    number: '•••• •••• •••• 4242',
    expiry: '09/28',
    cvv: '•••',
    name: 'Rahul Sharma',
  });

  if (!activeIncident || !activeIncident.invoice) return null;

  const invoice = activeIncident.invoice;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      processPayment(paymentMethod);
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-up">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-900 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm">
              <Receipt className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold text-slate-900">Digital Tax Invoice</h2>
                <span className="rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold font-mono">
                  {invoice.id}
                </span>
              </div>
              <p className="text-xs text-slate-500">Incident #{activeIncident.id} • Itemized GST Bill</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">Total Due</div>
            <div className="font-display text-2xl font-extrabold text-emerald-700 font-mono">
              ₹{invoice.total.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Itemized Breakdown Card */}
        <div className="my-5 rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2.5 text-xs">
          <div className="font-bold text-slate-500 uppercase tracking-wider text-[10px] pb-1 border-b border-slate-200 flex items-center justify-between">
            <span>Service Item / Spare</span>
            <span>Amount</span>
          </div>

          <div className="flex justify-between text-slate-700">
            <span>Emergency Base Dispatch & Distance Fee</span>
            <span className="font-mono font-medium">₹{invoice.baseFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-slate-700">
            <span>Certified Technician Inspection & Labor</span>
            <span className="font-mono font-medium">₹{invoice.labourFee.toFixed(2)}</span>
          </div>

          {invoice.parts &&
            invoice.parts.map((part) => (
              <div key={part.id} className="flex justify-between text-slate-600 pl-2">
                <span>• {part.name}</span>
                <span className="font-mono font-medium">₹{part.price.toFixed(2)}</span>
              </div>
            ))}

          {invoice.discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>RoadResQ Member Safety Discount</span>
              <span className="font-mono">-₹{invoice.discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-slate-500">
            <span>Goods & Service Tax (GST 8%)</span>
            <span className="font-mono">₹{invoice.tax.toFixed(2)}</span>
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
            <span>Final Total Due</span>
            <span className="font-mono text-emerald-700 text-base">₹{invoice.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method Selector */}
        <form onSubmit={handlePay} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Select Payment Method
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-xs font-semibold transition-all ${
                  paymentMethod === 'upi'
                    ? 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-400 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <QrCode className="h-4 w-4 text-blue-600" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-xs font-semibold transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-400 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <CreditCard className="h-4 w-4 text-slate-700" />
                <span>Debit / Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-xs font-semibold transition-all ${
                  paymentMethod === 'wallet'
                    ? 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-400 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <Smartphone className="h-4 w-4 text-emerald-600" />
                <span>Wallets</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-xs font-semibold transition-all ${
                  paymentMethod === 'cash'
                    ? 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-400 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <Banknote className="h-4 w-4 text-amber-600" />
                <span>Cash to Pro</span>
              </button>
            </div>
          </div>

          {/* Gateway Previews */}
          {paymentMethod === 'upi' && (
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-center space-y-2 text-xs animate-fade-up">
              <div className="font-bold text-blue-900">Instant UPI Payment (Google Pay / PhonePe / Paytm / BHIM)</div>
              <div className="font-mono text-slate-800 bg-white p-2 rounded-xl border border-blue-200 inline-block text-xs font-bold">
                roadresq.dispatch@icici
              </div>
              <p className="text-[11px] text-slate-500">Scan QR on technician's mobile or approve in your UPI app</p>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs animate-fade-up">
              <div className="flex justify-between items-center text-slate-600">
                <span>Cardholder Name</span>
                <span className="font-semibold text-slate-900">{cardDetails.name}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 font-mono">
                <span>Card Number</span>
                <span className="text-slate-900 font-bold">{cardDetails.number}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 font-mono">
                <span>Expires / CVV</span>
                <span className="text-slate-900 font-bold">{cardDetails.expiry} • {cardDetails.cvv}</span>
              </div>
            </div>
          )}

          {paymentMethod === 'wallet' && (
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center text-xs text-emerald-900 animate-fade-up">
              Paytm Wallet / Amazon Pay / PhonePe Wallet 1-touch checkout enabled.
            </div>
          )}

          {paymentMethod === 'cash' && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-center text-xs text-amber-900 animate-fade-up">
              Please pay <strong>₹{invoice.total.toFixed(2)}</strong> in cash directly to technician. Digital receipt will be sent upon confirmation.
            </div>
          )}

          {/* Footer Security Badge & CTA */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>256-bit Secure UPI & Card Gateway</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:shadow active:scale-95 transition-all disabled:opacity-50"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>{isProcessing ? 'Verifying...' : `Pay ₹${invoice.total.toFixed(2)}`}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoicePaymentModal;
