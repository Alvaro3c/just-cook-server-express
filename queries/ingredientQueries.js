export const ingredientQueries = {
    // Ver todos los ingredientes
    getAllIngredients: `
        SELECT id, nombre, unidad_base 
        FROM ingredientes 
        ORDER BY nombre
    `,

    // Añadir nuevo ingrediente
    createIngredient: `
        INSERT INTO ingredientes (nombre, unidad_base, fecha_de_caducidad) 
        VALUES ($1, $2, $3) 
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
        INSERT INTO ingredientes (nombre, cantidad) 
        VALUES ($1, $2)
        ON CONFLICT (nombre) DO UPDATE SET nombre = EXCLUDED.nombre
        RETURNING id
    )
    INSERT INTO usuario_ingredientes_despensa (usuario_id, ingrediente_id, cantidad, fecha_caducidad)
    SELECT $3, id, $4, $5 FROM nuevo_ingrediente
    RETURNING id, usuario_id, ingrediente_id, cantidad, fecha_caducidad
`,
    deleteUserIngredient: `
    DELETE FROM usuario_ingredientes_despensa 
    WHERE usuario_id = $1 AND ingrediente_id = $2 
    RETURNING id, usuario_id, ingrediente_id
`

}