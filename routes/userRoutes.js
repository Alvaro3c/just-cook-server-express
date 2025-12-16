import express from 'express'
import { userController } from '../controllers/userControllers.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

// ver todos los usuarios
router.get('/usuarios', authenticateToken, userController.getAllUsers)
// añadir un usuario
router.post('/usuarios', userController.createUser)

export default router