export const tableQueries = {
    createUsuariosTable: `
        CREATE TABLE IF NOT EXISTS usuarios (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            contraseña_hash VARCHAR(255) NOT NULL
        )
    `,

    createRecetasTable: `
        CREATE TABLE IF NOT EXISTS recetas (
            id SERIAL PRIMARY KEY,
            titulo VARCHAR(200) NOT NULL,
            descripcion TEXT,
            tiempo_preparacion INTEGER,
            porciones INTEGER,
            dificultad VARCHAR(50) DEFAULT 'media',
            instrucciones TEXT
            ingredientes TEXT[]
        )
    `,

    createIngredientesTable: `
        CREATE TABLE IF NOT EXISTS ingredientes (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(100) UNIQUE NOT NULL,
            unidad_base VARCHAR(50) NOT NULL
        )
    `,

    createUsuarioIngredientesDespensaTable: `
        CREATE TABLE IF NOT EXISTS usuario_ingredientes_despensa (
            id SERIAL PRIMARY KEY,
            usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
            ingrediente_id INTEGER NOT NULL REFERENCES ingredientes(id) ON DELETE CASCADE,
            UNIQUE(usuario_id, ingrediente_id)
        )
    `,

    createUsuarioRecetasFavoritasTable: `
        CREATE TABLE IF NOT EXISTS usuario_recetas_favoritas (
            usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
            receta_id INTEGER NOT NULL REFERENCES recetas(id) ON DELETE CASCADE,
            PRIMARY KEY (usuario_id, receta_id)
        )
    `,

    createIndexes: `
        CREATE INDEX IF NOT EXISTS idx_usuario_despensa ON usuario_ingredientes_despensa(usuario_id);
        CREATE INDEX IF NOT EXISTS idx_receta_favoritas ON usuario_recetas_favoritas(usuario_id);
    `,

    verificacionDeExistenciaDeTablas: `SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'usuarios'
            )`
}