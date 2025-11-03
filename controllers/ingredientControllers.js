import { ingredientQueries } from '../queries/ingredientQueries.js'
import { pool } from '../config/database.js'

export const ingredientController = {
    // Ver todos los ingredientes
    getAllIngredients: async (req, res) => {
        try {
            const client = await pool.connect()
            try {
                const result = await client.query(ingredientQueries.getAllIngredients)
                return res.json({
                    count: result.rows.length,
                    ingredientes: result.rows
                })
            } finally {
                client.release()
            }
        } catch (error) {
            console.error('Error obteniendo ingredientes:', error)
            return res.status(500).json({
                error: 'Error interno del servidor'
            })
        }
    },

    // Añadir nuevo ingrediente
    createIngredient: async (req, res) => {
        const { nombre, unidad_base } = req.body

        try {
            if (!nombre || !unidad_base) {
                return res.status(400).json({
                    error: 'Nombre y unidad_base son requeridos'
                })
            }

            const client = await pool.connect()
            try {
                const result = await client.query(ingredientQueries.createIngredient, [
                    nombre,
                    unidad_base
                ])

                return res.status(201).json({
                    message: 'Ingrediente creado exitosamente',
                    ingrediente: result.rows[0]
                })
            } finally {
                client.release()
            }
        } catch (error) {
            if (error.code === '23505') {
                return res.status(409).json({
                    error: 'El ingrediente ya existe'
                })
            }
            console.error('Error creando ingrediente:', error)
            return res.status(500).json({
                error: 'Error interno del servidor'
            })
        }
    },

    // Modificar un ingrediente específico
    updateIngredient: async (req, res) => {
        const { id } = req.params
        const { nombre, unidad_base } = req.body

        try {
            if (!nombre || !unidad_base) {
                return res.status(400).json({
                    error: 'Nombre y unidad_base son requeridos'
                })
            }

            const client = await pool.connect()
            try {
                const result = await client.query(ingredientQueries.updateIngredient, [
                    nombre,
                    unidad_base,
                    id
                ])

                if (result.rows.length === 0) {
                    return res.status(404).json({
                        error: 'Ingrediente no encontrado'
                    })
                }

                return res.json({
                    message: 'Ingrediente actualizado exitosamente',
                    ingrediente: result.rows[0]
                })
            } finally {
                client.release()
            }
        } catch (error) {
            console.error('Error actualizando ingrediente:', error)
            return res.status(500).json({
                error: 'Error interno del servidor'
            })
        }
    },

    // Eliminar un ingrediente específico
    deleteIngredient: async (req, res) => {
        const { id } = req.params

        try {
            const client = await pool.connect()
            try {
                const result = await client.query(ingredientQueries.deleteIngredient, [id])

                if (result.rows.length === 0) {
                    return res.status(404).json({
                        error: 'Ingrediente no encontrado'
                    })
                }

                return res.json({
                    message: 'Ingrediente eliminado exitosamente',
                    deletedId: result.rows[0].id
                })
            } finally {
                client.release()
            }
        } catch (error) {
            console.error('Error eliminando ingrediente:', error)
            return res.status(500).json({
                error: 'Error interno del servidor'
            })
        }
    }
}