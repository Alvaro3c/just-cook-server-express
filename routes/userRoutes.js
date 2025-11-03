import express from 'express'
import { userController } from '../controllers/userControllers.js'

const router = express.Router()

// Rutas de usuarios
router.get('/usuarios', userController.getAllUsers)
router.post('/usuarios', userController.createUser)

export default router