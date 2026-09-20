import { Router } from 'express';
import { login, register, getMe, logout } from '../controllers/authController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', authenticateJWT, getMe);
router.post('/logout', logout);

export default router;
