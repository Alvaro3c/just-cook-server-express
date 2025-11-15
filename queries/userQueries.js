export const userQueries = {
    createUser: `
        INSERT INTO usuarios (nombre, email, contraseña_hash) 
        VALUES ($1, $2, $3)
        RETURNING id, nombre, email
    `,

    getAllUsers: 'SELECT * FROM usuarios ',
    getUserByEmail: `
        SELECT id, nombre, email, contraseña_hash FROM usuarios 
        WHERE email = $1
    `,
    getUserById: `
        SELECT id, nombre, email FROM usuarios 
        WHERE id = $1
    `,

    dropTable: 'DROP TABLE IF EXISTS usuarios',

}