export const recepiesQueries = {
    // Ver todas las recetas
    getAllRecipes: `
        SELECT id, titulo, descripcion, 
               tiempo_preparacion, porciones, dificultad, instrucciones,ingredientes
        FROM recetas 
        ORDER BY titulo
    `,

    // Ver recetas favoritas de un usuario
    getUserFavorites: `
        SELECT r.id, r.titulo, r.descripcion, 
               r.tiempo_preparacion, r.porciones, r.dificultad, r.instrucciones, r.ingredientes
        FROM recetas r
        JOIN usuario_recetas_favoritas urf ON r.id = urf.receta_id
        WHERE urf.usuario_id = $1
        ORDER BY r.titulo
    `,

    // Añadir receta a favoritos
    addToFavorites: `
        INSERT INTO usuario_recetas_favoritas (usuario_id, receta_id) 
        VALUES ($1, $2) 
        RETURNING usuario_id, receta_id
    `,

    // Eliminar receta de favoritos
    removeFromFavorites: `
        DELETE FROM usuario_recetas_favoritas 
        WHERE usuario_id = $1 AND receta_id = $2 
        RETURNING usuario_id, receta_id
    `,

    // Verificar si la receta existe
    checkRecipeExists: `
        SELECT id FROM recetas WHERE id = $1
    `,

    // Verificar si ya es favorita
    checkIsFavorite: `
        SELECT * FROM usuario_recetas_favoritas 
        WHERE usuario_id = $1 AND receta_id = $2
    `,
    // Nueva query para añadir recetas
    addRecipe: `
    INSERT INTO recetas (
        titulo, 
        descripcion, 
        instrucciones, 
        tiempo_preparacion, 
        porciones, 
        dificultad,
        ingredientes
    ) VALUES ($1, $2, $3, $4, $5, $6,$7) 
    RETURNING *
`
}