import express from 'express'
import { ingredientController } from '../controllers/ingredientControllers.js'

const router = express.Router()
// Todos los ingredientes
router.get('/ingredientes', ingredientController.getAllIngredients)
// Añadir un ingrediente
router.post('/ingredientes', ingredientController.createIngredient)
// editar un ingrediente
router.put('/ingredientes/:id', ingredientController.updateIngredient)
// Eñiminar un ingrediente
router.delete('/ingredientes/:id', ingredientController.deleteIngredient)
// Recibir los ingredientes de un usuario
router.get('/ingredientes/:userId', ingredientController.getUserIngredients)
// Añadir un ingrediente asociado a un usuario
router.post('/ingredientes/:userId', ingredientController.createIngredientForUser)
// Eliminar un ingrediente asociado a un usuario
router.delete('/ingredientes/:userId/:ingredienteId', ingredientController.deleteUserIngredient)
export default router