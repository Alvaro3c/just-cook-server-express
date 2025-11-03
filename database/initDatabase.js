import { pool } from '../config/database.js'
import { tableQueries } from '../queries/tableQueries.js'

export const initDatabase = async () => {
    const client = await pool.connect()

    try {
        // Verificar si la tabla usuarios ya existe
        const tableExists = await client.query(tableQueries.verificacionDeExistenciaDeTablas)

        if (tableExists.rows[0].exists) {
            console.log('✅ Las tablas ya existen, omitiendo creación')
            return
        }

        // Ejecutar todas las queries de creación
        await client.query(tableQueries.createUsuariosTable)
        console.log('Tabla USUARIOS creada/verificada')

        await client.query(tableQueries.createRecetasTable)
        console.log('Tabla RECETAS creada/verificada')

        await client.query(tableQueries.createIngredientesTable)
        console.log('Tabla INGREDIENTES creada/verificada')

        await client.query(tableQueries.createUsuarioIngredientesDespensaTable)
        console.log('Tabla USUARIO_INGREDIENTES_DESPENSA creada/verificada')

        await client.query(tableQueries.createUsuarioRecetasFavoritasTable)
        console.log('Tabla USUARIO_RECETAS_FAVORITAS creada/verificada')

        await client.query(tableQueries.createIndexes)
        console.log('Índices creados/verificados')

        console.log('Base de datos inicializada correctamente')

    } catch (error) {
        console.error('❌ Error inicializando base de datos:', error)
        throw error
    } finally {
        client.release()
    }
}