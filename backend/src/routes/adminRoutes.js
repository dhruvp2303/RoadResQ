import { Router } from 'express';
import {
  getDashboardMetrics,
  getAdminIncidents,
  getAdminProviders,
  updateProviderStatus,
  getAdminUsers,
} from '../controllers/adminController.js';

const router = Router();

router.get('/dashboard', getDashboardMetrics);
router.get('/incidents', getAdminIncidents);
router.get('/providers', getAdminProviders);
router.patch('/providers/:id/status', updateProviderStatus);
router.get('/users', getAdminUsers);

export default router;
