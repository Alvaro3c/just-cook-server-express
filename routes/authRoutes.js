import express from 'express';
import { authController } from '../controllers/authControllers.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta de login
router.post('/login', authController.login);

// Ruta de logout
router.post('/logout', authController.logout);

// Ruta para obtener perfil del usuario autenticado
router.get('/perfil', authenticateToken, authController.getProfile);

// Ruta para verificar si el usuario está autenticado
router.get('/verificar', authenticateToken, authController.verifyAuth);

export default router;