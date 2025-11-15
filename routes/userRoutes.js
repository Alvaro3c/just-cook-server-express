import express from 'express'
import { userController } from '../controllers/userControllers.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

// Rutas de usuarios
router.get('/usuarios', authenticateToken, userController.getAllUsers)
router.post('/usuarios', userController.createUser)

export default router