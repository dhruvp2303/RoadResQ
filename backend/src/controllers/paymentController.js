import { DB } from '../services/dataStore.js';
import { calculateIncidentInvoice } from '../services/pricingEngine.js';

export const createInvoice = (req, res) => {
  const { id } = req.params;
  const { parts, labourFee, discount } = req.body;

  const incident = DB.incidents.find((i) => i.id === id);
  if (!incident) {
    return res.status(404).json({ success: false, message: 'Incident not found' });
  }

  const invoiceData = calculateIncidentInvoice({
    breakdownType: incident.breakdownType,
    labourFee: Number(labourFee) || 150.0,
    parts: parts || [],
    discount: Number(discount) || 50.0,
  });

  const invoice = {
    id: `INV-2026-${String(Math.floor(100000 + Math.random() * 900000))}`,
    incidentId: incident.id,
    ...invoiceData,
    isPaid: false,
    issuedAt: new Date().toISOString(),
  };

  incident.invoice = invoice;
  incident.status = 'PAYMENT';

  res.status(201).json({ success: true, invoice });
};

export const getInvoice = (req, res) => {
  const { id } = req.params;
  const incident = DB.incidents.find((i) => i.id === id);

  if (!incident || !incident.invoice) {
    return res.status(404).json({ success: false, message: 'Invoice not found for this incident' });
  }

  res.json({ success: true, invoice: incident.invoice });
};

export const createPaymentOrder = (req, res) => {
  const { incidentId, amount, method } = req.body;

  // Simulator for Indian gateways (Razorpay / UPI / Cash)
  const order = {
    orderId: `order_${Date.now()}`,
    amount: amount || 480.0,
    currency: 'INR',
    gateway: method || 'RAZORPAY',
    status: 'CREATED',
  };

  res.json({ success: true, order });
};

export const verifyPayment = (req, res) => {
  const { incidentId, amount, method, paymentId } = req.body;

  const incident = DB.incidents.find((i) => i.id === incidentId);
  if (incident) {
    incident.status = 'CLOSED';
    if (incident.invoice) {
      incident.invoice.isPaid = true;
      incident.invoice.paymentMethod = method || 'UPI';
      incident.invoice.paidAt = new Date().toISOString();
    }
  }

  res.json({
    success: true,
    verified: true,
    transactionId: paymentId || `TXN_${Date.now()}`,
    amount,
    method: method || 'UPI',
    timestamp: new Date().toISOString(),
    message: 'Payment verified and confirmed by RoadResQ Settlement Engine',
  });
};

export const submitReview = (req, res) => {
  const { id } = req.params;
  const { rating, feedback, tags, tipAmount } = req.body;

  const incident = DB.incidents.find((i) => i.id === id);
  if (!incident) {
    return res.status(404).json({ success: false, message: 'Incident not found' });
  }

  incident.review = {
    rating: Number(rating) || 5,
    feedback: feedback || 'Excellent service!',
    tags: Array.isArray(tags) ? tags.join(', ') : tags,
    tipAmount: Number(tipAmount) || 0,
    createdAt: new Date().toISOString(),
  };

  // Update provider rating
  if (incident.providerId) {
    const pro = DB.providers.find((p) => p.id === incident.providerId);
    if (pro) {
      pro.jobsCompleted += 1;
      pro.earningsToday += (incident.invoice?.total || 500) + (Number(tipAmount) || 0);
      pro.status = 'AVAILABLE';
    }
  }

  res.json({ success: true, review: incident.review, message: 'Review submitted successfully' });
};
