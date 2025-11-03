export const ingredientQueries = {
    // Ver todos los ingredientes
    getAllIngredients: `
        SELECT id, nombre, unidad_base 
        FROM ingredientes 
        ORDER BY nombre
    `,

    // Añadir nuevo ingrediente
    createIngredient: `
        INSERT INTO ingredientes (nombre, unidad_base) 
        VALUES ($1, $2) 
        RETURNING id, nombre, unidad_base
    `,

    // Modificar un ingrediente específico
    updateIngredient: `
        UPDATE ingredientes 
        SET nombre = $1, unidad_base = $2 
        WHERE id = $3 
        RETURNING id, nombre, unidad_base
    `,

    // Eliminar un ingrediente específico
    deleteIngredient: `
        DELETE FROM ingredientes 
        WHERE id = $1 
        RETURNING id
    `
}