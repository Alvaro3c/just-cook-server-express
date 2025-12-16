import { pool } from '../config/database.js'
import { tableQueries } from '../queries/tableQueries.js'

export const initDatabase = async () => {
    const client = await pool.connect()

    try {
        await client.query(tableQueries.createUsuariosTable)
        await client.query(tableQueries.createRecetasTable)
        await client.query(tableQueries.createIngredientesTable)
        await client.query(tableQueries.createUsuarioIngredientesDespensaTable)
        await client.query(tableQueries.createUsuarioRecetasFavoritasTable)
        await client.query(tableQueries.createIndexes)
    } catch (error) {
        console.error('Error inicializando base de datos:', error)
        throw error
    } finally {
        client.release()
    }
}
