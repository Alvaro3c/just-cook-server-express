import { recepiesQueries } from '../queries/recepiesQueries.js'
import { pool } from '../config/database.js'

export const recepiesControllers = {
    // Ver todas las recetas
    getAllRecipes: async (req, res) => {
        try {
            const client = await pool.connect()
            try {
                const result = await client.query(recepiesQueries.getAllRecipes)
                return res.json({
                    count: result.rows.length,
                    recetas: result.rows
                })
            } finally {
                client.release()
            }
        } catch (error) {
            console.error('Error obteniendo recetas:', error)
            return res.status(500).json({
                error: 'Error interno del servidor'
            })
        }
    },

    // Ver recetas favoritas de un usuario
    getUserFavorites: async (req, res) => {
        const usuario_id = req.params.userId

        try {
            const client = await pool.connect()
            try {
                const result = await client.query(recepiesQueries.getUserFavorites, [usuario_id])

                return res.json({
                    count: result.rows.length,
                    favoritas: result.rows
                })
            } finally {
                client.release()
            }
        } catch (error) {
            console.error('Error obteniendo favoritas:', error)
            return res.status(500).json({
                error: 'Error interno del servidor'
            })
        }
    },

    // Añadir receta a favoritos
    addToFavorites: async (req, res) => {
        const usuario_id = req.params.userId
        const { receta_id } = req.body

        try {
            if (!receta_id) {
                return res.status(400).json({
                    error: 'receta_id es requerido'
                })
            }

            const client = await pool.connect()
            try {
                // Verificar que la receta existe
                const recipeCheck = await client.query(
                    recepiesQueries.checkRecipeExists,
                    [receta_id]
                )

                if (recipeCheck.rows.length === 0) {
                    return res.status(404).json({
                        error: 'Receta no encontrada'
                    })
                }

                // Verificar si ya es favorita
                const favoriteCheck = await client.query(
                    recepiesQueries.checkIsFavorite,
                    [usuario_id, receta_id]
                )

                if (favoriteCheck.rows.length > 0) {
                    return res.status(409).json({
                        error: 'La receta ya está en favoritos'
                    })
                }

                const result = await client.query(recepiesQueries.addToFavorites, [
                    usuario_id,
                    receta_id
                ])

                return res.status(201).json({
                    message: 'Receta añadida a favoritos',
                    favorita: result.rows[0]
                })
            } finally {
                client.release()
            }
        } catch (error) {
            console.error('Error añadiendo a favoritos:', error)
            return res.status(500).json({
                error: 'Error interno del servidor'
            })
        }
    },

    // Eliminar receta de favoritos
    removeFromFavorites: async (req, res) => {
        const { userId, recipeId } = req.params

        try {
            const client = await pool.connect()
            try {
                const result = await client.query(recepiesQueries.removeFromFavorites, [
                    userId,
                    recipeId
                ])

                if (result.rows.length === 0) {
                    return res.status(404).json({
                        error: 'Receta no encontrada en favoritos'
                    })
                }

                return res.json({
                    message: 'Receta eliminada de favoritos',
                    removed: result.rows[0]
                })
            } finally {
                client.release()
            }
        } catch (error) {
            console.error('Error eliminando de favoritos:', error)
            return res.status(500).json({
                error: 'Error interno del servidor'
            })
        }
    },
    // Añadir múltiples recetas desde JSON
    // Añadir múltiples recetas desde JSON
    addMultipleRecipes: async (req, res) => {
        const recetas = Array.isArray(req.body.recetas) ? req.body.recetas : req.body;

        try {
            if (!recetas || !Array.isArray(recetas)) {
                return res.status(400).json({
                    error: 'Se requiere un array de recetas en el cuerpo de la petición'
                });
            }

            const client = await pool.connect();
            try {
                await client.query('BEGIN');

                const results = [];
                const errors = [];

                for (const [index, receta] of recetas.entries()) {
                    try {
                        console.log(`Procesando receta ${index}:`, receta.titulo);

                        // ✅ CORREGIDO: Solo validar campos que existen en tu tabla
                        if (!receta.titulo || !receta.instrucciones) {
                            errors.push({
                                index,
                                error: 'Campos requeridos faltantes: titulo, instrucciones',
                                receta
                            });
                            continue;
                        }

                        // ✅ CORREGIDO: Insertar solo los campos que existen en tu tabla
                        const result = await client.query(recepiesQueries.addRecipe, [
                            receta.titulo,
                            receta.descripcion || null,
                            receta.instrucciones,
                            receta.tiempo_preparacion || null,
                            receta.porciones || null,
                            receta.dificultad || 'media',
                            receta.ingredientes
                        ]);

                        console.log(`Receta ${index} insertada correctamente:`, result.rows[0].id);

                        results.push({
                            index,
                            success: true,
                            receta: result.rows[0]
                        });

                    } catch (error) {
                        console.error(`Error en receta ${index}:`, error);
                        errors.push({
                            index,
                            error: error.message,
                            detail: error.detail,
                            receta
                        });
                    }
                }

                await client.query('COMMIT');

                return res.status(201).json({
                    message: 'Proceso de inserción completado',
                    insertadas: results.length,
                    errores: errors.length,
                    detalles: {
                        exitosas: results.map(r => ({ titulo: r.receta.titulo, id: r.receta.id })),
                        fallidas: errors.map(e => ({
                            index: e.index,
                            titulo: e.receta?.titulo,
                            error: e.error,
                            detail: e.detail
                        }))
                    }
                });

            } catch (error) {
                await client.query('ROLLBACK');
                console.error('Error en transacción:', error);
                return res.status(500).json({
                    error: 'Error en transacción',
                    detail: error.message
                });
            } finally {
                client.release();
            }
        } catch (error) {
            console.error('Error general añadiendo múltiples recetas:', error);
            return res.status(500).json({
                error: 'Error interno del servidor',
                detail: error.message
            });
        }
    }
}