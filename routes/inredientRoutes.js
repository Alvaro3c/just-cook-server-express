import express from 'express'
import { ingredientController } from '../controllers/ingredientControllers.js'

const router = express.Router()

router.get('/ingredientes', ingredientController.getAllIngredients)
router.post('/ingredientes', ingredientController.createIngredient)
router.put('/ingredientes/:id', ingredientController.updateIngredient)
router.delete('/ingredientes/:id', ingredientController.deleteIngredient)

export default router