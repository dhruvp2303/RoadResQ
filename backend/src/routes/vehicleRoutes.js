import { Router } from 'express';
import {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from '../controllers/vehicleController.js';

const router = Router();

router.get('/', getVehicles);
router.post('/', addVehicle);
router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);

export default router;
