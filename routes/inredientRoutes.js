import express from 'express'
import { ingredientController } from '../controllers/ingredientControllers.js'

const router = express.Router()

router.get('/ingredientes', ingredientController.getAllIngredients)
router.post('/ingredientes', ingredientController.createIngredient)
router.put('/ingredientes/:id', ingredientController.updateIngredient)
router.delete('/ingredientes/:id', ingredientController.deleteIngredient)
router.get('/ingredientes/:userId', ingredientController.getUserIngredients)
router.post('/ingredientes/:userId', ingredientController.createIngredientForUser)
router.delete('/ingredientes/:userId/:ingredienteId', ingredientController.deleteUserIngredient)
export default router