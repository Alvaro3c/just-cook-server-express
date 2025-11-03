import express from 'express'
import { recepiesControllers } from '../controllers/recepiesControllers.js'

const router = express.Router()

// Ruta para ver todas las recetas
router.get('/recetas', recepiesControllers.getAllRecipes)
// Ruta para ver recetas favoritas de un usuario
router.get('/usuarios/:userId/favoritas', recepiesControllers.getUserFavorites)
// Ruta para añadir receta a favoritos
router.post('/usuarios/:userId/favoritas', recepiesControllers.addToFavorites)
// Ruta para eliminar receta de favoritos
router.delete('/usuarios/:userId/favoritas/:recipeId', recepiesControllers.removeFromFavorites)
// Ruta para añadir múltiples recetas desde JSON
router.post('/recetas/bulk', recepiesControllers.addMultipleRecipes)
export default router