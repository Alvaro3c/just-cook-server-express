export const ingredientQueries = {
    // Ver todos los ingredientes
    getAllIngredients: `
        SELECT id, nombre, unidad_base 
        FROM ingredientes 
        ORDER BY nombre
    `,

    // Añadir nuevo ingrediente
    createIngredient: `
        INSERT INTO ingredientes (nombre, cantidad, fecha_caducidad) 
        VALUES ($1, $2, $3) 
        RETURNING id, nombre, cantidad
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
    `,
    getUserIngredients: `
    SELECT 
        uid.id as relacion_id,
        i.id,
        i.nombre,
        uid.cantidad,
        uid.fecha_caducidad
    FROM usuario_ingredientes_despensa uid
    INNER JOIN ingredientes i ON uid.ingrediente_id = i.id
    WHERE uid.usuario_id = $1
    ORDER BY i.nombre
    `,
    createIngredientForUser: `
    WITH nuevo_ingrediente AS (
    -- 1. Intenta crear el ingrediente base o recupera su ID si ya existe
    INSERT INTO ingredientes (nombre, cantidad, fecha_caducidad) 
    VALUES ($1, NULL, NULL) -- Solo se usa $1 (nombre). Las otras dos columnas son redundantes aquí.
    ON CONFLICT (nombre) DO UPDATE SET nombre = EXCLUDED.nombre
    RETURNING id AS ingrediente_id
    )   
    INSERT INTO usuario_ingredientes_despensa (usuario_id, ingrediente_id, cantidad, fecha_caducidad)
    SELECT $2, ingrediente_id, $3, $4 FROM nuevo_ingrediente -- Reutilizando el ID del ingrediente.
    RETURNING id, usuario_id, ingrediente_id, cantidad, fecha_caducidad
`,
    deleteUserIngredient: `
    DELETE FROM usuario_ingredientes_despensa 
    WHERE usuario_id = $1 AND ingrediente_id = $2 
    RETURNING id, usuario_id, ingrediente_id
`

}