import { Router } from 'express';
import { getIncidentTracking, updateLiveLocation } from '../controllers/trackingController.js';

const router = Router();

router.get('/:id/tracking', getIncidentTracking);
router.post('/:id/location', updateLiveLocation);

export default router;
