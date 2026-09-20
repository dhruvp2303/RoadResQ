import { Router } from 'express';
import {
  getProviderRequests,
  acceptIncident,
  declineIncident,
  toggleShiftStatus,
  getProviderProfile,
} from '../controllers/providerController.js';

const router = Router();

router.get('/requests', getProviderRequests);
router.post('/requests/:id/accept', acceptIncident);
router.post('/requests/:id/decline', declineIncident);
router.post('/:id/toggle-status', toggleShiftStatus);
router.get('/:id/profile', getProviderProfile);

export default router;
