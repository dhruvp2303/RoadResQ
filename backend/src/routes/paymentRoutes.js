import { Router } from 'express';
import {
  createInvoice,
  getInvoice,
  createPaymentOrder,
  verifyPayment,
  submitReview,
} from '../controllers/paymentController.js';

const router = Router();

router.post('/invoice/:id', createInvoice);
router.get('/invoice/:id', getInvoice);
router.post('/create-order', createPaymentOrder);
router.post('/verify', verifyPayment);
router.post('/review/:id', submitReview);

export default router;
