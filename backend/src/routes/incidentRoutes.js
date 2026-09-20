import { Router } from 'express';
import {
  createIncident,
  getIncidents,
  getIncidentById,
  updateIncidentStatus,
  getMatchedProviders,
  escalateIncident,
} from '../controllers/incidentController.js';

const router = Router();

router.post('/', createIncident);
router.get('/', getIncidents);
router.get('/:id', getIncidentById);
router.patch('/:id/status', updateIncidentStatus);
router.get('/:id/providers', getMatchedProviders);
router.post('/:id/escalate', escalateIncident);

export default router;
